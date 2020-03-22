import styled from 'styled-components';

const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    color: #1c1e21;
    z-index: 4000000;
    box-shadow: 0px 1px 3px 0px #0000001a;
`;

const Title = styled.h1`
    font-size: 1.625rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
`;

const Header = ({ title }) => {
    return (
        <HeaderContainer>
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

export default Header;
