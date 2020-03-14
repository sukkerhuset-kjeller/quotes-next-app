import { formatDistance } from "date-fns";
import { nb } from "date-fns/locale";

const Card = ({ text, said_by, date }) => {
  return (
    <div className="card">
      <p className="card__date">
        {formatDistance(new Date(date), new Date(), { locale: nb })} siden
      </p>
      <p className="card__quote">{text}</p>
      <p className="card__author">{said_by}</p>

      <style jsx>{`
        .card {
          margin-top: -80px;
          padding: calc(2rem + 80px) 3rem 2rem 3rem;
          color: white;
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
          font-size: 1.5rem;
          font-weight: 800;
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
