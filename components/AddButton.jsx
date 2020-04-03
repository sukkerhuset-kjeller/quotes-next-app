import styled from 'styled-components';

import AddIcon from '../public/icons/add.svg';

const AddButton = styled.button`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: ${({ theme }) => theme.header.background};
    color: ${({ theme }) => theme.header.text};
    border: none;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 2px 0px #0000001a;
    z-index: 4000000;
    outline: none;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000001a, 0 8px 16px #0000001a;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #2684ff;
    }
`;

const StyledAddIcon = styled(AddIcon)`
    .add_svg__shape {
        fill: ${({ theme }) => theme.header.text};
    }
`;

export default (props) => (
    <AddButton {...props}>
        <StyledAddIcon />
    </AddButton>
);
