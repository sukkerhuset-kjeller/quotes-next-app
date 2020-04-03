import { ApolloServer, gql } from 'apollo-server-micro';
import { getUserSession } from '../../data/Auth';
import Cors from 'micro-cors';
import td from '../../data/api.gql';
import api from '../../data';

const typeDefs = gql(td);

const cors = Cors({
    allowMethods: ['GET', 'POST', 'OPTIONS'],
});

const resolvers = api();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const cookie = req?.headers?.cookie;
        let sessionId = req.headers.authentication;
        console.log(cookie);
        console.log(sessionId);
        if (cookie) {
            const cookieSuggestions = cookie
                .split(';')
                .map((cookie) => cookie.split('='))
                .filter((cookie) => cookie[0] === 'session_id');
            if (cookieSuggestions.length > 0) {
                sessionId = sessionId[0][1];
            }
        }
        return {
            userSession: await getUserSession(sessionId),
        };
    },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(handler);
