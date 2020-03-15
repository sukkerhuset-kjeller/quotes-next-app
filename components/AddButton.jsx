const AddButton = () => {
  return (
    <button className="add-button">
      <img src="/icon-add.svg" alt="" />
      <style jsx>{`
        .add-button {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: #ffffff;
          border: none;
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-tiems: center;
          justify-content: center;
          box-shadow: 0px 1px 2px 0px #0000001a;
        }
      `}</style>
    </button>
  );
};

export default AddButton;
