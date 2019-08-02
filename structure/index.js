import { GraphqlServer, GraphQLServer } from 'graphql-yoga';

import db from './src/db';
import Resolvers from './src/resolvers/Resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: Resolvers,
  context: {
    db
  }
});

console.log('starting...');
server.start(() => {
  console.log('server running');
});
