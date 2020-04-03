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
        let sessionId = req.headers.cookie
            .split(';')
            .map((cookie) => cookie.split('='))
            .filter((cookie) => cookie[0] === 'session_id')[0][1];
        return {
            userSession: await getUserSession(
                req.headers.authentication || sessionId
            ),
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
