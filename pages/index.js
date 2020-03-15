import Head from "next/head";

import Header from "../components/Header";
import CardList from "../components/CardList";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";

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
      <CardList />
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
