const Card = ({ text, person, date }) => {
  return (
    <>
      <p>{text}</p>
      <p>{person}</p>
      <p>{date}</p>
    </>
  );
};

export default Card;
