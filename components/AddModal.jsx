import Router from 'next/router';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { Creatable } from '../components/Select';
import { addQuote, queryPersons } from '../util/api-lib';
import Button from './Button';
import TextField from './TextField';

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
        background: ${({ theme }) => theme.body.background};
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

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    margin-top: 0;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const CancelModalButton = styled(Button)`
    margin-top: 1rem;
    margin-right: 0.5rem;
    background-color: ${({ theme }) => theme.button.secondary.background};
    color: ${({ theme }) => theme.button.secondary.text};
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
        queryPersons().then((res) => {
            if (res?.errors) {
                Router.push('/login');
            }
            mounted && setPersons(res?.data?.persons || []);
        });
        return () => setMounted(false);
    }, []);

    return (
        <StyledModal isOpen={show} onRequestClose={() => setShow(false)}>
            <Title>Legg til ny quote</Title>
            <TextField
                placeholder="Quote"
                onChange={(e) => setQuote(e?.target?.value)}
            />
            <Creatable
                instanceId="saidBy"
                placeholder="Sagt av"
                isClearable={true}
                isSearchable={true}
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
                            const addQuote = res?.data?.addQuote;
                            const errors = res?.errors;
                            if (errors) {
                                setLoading(false);
                                Router.push('/login');
                            }
                            if (addQuote) {
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
