import { ApolloServer, gql } from "apollo-server-micro";
import { getUserSession } from "../../data/Auth";
import Cors from "micro-cors";
import td from "../../data/api.gql";
import api from "../../data";

const typeDefs = gql(td);

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"]
});

const resolvers = api();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    userSession: await getUserSession(req.headers.authentication)
  })
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(handler);
