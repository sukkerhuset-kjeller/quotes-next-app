import {
    differenceInDays,
    format,
    formatDistance,
    isDate,
    isFuture,
} from 'date-fns';
import { nb } from 'date-fns/locale';
import styled, { css } from 'styled-components';
import Like from '../components/Like';

const cardColors = (colors) => {
    let styles = '';
    for (const [index, color] of colors.entries()) {
        styles += `
        &:nth-child(${colors.length}n + ${index}) {
            background-color: ${color};
        }
        `;
    }
    return css`
        ${styles}
    `;
};

const CardContainer = styled.div`
    margin-top: -80px;
    padding: calc(2rem + 80px) 3rem 2rem 3rem;
    color: ${({ theme }) => theme.card.text};
    border-radius: 0 0 0 80px;
    transition: all 200ms ease-in-out;

    ${({ theme }) => cardColors(theme.card.backgrounds)};
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

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    if (isFuture(date) && differenceInDays(now, date) < 7) {
        return formatDistance(date, now, { locale: nb }) + ' siden';
    }
    return format(date, 'd. MMMM yyyy', { locale: nb });
};

const Card = ({
    content: { id, text, saidBy, date, likes, hasLiked },
    ...props
}) => {
    return (
        <CardContainer {...props}>
            <CardDate>{formatDate(new Date(Number(date)))}</CardDate>
            <CardQuote>{text}</CardQuote>
            <CardFooter>
                <CardAuthor>{saidBy}</CardAuthor>
                <Like id={id} defaultValue={hasLiked} />
            </CardFooter>
        </CardContainer>
    );
};

export default Card;
