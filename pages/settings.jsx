import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Select } from '../components/Select';
import Switch from 'react-switch';

import { appName } from '../util/vars';
import { useTheme, getTheme, themes } from '../util/themes';
import { GlobalStyle } from '../util/globalStyle';

import Container from '../components/Container';
import Header from '../components/Header';

const Wrapper = styled.div`
    margin-top: 60px;
    width: 100%;
    max-width: 500px;
    padding: 1rem;
`;

const Settings = () => {
    const [theme, changeTheme, isDarkMode, toggleDarkMode] = useTheme();

    return (
        <ThemeProvider theme={getTheme(theme, isDarkMode)}>
            <GlobalStyle />
            <Container>
                <Head>
                    <title>{appName}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        href="https://fonts.googleapis.com/css?family=Montserrat:400,500i,600,700&display=swap"
                        rel="stylesheet"></link>
                </Head>
                <Header />
                <Wrapper>
                    <p>Tema</p>
                    <Select
                        placeholder="Velg tema"
                        options={themes}
                        value={themes.filter((opt) => opt.value === theme)}
                        onChange={(value, _) => changeTheme(value?.value)}
                    />
                    <p>Dark Mode</p>
                    <Switch
                        onChange={toggleDarkMode}
                        checked={isDarkMode}
                        uncheckedIcon={false}
                        checkedIcon={false}
                    />
                </Wrapper>
            </Container>
        </ThemeProvider>
    );
};

export default Settings;
