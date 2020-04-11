import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';
import styled from 'styled-components';
import SettingsIcon from '../public/icons/setting.svg';
import { appName, shortAppName } from '../util/vars';

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.header.background};
    color: ${({ theme }) => theme.header.text};
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
    .setting_svg__shape {
        stroke: ${({ theme }) => theme.header.text};
    }
`;

const TitleLink = styled.h1`
    font-size: 1.625rem;
    font-weight: 400;
    text-align: center;
    position: relative;
    margin: 0;
    cursor: pointer;

    &::after {
        content: 'BETA';
        display: block;
        position: absolute;
        background: ${({ theme }) => theme.button.primary.background};
        color: ${({ theme }) => theme.button.primary.text};
        font-size: 0.75rem;
        right: -0.5rem;
        bottom: 0;
        transform: translateX(100%);
        padding: 2px 0.5rem;
        border-radius: 6px;
    }
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
