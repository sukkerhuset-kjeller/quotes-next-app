import Select from "react-select";
import Button from "./Button";

const persons = [
  { id: 2, name: "John Doe" },
  { id: 5, name: "Andreas Hammer" },
  { id: 6, name: "Ole Kristian Aune" }
];

const AddModal = () => {
  return (
    <div className="add-modal-background">
      <div className="add-modal">
        <input
          className="add-modal__text-field"
          type="text"
          placeholder="Sitat"
        />
        <Select
          isClearable={true}
          isSearchable={true}
          options={persons.map(person => ({
            label: person.name,
            value: person.id
          }))}
        />
        <Button className="add-modal__button" text="Lagre" />
      </div>

      <style jsx>{`
        .add-modal-background {
          z-index: 2;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #24133285;
          backdrop-filter: blur(9px);
        }

        .add-modal {
          background: #ffffff;
          border-radius: 40px;
          width: calc(100% - 2rem);
          max-width: 500px;
          min-height: 100px;
          margin: 1rem;
          padding: 2rem;
        }

        .add-modal__text-field {
          border: none;
          width: 100%;
          font-size: 1rem;
          color: hsl(0, 0%, 50%);
          border-bottom: 1px solid #dddddd;
          margin-bottom: 1rem;
          padding: 0.5rem 10px;
        }
        .add-modal__text-field::placeholder {
          color: hsl(0, 0%, 50%);
        }

        .add-modal__button {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AddModal;
