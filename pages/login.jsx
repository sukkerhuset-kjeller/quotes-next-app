import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { appName } from '../util/vars';
import { useTheme, getTheme } from '../util/themes';
import { GlobalStyle } from '../util/globalStyle';

import Header from '../components/Header';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Container from '../components/Container';
import ContentWrapper from '../components/ContentWrapper';
import { login } from '../util/api-lib';
import Router from 'next/router';

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
                    <TextField
                        placeholder="Brukernavn"
                        value={username}
                        onChange={(event) => setUsername(event?.target?.value)}
                    />
                    <TextField
                        type="password"
                        placeholder="Passord"
                        value={password}
                        onChange={(event) => setPassword(event?.target?.value)}
                    />
                    <Button
                        disabled={!username || !password}
                        onClick={() => {
                            if (login(username, password)) {
                                Router.push('/');
                            } else {
                                setPassword('');
                            }
                        }}>
                        Logg inn
                    </Button>
                </ContentWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
