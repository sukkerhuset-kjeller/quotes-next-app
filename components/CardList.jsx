import debounce from 'lodash.debounce';
import { useState } from 'react';
import SimplePullToRefresh from 'react-simple-pull-to-refresh';
import styled from 'styled-components';
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

const CardList = ({ quotes, setQuotes }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);

    const loadQuotes = debounce(() => {
        if (!loading) {
            setLoading(true);
            queryQuotes(page).then((res) => {
                const data = res?.data?.quotes || [];
                const errors = res?.errors;
                if (!errors) {
                    setQuotes([...quotes, ...data]);
                }
                if (data?.length < 10) {
                    setHasNextPage(false);
                } else {
                    setPage(page + 1);
                }
                setLoading(false);
            });
        }
    }, 250);

    const handleRefresh = () => {
        setPage(0);
        setHasNextPage(true);
        setQuotes([]);
        loadQuotes();
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
