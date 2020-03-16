import { getQuote, getQuotes, addQuote } from './Quote';
import { getPerson, getPersons, addPerson } from './Person';

export default () => {
    return {
        Query: {
            quote: (parent, { id }) => getQuote(id),
            quotes: (parent, { input, sort, amount, page }) =>
                getQuotes(input, sort, amount, page),
            person: (parent, { id }) => getPerson(id),
            persons: (parent, { name }) => getPersons(name),
        },
        Mutation: {
            addQuote: (parent, { input }) =>
                addQuote(input.text, input.date, input.said_by, input.tags),
        },
        Quote: {
            said_by: (parent) => getPerson(parent.said_by),
            tags: (parent) =>
                Promise.all(parent.tags.map((person) => getPerson(person))),
        },
    };
};
