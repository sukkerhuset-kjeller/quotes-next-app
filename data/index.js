import { getQuote, getQuotes, addQuote } from "./Quote";
import { getPerson, getPersons, addPerson } from "./Person";

export default () => {
  return {
    Query: {
      getQuote: (parent, { id }) => getQuote(id),
      getQuotes: (parent, { amount, page }) => getQuotes(amount, page),
      getPerson: (parent, { id }) => getPerson(id),
      getPersons: parent => getPersons()
    },
    Mutation: {
      addQuote: (parent, { input }) =>
        addQuote(input.text, input.date, input.said_by, input.tags)
    },
    Quote: {
      said_by: parent => getPerson(parent.said_by),
      tags: parent => Promise.all(parent.tags.map(person => getPerson(person)))
    }
  };
};
