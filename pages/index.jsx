import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { appName } from '../util/vars';
import { queryQuotes } from '../util/api-lib';
import { useTheme, getTheme } from '../util/themes';
import { GlobalStyle } from '../util/globalStyle';

import Container from '../components/Container';
import Header from '../components/Header';
import CardList from '../components/CardList';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';

const Home = ({ initialQuotes, initialPage }) => {
    const [quotes, setQuotes] = useState([...initialQuotes]);
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
                <CardList
                    quotes={quotes}
                    setQuotes={setQuotes}
                    initialPage={initialPage}
                />
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

Home.getInitialProps = async function(context) {
    const data = await queryQuotes(0, context);
    const quotes = data?.data?.quotes || [];
    const page = quotes.length > 0 ? 1 : 0;

    return { initialQuotes: quotes, initialPage: page };
};

export default Home;