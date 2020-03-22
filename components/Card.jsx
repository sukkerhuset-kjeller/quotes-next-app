import { formatDistance, differenceInDays, isDate, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import styled from 'styled-components';

const CardContainer = styled.div`
    margin-top: -80px;
    padding: calc(2rem + 80px) 3rem 2rem 3rem;
    color: #ffffff;
    border-radius: 0 0 0 80px;

    &:nth-child(3n + 1) {
        background-color: #d47fa6;
    }
    &:nth-child(3n + 3) {
        background-color: #8a56ac;
    }
    &:nth-child(3n + 2) {
        background-color: #241332;
    }
`;

const CardDate = styled.p`
    font-size: 0.6875rem;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0;
    opacity: 0.48;
`;

const CardQuote = styled.p`
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0.5rem 0;
`;

const CardAuthor = styled.p`
    font-size: 0.75rem;
    font-weight: 500;
    font-style: italic;
    margin: 0;
    opacity: 0.48;
`;

const formatDate = (date) => {
    const now = new Date();
    if (!isDate(date)) return 'Ugyldig dato';
    if (differenceInDays(now, date) < 7) {
        return formatDistance(date, now, { locale: nb }) + ' siden';
    }
    return format(date, 'd. MMMM yyyy', { locale: nb });
};

const Card = ({ text, saidBy, date, ...props }) => {
    return (
        <CardContainer {...props}>
            <CardDate>{formatDate(new Date(Number(date)))}</CardDate>
            <CardQuote>{text}</CardQuote>
            <CardAuthor>{saidBy}</CardAuthor>
        </CardContainer>
    );
};

export default Card;
