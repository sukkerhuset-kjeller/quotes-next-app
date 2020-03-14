import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';

const typeDefs = gql`
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: (_parent, _args, _context) => 'hello',
    },
};

const cors = Cors({
    allowMethods: [
        'GET',
        'POST',
        'OPTIONS'
    ],
});

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