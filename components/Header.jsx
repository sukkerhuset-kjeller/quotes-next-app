import Link from 'next/link';
import styled from 'styled-components';

import { appName } from '../util/vars';

const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    color: ${({ theme }) => theme.header};
    z-index: 4000000;
    box-shadow: 0px 1px 3px 0px #0000001a;
    padding: 0 1rem;
`;

const SettingsLink = styled.a`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
`;

const TitleLink = styled.h1`
    font-size: 1.625rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
    cursor: pointer;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Link href="/settings">
                <SettingsLink>
                    <img src="/icons-setting.svg" alt="Instillinger" />
                </SettingsLink>
            </Link>
            <Link href="/">
                <TitleLink>{appName}</TitleLink>
            </Link>
        </HeaderContainer>
    );
};

export default Header;
