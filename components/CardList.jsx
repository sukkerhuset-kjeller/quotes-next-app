import { useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';

import { query } from '../lib/api-lib';

import Card from './Card';

const CardListWrapper = styled.div`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 64px;
`;

const Loader = styled.div`
    padding: 1rem;
    margin: 0 auto;
    text-align: center;
`;

const ReactPullToRefresh = styled(
    dynamic(() => import('react-pull-to-refresh'), { ssr: false })
)`
    width: 100%;
`;

const CardList = ({ quotes, setQuotes }) => {
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadQuotes = debounce((page) => {
        query(
            `query { quotes(amount: 10, page: ${page}, sort: { field: "date", ascending: false }) { text, saidBy, date } }`
        )
            .then((res) => {
                const data = res?.data?.quotes;
                if (data?.length < 10) setHasMore(false);
                setQuotes([...quotes, ...res?.data?.quotes]);
            })
            .catch((error) => {
                console.error('test', error);
                setError(true);
            });
    }, 100);

    const handleRefresh = (resolve, reject) => {
        setHasMore(true);
        setError(false);
        query(
            `query { quotes(amount: 10, page: 0, sort: { field: "date", ascending: false }) { text, saidBy, date } }`
        )
            .then((res) => {
                const data = res?.data?.quotes;
                if (data?.length < 10) setHasMore(false);
                setQuotes([...res?.data?.quotes]);
                resolve();
            })
            .catch((error) => {
                console.error('test', error);
                setError(true);
                reject();
            });
    };

    return (
        <ReactPullToRefresh onRefresh={handleRefresh}>
            <InfiniteScroll
                style={{ width: '100%' }}
                pageStart={-1}
                loadMore={loadQuotes}
                hasMore={hasMore}
                loader={<Loader key={'loader'}>Laster ...</Loader>}>
                <CardListWrapper>
                    {quotes.map((entry, index) => (
                        <Card
                            style={{ zIndex: quotes.length - index }}
                            key={index}
                            text={entry?.text}
                            saidBy={entry?.saidBy}
                            date={entry?.date}
                        />
                    ))}
                </CardListWrapper>
            </InfiniteScroll>
        </ReactPullToRefresh>
    );
};

export default CardList;
