import { useState } from 'react';
import styled from 'styled-components';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import debounce from 'lodash.debounce';
import PullToRefresh from 'react-simple-pull-to-refresh';

import { query } from '../lib/api-lib';

import Card from './Card';

const CardListWrapper = styled.div`
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 64px;
`;

const CardList = ({ quotes, setQuotes }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const loadQuotes = debounce(() => {
        setLoading(true);
        query(
            `query { quotes(amount: 10, page: ${page}, sort: { field: "date", ascending: false }) { text, saidBy, date } }`
        )
            .then((res) => {
                setLoading(false);
                const data = res?.data?.quotes;
                if (data?.length < 10) {
                    setHasNextPage(false);
                } else {
                    setPage(page + 1);
                }
                setQuotes([...quotes, ...res?.data?.quotes]);
            })
            .catch((error) => {
                setLoading(false);
                console.error('test', error);
            });
    }, 100);

    const handleRefresh = () => {
        setHasNextPage(true);
        query(
            `query { quotes(amount: 10, page: 0, sort: { field: "date", ascending: false }) { text, saidBy, date } }`
        )
            .then((res) => {
                const data = res?.data?.quotes;
                if (data?.length < 10) setHasMore(false);
                setQuotes([...res?.data?.quotes]);
            })
            .catch((error) => {
                console.error('test', error);
            });
    };

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadQuotes,
    });

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <CardListWrapper ref={infiniteRef}>
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
        </PullToRefresh>
    );
};

export default CardList;
