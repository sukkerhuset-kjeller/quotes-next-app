import { useState } from 'react';
import styled, { css } from 'styled-components';

import { likeQuote } from '../util/api-lib';

import LikeIconSvg from '../public/icons/like.svg';

const LikeIcon = styled.div`
    display: flex;
    align-items: center;
    opacity: 0.48;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    ${({ active }) =>
        active &&
        css`
            opacity: 1;
        `}

    .like_svg__shape {
        stroke: ${({ theme }) => theme.card.text};
        fill: ${({ active, theme }) => (active ? theme.card.text : 'none')};
    }
`;

const Like = ({ id, defaultValue, ...props }) => {
    const [isLiked, setIsLiked] = useState(defaultValue);

    const toggleQuote = () => {
        likeQuote(id, isLiked).then((res) => {
            if (res?.errors) {
                res.errors.forEach((error) => console.error(error.message));
            } else {
                setIsLiked(!isLiked);
            }
        });
    };

    return (
        <LikeIcon active={isLiked} onClick={toggleQuote}>
            <LikeIconSvg />
        </LikeIcon>
    );
};

export default Like;
