import Card from "./Card";

const CardList = ({ cards }) => {
  return (
    <>
      {cards.map(entry => (
        <Card text={entry.text} person={entry.person} date={entry.date} />
      ))}
    </>
  );
};

export default CardList;
