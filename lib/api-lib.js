import fetch from 'isomorphic-fetch';

export const query = async (query) => {
    const data = await fetch('/api/graphql', {
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
