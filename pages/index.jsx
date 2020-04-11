import Head from 'next/head';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';
import CardList from '../components/CardList';
import Container from '../components/Container';
import Header from '../components/Header';
import { GlobalStyle } from '../util/globalStyle';
import { getTheme, useTheme } from '../util/themes';
import { appName } from '../util/vars';

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
                <CardList quotes={quotes} setQuotes={setQuotes} />
                <AddButton
                    onClick={() => {
                        setShowModal(true);
                    }}></AddButton>
                <AddModal
                    show={showModal}
                    setShow={setShowModal}
                    quotes={quotes}
                    setQuotes={setQuotes}
                />
            </Container>
        </ThemeProvider>
    );
};

/* Disabled for now
Home.getInitialProps = async function(context) {
    const data = await queryQuotes(0, context);
    const quotes = data?.data?.quotes || [];
    const page = quotes.length > 0 ? 1 : 0;

    return { initialQuotes: quotes, initialPage: page };
};
*/

export default Home;
