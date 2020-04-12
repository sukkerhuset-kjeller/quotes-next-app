import { useState } from 'react';
import { withTheme } from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import ContentWrapper from '../components/ContentWrapper';
import Header from '../components/Header';
import TextField from '../components/TextField';
import { login } from '../util/api-lib';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <Header />
            <ContentWrapper>
                <form>
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
    );
};

export default withTheme(Login);
