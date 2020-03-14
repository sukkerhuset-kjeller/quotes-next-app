import CardList from "../components/CardList";

const cards = [
  {
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsum.",
    person: "John Doe",
    date: new Date().toISOString()
  },
  {
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsum.",
    person: "John Doe",
    date: new Date().toISOString()
  },
  {
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsum.",
    person: "John Doe",
    date: new Date().toISOString()
  },
  {
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsum.",
    person: "John Doe",
    date: new Date().toISOString()
  }
];

const Home = () => {
  return <CardList cards={cards} />;
};

export default Home;
