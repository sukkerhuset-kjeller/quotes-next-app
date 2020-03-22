import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';
import CardList from '../components/CardList';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';

const Container = styled.div`
    min-height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const appName = 'Sukkerhuset Quotes';

const Home = ({ initialQuotes }) => {
    const [quotes, setQuotes] = useState([...initialQuotes]);
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <Head>
                <title>{appName}</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:400,500i,600,700&display=swap"
                    rel="stylesheet"></link>
            </Head>
            <Header title={appName}></Header>
            <CardList quotes={quotes} setQuotes={setQuotes} />
            <AddButton
                onClick={() => {
                    setShowModal(true);
                }}>
                <img src="/icon-add.svg" alt="" />
            </AddButton>
            <AddModal
                show={showModal}
                setShow={setShowModal}
                quotes={quotes}
                setQuotes={setQuotes}
            />
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: 'Montserrat', sans-serif;
                    background: #dedce0;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
    );
};

Home.getInitialProps = async function(context) {
    const apiUrl = process.browser
        ? `http://${window.location.host}/api/graphql`
        : `http://${context.req.headers.host}/api/graphql`;

    const query = `query { quotes(amount: 10, page: 0, sort: { field: "date", ascending: false }) { text, saidBy, date } }`;

    const data = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
        }),
    });

    const json = await data?.json();
    const quotes = json?.data?.quotes || [];

    return { initialQuotes: quotes };
};

export default Home;
