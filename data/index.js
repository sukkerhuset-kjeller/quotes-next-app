import { login, logout, register } from './Auth';
import { getPerson, getPersons } from './Person';
import { addQuote, getQuote, getQuotes, likeQuote } from './Quote';

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
            validSession: (parent, args, context) => {
                console.log(context?.userSession);
                if (context?.userSession && context?.userSession !== 'id') {
                    return true;
                }
                return false;
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
            likeQuote: (parent, { id, revert }, context) => {
                if (!context?.userSession) {
                    return Promise.reject('No user session found');
                }
                return likeQuote(id, revert, context.userSession);
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
    };
};
