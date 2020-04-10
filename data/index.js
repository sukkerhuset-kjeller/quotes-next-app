import { getQuote, getQuotes, addQuote, heartQuote } from './Quote';
import { getPerson, getPersons, addPerson } from './Person';
import { login, register, logout, roles } from './Auth';

const checkRole = (userRole, role) => {
    console.log(userRole.toString(2));
    console.log(role.toString(2));
    console.log(userRole.toString(2).length);
    if (!userRole || (userRole & role) === 0) {
        return false;
    }
    return true;
};

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
                if (!checkRole(context?.userRole, roles.member)) {
                    return Promise.reject('Permission denied');
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
    };
};
