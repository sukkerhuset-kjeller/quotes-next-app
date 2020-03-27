import styled from 'styled-components';

const Button = styled.button`
    background: ${({ theme }) => theme.button};
    color: ${({ theme }) => theme.text};
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 3.25rem;
    width: 100%;
    height: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 2px 0px #0000001a;
    outline: none;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:focus {
        box-shadow: 0px 0px 0px 2px #2684ff;
    }
`;

export default Button;
