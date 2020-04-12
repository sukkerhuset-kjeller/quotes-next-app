import { useState } from 'react';
import { withTheme } from 'styled-components';
import AddButton from '../components/AddButton';
import AddModal from '../components/AddModal';
import CardList from '../components/CardList';
import Container from '../components/Container';
import Header from '../components/Header';
import { withAuthSync } from '../util/auth';

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
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

export default withAuthSync(withTheme(Home));
