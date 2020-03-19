import { useState, useEffect } from 'react';
import Select from 'react-select/creatable';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { query } from '../lib/api-lib';
import Button from './Button';

function ReactModalAdapter({ className, modalClassName, ...props }) {
    return (
        <ReactModal
            className={modalClassName}
            portalClassName={className}
            {...props}
        />
    );
}

const StyledModal = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal',
})`
    .Modal {
        background: #ffffff;
        border-radius: 40px;
        width: calc(100% - 2rem);
        max-width: 500px;
        min-height: 100px;
        margin: 1rem;
        padding: 2rem;
    }
    .Overlay {
        display: flex;
        z-index: 6000000;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background: #24133285;
        backdrop-filter: blur(9px);
    }
`;
ReactModal.setAppElement('#__next');

const customSelectStyles = {};

const TextField = styled.input`
    border: none;
    width: 100%;
    font-size: 1rem;
    color: hsl(0, 0%, 50%);
    border-bottom: 1px solid #dddddd;
    margin-bottom: 1rem;
    padding: 0.5rem 10px;

    &::placeholder {
        color: hsl(0, 0%, 50%);
        font-family: 'Montserrat', sans-serif;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const CancelModalButton = styled(Button)`
    margin-top: 1rem;
    margin-right: 0.5rem;
    background-color: #9599b3;
`;

const AddModalButton = styled(Button)`
    margin-top: 1rem;
    margin-left: 0.5rem;
`;

const AddModal = ({ show, setShow, quotes, setQuotes }) => {
    const [quote, setQuote] = useState('');
    const [saidBy, setSaidBy] = useState(null);
    const [persons, setPersons] = useState([]);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        query(`query { persons { name, id } }`).then(
            (res) => mounted && setPersons(res?.data?.persons)
        );
        return () => setMounted(false);
    }, []);

    return (
        <StyledModal isOpen={show} onRequestClose={() => setShow(false)}>
            <TextField
                type="text"
                placeholder="Sitat"
                onChange={(e) => setQuote(e.target.value)}
            />
            <Select
                instanceId="saidBy"
                placeholder="Sagt av"
                isClearable={true}
                isSearchable={true}
                styles={customSelectStyles}
                onChange={(value, _) => setSaidBy(value.value)}
                options={persons.map((person) => ({
                    label: person.name,
                    value: person.name,
                }))}
            />
            <ButtonContainer>
                <CancelModalButton onClick={() => setShow(false)}>
                    Lukk
                </CancelModalButton>
                <AddModalButton
                    onClick={() =>
                        query(
                            `mutation { addQuote(input: { text: "${quote}", saidBy: "${saidBy}", date: "${new Date().getTime()}" }) { text, saidBy, date } }`
                        ).then((res) => {
                            if (res?.data?.addQuote) {
                                setQuotes([
                                    { ...res.data.addQuote },
                                    ...quotes,
                                ]);
                            }
                            setShow(false);
                        })
                    }>
                    Lagre
                </AddModalButton>
            </ButtonContainer>
        </StyledModal>
    );
};

export default AddModal;
