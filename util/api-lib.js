import fetch from 'isomorphic-fetch';

const query = async (query, context) => {
    const apiUrl = process.browser
        ? `http://${window.location.host}/api/graphql`
        : `http://${context.req.headers.host}/api/graphql`;

    const data = await fetch(apiUrl, {
        method: 'POST',
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
        `query { quotes(amount: 10, page: ${page}, sort: { field: "date", ascending: false }) { text, saidBy, date } }`,
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
