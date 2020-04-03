import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

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

export const login = async (username, password) => {
    const res = await query(
        `mutation { login ( username: "${username}", password: "${password}" ) }`
    );
    if (res?.error) {
        return false;
    } else {
        const cookies = new Cookies();
        cookies.set('session_id', res.data.login);
        return true;
    }
};

export const queryQuotes = async (page, context) => {
    return await query(
        `query { quotes(amount: 10, page: ${page}, sort: { field: "date", ascending: false }) { id, text, saidBy, date, likes, hasLiked } }`,
        context
    );
};

export const addQuote = async (quote, saidBy) => {
    return await query(
        `mutation { addQuote(input: { text: "${quote}", saidBy: "${saidBy}" }) { id, text, saidBy, date, likes, hasLiked } }`
    );
};

export const queryPersons = async () => {
    return await query(`query { persons { name, id } }`);
};

export const likeQuote = async (id, revert) => {
    return await query(
        `mutation { likeQuote ( id: "${id}", revert: ${revert} ) }`
    );
};
