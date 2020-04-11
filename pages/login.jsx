import Head from 'next/head';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import TextField from '../components/TextField';
import { login } from '../util/api-lib';
import { GlobalStyle } from '../util/globalStyle';
import { getTheme, useTheme } from '../util/themes';
import { appName } from '../util/vars';

const Login = () => {
    const [theme, changeTheme, isDarkMode, toggleDarkMode] = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                    <form>
                        <TextField
                            placeholder="Brukernavn"
                            value={username}
                            onChange={(event) =>
                                setUsername(event?.target?.value)
                            }
                        />
                        <TextField
                            type="password"
                            placeholder="Passord"
                            value={password}
                            onChange={(event) =>
                                setPassword(event?.target?.value)
                            }
                        />
                        <Button
                            disabled={!username || !password}
                            onClick={(event) => {
                                event.preventDefault();
                                login(username, password).then(
                                    (res) => !res && setPassword('')
                                );
                            }}>
                            Logg inn
                        </Button>
                    </form>
                </ContentWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
