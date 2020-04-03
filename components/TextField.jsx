import styled from 'styled-components';

const TextField = styled.input`
    border: none;
    width: 100%;
    font-size: 1rem;
    color: ${({ theme }) => theme.body.text};
    background: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.body.text};
    margin-bottom: 1rem;
    padding: 0.5rem 10px;
    outline: none;

    &:focus {
        box-shadow: 0px 0px 0px 2px
            ${({ theme }) => theme.button.primary.background};
    }

    &::placeholder {
        color: ${({ theme }) => theme.body.text};
        font-family: 'Montserrat', sans-serif;
    }
`;

export default (props) => <TextField type="text" {...props} />;
