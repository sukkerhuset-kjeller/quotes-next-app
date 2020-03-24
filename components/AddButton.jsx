import styled from 'styled-components';

const AddButton = styled.button`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: #ffffff;
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
        background: #efefef;
        box-shadow: 0 2px 2px #0000001a, 0 8px 16px #0000001a;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #2684ff;
    }
`;

export default AddButton;
