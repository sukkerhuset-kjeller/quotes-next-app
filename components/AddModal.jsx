import { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { query } from "../lib/api-lib";
import Button from "./Button";

const customSelectStyles = {};

const ModalBackground = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: #24133285;
  backdrop-filter: blur(9px);
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 40px;
  width: calc(100% - 2rem);
  max-width: 500px;
  min-height: 100px;
  margin: 1rem;
  padding: 2rem;
`;

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
    font-family: "Montserrat", sans-serif;
  }
`;

const AddModalButton = styled(Button)`
  margin-top: 1rem;
`;

const AddModal = ({ show, setShow }) => {
  const [quote, setQuote] = useState("");
  const [saidBy, setSaidBy] = useState(null);
  const [persons, setPersons] = useState([]);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    query(`query { persons { name, id } }`).then(
      res => mounted && setPersons(res?.data?.persons)
    );

    return () => setMounted(false);
  }, []);

  return (
    <ModalBackground show={show}>
      <Modal>
        <TextField
          type="text"
          placeholder="Sitat"
          onChange={e => setQuote(e.target.value)}
        />
        <Select
          instanceId="saidBy"
          placeholder="Sagt av"
          isClearable={true}
          isSearchable={true}
          styles={customSelectStyles}
          onChange={(value, _) => setSaidBy(value.value)}
          options={persons.map(person => ({
            label: person.name,
            value: person.id
          }))}
        />
        <AddModalButton
          onClick={() =>
            query(
              `mutation { addQuote(input: { text: "${quote}", saidBy: "${saidBy}", date: "${new Date().getTime()}" }) { id } }`
            ).then(res => {
              setShow(false);
            })
          }
        >
          Lagre
        </AddModalButton>
      </Modal>
    </ModalBackground>
  );
};

export default AddModal;
