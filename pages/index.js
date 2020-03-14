import Head from "next/head";
import { subDays, subHours } from "date-fns";
import CardList from "../components/CardList";

const cards = [
  {
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsum.",
    said_by: "John Doe",
    date: new Date().toJSON()
  },
  {
    text:
      "Atque esse, magnam debitis voluptatem odio placeat facere perspiciatis illum.",
    said_by: "John Doe",
    date: subHours(new Date(), 1).toJSON()
  },
  {
    text:
      "Facilis est aliquid reiciendis voluptate quasi unde dolorum, consequuntur esse!",
    said_by: "John Doe",
    date: subDays(new Date(), 1).toJSON()
  },
  {
    text:
      "Natus consectetur nobis molestias architecto delectus dolorum tempore sapiente aliquid?",
    said_by: "John Doe",
    date: subDays(new Date(), 3).toJSON()
  }
];

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Sukkerhuset sitater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardList data={cards} />
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #dedce0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
