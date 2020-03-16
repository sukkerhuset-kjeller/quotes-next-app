import { formatDistance } from "date-fns";
import { nb } from "date-fns/locale";

const Card = ({ text, saidBy, date }) => {
  return (
    <div className="card">
      <p className="card__date">
        {formatDistance(new Date(Number(date)), new Date(), { locale: nb })}{" "}
        siden
      </p>
      <p className="card__quote">{text}</p>
      <p className="card__author">{saidBy}</p>

      <style jsx>{`
        .card {
          margin-top: -80px;
          padding: calc(2rem + 80px) 3rem 2rem 3rem;
          color: #ffffff;
          border-radius: 0 0 0 80px;
        }
        .card:nth-child(3n + 1) {
          background-color: #d47fa6;
        }
        .card:nth-child(3n + 3) {
          background-color: #8a56ac;
        }
        .card:nth-child(3n + 2) {
          background-color: #241332;
        }

        .card__date {
          font-size: 0.6875rem;
          text-transform: uppercase;
          font-weight: 600;
          margin: 0;
          opacity: 0.48;
        }

        .card__quote {
          font-size: 1.4rem;
          font-weight: 500;
          margin: 0.5rem 0;
        }

        .card__author {
          font-size: 0.75rem;
          font-weight: 500;
          font-style: italic;
          margin: 0;
          opacity: 0.48;
        }
      `}</style>
    </div>
  );
};

export default Card;
