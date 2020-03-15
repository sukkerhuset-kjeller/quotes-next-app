import Card from "./Card";

const CardList = ({ data }) => {
  const cards = data ? data.reverse() : [];
  return (
    <div className="card-list">
      {cards.map(entry => (
        <Card
          key={entry.date}
          text={entry.text}
          said_by={entry.said_by}
          date={entry.date}
        />
      ))}
      <style jsx>{`
        .card-list {
          max-width: 500px;
          display: flex;
          flex-direction: column-reverse;
          margin: 0 auto;
          margin-top: 64px;
        }
      `}</style>
    </div>
  );
};

export default CardList;
