import Head from 'next/head';
import Switch from 'react-switch';
import { ThemeProvider } from 'styled-components';
import Container from '../components/Container';
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import { Select } from '../components/Select';
import { withAuthSync } from '../util/auth';
import { GlobalStyle } from '../util/globalStyle';
import { getTheme, themes, useTheme } from '../util/themes';
import { appName } from '../util/vars';

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
                <ContentWrapper>
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
                </ContentWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default withAuthSync(Settings);
