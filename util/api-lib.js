import fetch from 'isomorphic-fetch';
import { login as authLogin } from './auth';

const query = async (query, context) => {
    const apiUrl = process.browser
        ? `http://${window.location.host}/api/graphql`
        : `http://${context.req.headers.host}/api/graphql`;

    const data = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        });

    return data;
};

export const queryQuotes = async (page, context) => {
    return await query(
        `query { quotes(amount: 20, page: ${page}, sort: { field: "date", ascending: false }) { text, saidBy, date } }`,
        context
    );
};

export const addQuote = async (quote, saidBy) => {
    return await query(
        `mutation { addQuote(input: { text: "${quote}", saidBy: "${saidBy}" }) { text, saidBy, date } }`
    );
};

export const queryPersons = async () => {
    return await query(`query { persons { name, id } }`);
};

export const login = async (username, password) => {
    const res = await query(
        `mutation { login ( username: "${username}", password: "${password}" ) }`
    );
    if (res?.error) {
        return false;
    } else {
        if (res.data.login) {
            authLogin(res.data.login);
            return true;
        } else {
            return false;
        }
    }
};
