import { ApolloServer, gql } from 'apollo-server-micro';
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
    context: () => {
        return {};
    },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(handler);
