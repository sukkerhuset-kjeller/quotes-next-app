import { useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import SimplePullToRefresh from 'react-simple-pull-to-refresh';

import { queryQuotes } from '../util/api-lib';

import Card from './Card';

const PullToRefresh = styled(SimplePullToRefresh)`
    .lds-ellipsis {
        div {
            background: ${({ theme }) => theme.body.text};
        }
    }
`;

const CardListWrapper = styled.div`
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    overflow: hidden;
`;

const CardList = ({ quotes, setQuotes, initialPage }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(initialPage);
    const [hasNextPage, setHasNextPage] = useState(true);

    const loadQuotes = debounce(() => {
        setLoading(true);
        queryQuotes(page)
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
        setPage(0);
        queryQuotes(0)
            .then((res) => {
                const data = res?.data?.quotes;
                if (data?.length < 10) setHasMore(false);
                setQuotes([...res?.data?.quotes]);
            })
            .catch((error) => {
                console.error('test', error);
            });
    };

    return (
        <PullToRefresh
            onRefresh={handleRefresh}
            canFetchMore={hasNextPage}
            onFetchMore={loadQuotes}
            pullingContent={<></>}>
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
        </PullToRefresh>
    );
};

export default CardList;
