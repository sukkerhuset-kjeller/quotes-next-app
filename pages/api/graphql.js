import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';
import api from '../../data';
import td from '../../data/api.gql';
import { getUserSession } from '../../data/Auth';

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
        if (cookie) {
            const cookieSuggestions = cookie
                .split(';')
                .map((cookie) => cookie.split('='))
                .filter(
                    (cookie) => cookie[0].replace(/ /g, '') === 'session_id'
                );
            if (cookieSuggestions.length > 0) {
                sessionId = cookieSuggestions[0][1];
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
