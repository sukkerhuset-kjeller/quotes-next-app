import { useState, useEffect } from 'react';
import Select from 'react-select/creatable';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { queryPersons, addQuote } from '../util/api-lib';
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
        outline: none;
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

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    margin-top: 0;
`;

const TextField = styled.input`
    border: none;
    width: 100%;
    font-size: 1rem;
    color: hsl(0, 0%, 50%);
    border-bottom: 1px solid #dddddd;
    margin-bottom: 1rem;
    padding: 0.5rem 10px;
    outline: none;

    &:focus {
        box-shadow: 0px 0px 0px 2px #2684ff;
    }

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

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const AddModal = ({ show, setShow, quotes, setQuotes }) => {
    const [quote, setQuote] = useState('');
    const [saidBy, setSaidBy] = useState(null);
    const [persons, setPersons] = useState([]);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        queryPersons().then((res) => mounted && setPersons(res?.data?.persons));
        return () => setMounted(false);
    }, []);

    return (
        <StyledModal isOpen={show} onRequestClose={() => setShow(false)}>
            <Title>Legg til ny quote</Title>
            <TextField
                type="text"
                placeholder="Quote"
                onChange={(e) => setQuote(e?.target?.value)}
            />
            <Select
                instanceId="saidBy"
                placeholder="Sagt av"
                isClearable={true}
                isSearchable={true}
                styles={customSelectStyles}
                onChange={(value, _) => setSaidBy(value?.value)}
                formatCreateLabel={(inputValue) => `Legg til "${inputValue}"`}
                noOptionsMessage={() => 'Ingen alternativer'}
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
                    disabled={!saidBy || !quote || quote === ''}
                    onClick={() => {
                        if (!saidBy || !quote || quote === '') return;
                        addQuote(quote, saidBy).then((res) => {
                            if (res?.data?.addQuote) {
                                setQuotes([
                                    { ...res.data.addQuote },
                                    ...quotes,
                                ]);
                            }
                            setShow(false);
                        });
                    }}>
                    Lagre
                </AddModalButton>
            </ButtonContainer>
        </StyledModal>
    );
};

export default AddModal;
