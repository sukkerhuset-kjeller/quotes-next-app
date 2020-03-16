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

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <Head>
                <title>Sukkerhuset Sitater</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:400,500i,600,700&display=swap"
                    rel="stylesheet"></link>
            </Head>
            <Header></Header>
            <CardList />
            <AddButton
                onClick={() => {
                    setShowModal(true);
                }}>
                <img src="/icon-add.svg" alt="" />
            </AddButton>
            <AddModal show={showModal} setShow={setShowModal} />
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

export default Home;
