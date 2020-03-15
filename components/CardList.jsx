import { useState, useEffect } from "react";

import query from "../lib/api-lib";

import Card from "./Card";

const CardList = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    query(
      `query { quotes(amount: 10, page: 0) { text, said_by{name}, date } }`
    ).then(res => setQuotes(res?.data?.quotes.reverse()));
  });

  return (
    <div className="card-list">
      {quotes.map((entry, index) => (
        <Card
          key={index}
          text={entry?.text}
          said_by={entry?.said_by?.name}
          date={entry?.date}
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
