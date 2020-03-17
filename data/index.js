import { getQuote, getQuotes, addQuote, heartQuote } from './Quote';
import { getPerson, getPersons, addPerson } from './Person';
import { login, register, logout } from './Auth';

export default () => {
    return {
        Query: {
            quote: (parent, { id }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return getQuote(id, context.userSession);
            },
            quotes: (parent, { input, sort, amount, page }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return getQuotes(
                    input,
                    sort,
                    amount,
                    page,
                    context.userSession
                );
            },
            person: (parent, { id }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return getPerson(id);
            },
            persons: (parent, { name }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return getPersons(name);
            },
        },
        Mutation: {
            addQuote: (parent, { input }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return addQuote(
                    input.text,
                    input.date,
                    input.saidBy,
                    input.tags,
                    context.userSession
                );
            },
            heartQuote: (parent, { id }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return heartQuote(id, context.userSession);
            },
            login: (parent, { username, password }) =>
                login(username, password),
            register: (parent, { username, password }) =>
                register(username, password),
            logout: (parent, args, context) => {
                if (!context?.userSession) {
                    return Promise.resolve(true);
                }
                return logout(context.userSession);
            },
        },
        Quote: {
            saidBy: (parent) => getPerson(parent.saidBy),
            tags: (parent) =>
                Promise.all(parent.tags.map((person) => getPerson(person))),
        },
    };
};
