import Link from 'next/link';
import styled from 'styled-components';
import { useMediaPredicate } from 'react-media-hook';
import { useRouter } from 'next/router';

import { appName, shortAppName } from '../util/vars';

import SettingsIcon from '../public/icons-setting.svg';

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: auto 2fr auto;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.headerBackground};
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

const StyledSettingsIcon = styled(SettingsIcon)`
    .icons-setting_svg__shape {
        stroke: ${({ theme }) => theme.header};
    }
`;

const TitleLink = styled.h1`
    font-size: 1.625rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
    cursor: pointer;
`;

const Header = () => {
    const router = useRouter();
    const smallerThan500 = useMediaPredicate('(max-width: 500px)');

    return (
        <HeaderContainer>
            <Link href={router.pathname === '/settings' ? '/' : '/settings'}>
                <SettingsLink>
                    <StyledSettingsIcon />
                </SettingsLink>
            </Link>
            <Link href="/">
                <TitleLink>{smallerThan500 ? shortAppName : appName}</TitleLink>
            </Link>
        </HeaderContainer>
    );
};

export default Header;
