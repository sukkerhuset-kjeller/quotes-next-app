import Head from "next/head";

import Header from "../components/Header";
import CardList from "../components/CardList";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";

const cards = [
  {
    text:
      'Hvis du vil så kan vi splitte "the work". Du kan ta fremsiden, så tar jeg baksiden.',
    said_by: "Andreas Hammer",
    date: new Date("2020-02-23").toJSON()
  },
  {
    text:
      "We're flying in airplanes all over the world. They're pink and heavy, and that's how they float.",
    said_by: "Andreas Hammer",
    date: new Date("2020-02-19").toJSON()
  },
  {
    text: "Den var ikke spennende før den bevegde på seg.",
    said_by: "Ole Kristian Aune",
    date: new Date("2020-02-16").toJSON()
  },
  {
    text: "Jeg må ha en finger i alle.",
    said_by: "Odin Langgård Håkonsen",
    date: new Date("2020-02-16").toJSON()
  },
  {
    text: "Har du noe Vaseline?",
    said_by: "Andreas Hammer",
    date: new Date("2020-02-01").toJSON()
  },
  {
    text: "Hun var ikke like ruglete som huden rundt leppene mine.",
    said_by: "Andreas Hammer",
    date: new Date("2020-01-30").toJSON()
  },
  {
    text: "Det var bilde av meg og hun oppå hverandre.",
    said_by: "Andreas Hammer",
    date: new Date("2020-01-30").toJSON()
  },
  {
    text: "The rear entrance is always the best.",
    said_by: "Andreas Hammer",
    date: new Date("2020-01-21").toJSON()
  },
  {
    text: "Snø is the world playing a game on you.",
    said_by: "Andreas Hammer",
    date: new Date("2020-01-20").toJSON()
  },
  {
    text: "Pølsa er litt for bløt.",
    said_by: "Andreas Hammer",
    date: new Date("2020-01-09").toJSON()
  },
  {
    text: "Jeg har sidesyn enda.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-15").toJSON()
  },
  {
    text: "D e alt annet enn fette smud.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-15").toJSON()
  },
  {
    text: "Det er verre når det blir verre.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-15").toJSON()
  },
  {
    text: "Snø er regn i høyden.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-08").toJSON()
  },
  {
    text: "Det høres ut som sexlivet mitt.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-08").toJSON()
  },
  {
    text: "I-ene mine ser ut som to firkantparenteser som er bløtlagte.",
    said_by: "Andreas Hammer",
    date: new Date("2019-12-07").toJSON()
  }
];

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Sukkerhuset sitater</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,500i,600,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header></Header>
      <CardList data={cards} />
      <AddButton />
      {/*<AddModal/>*/}
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0;
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
          font-family: "Montserrat", sans-serif;
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
