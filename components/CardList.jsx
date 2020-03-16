import { useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';

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

const CardList = () => {
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const loadQuotes = debounce((page) => {
        query(
            `query { quotes(amount: 10, page: ${page}) { text, saidBy{name}, date } }`
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

    return (
        <InfiniteScroll
            pageStart={-1}
            loadMore={loadQuotes}
            hasMore={hasMore}
            loader={<Loader>Laster ...</Loader>}>
            <CardListWrapper>
                {quotes.map((entry, index) => (
                    <Card
                        style={{ zIndex: quotes.length - index }}
                        key={index}
                        text={entry?.text}
                        saidBy={entry?.saidBy?.name}
                        date={entry?.date}
                    />
                ))}
            </CardListWrapper>
        </InfiniteScroll>
    );
};

export default CardList;
