import React from 'react';
import ReactSelect from 'react-select';
import ReactCreatable from 'react-select/creatable';
import styled, { css } from 'styled-components';

const style = css`
    .react-select {
        &__control {
            background: ${({ theme }) => theme.body.background};
            border-color: ${({ theme }) => theme.body.text};

            &--is-focused,
            &:hover {
                border-color: ${({ theme }) => theme.button.primary.background};
                box-shadow: 0 0 0 1px
                    ${({ theme }) => theme.button.primary.background};
            }
        }
        &__single-value,
        &__placeholder,
        &__input {
            color: ${({ theme }) => theme.body.text};
        }
        &__indicator-separator {
            background-color: ${({ theme }) => theme.body.text};
        }
        &__indicator {
            color: ${({ theme }) => theme.body.text};
            cursor: pointer;
            &:hover {
                color: ${({ theme }) => theme.body.text};
            }
        }
        &__menu {
            background: ${({ theme }) => theme.body.background};
            color: ${({ theme }) => theme.body.text};
        }
        &__option {
            &--is-focused {
                background-color: ${({ theme }) => theme.header.background};
                color: ${({ theme }) => theme.header.text};
            }
            &--is-selected {
                background-color: ${({ theme }) =>
                    theme.button.primary.background};
                color: ${({ theme }) => theme.button.primary.text};
            }
        }
    }
`;

const ReactSelectElement = styled(ReactSelect)`
    ${style}
`;
export const Select = (props) => (
    <ReactSelectElement classNamePrefix="react-select" {...props} />
);

const ReactCreatableElement = styled(ReactCreatable)`
    ${style}
`;
export const Creatable = (props) => (
    <ReactCreatableElement classNamePrefix="react-select" {...props} />
);
