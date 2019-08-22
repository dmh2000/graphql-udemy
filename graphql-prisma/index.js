import { GraphqlServer, GraphQLServer } from 'graphql-yoga';
import uuidv1 from 'uuid/v1';
import prisma from './prisma.js';
import resolvers from './src/resolvers/Resolvers.js';

// scalar types - String, Boolean, Int, Float, ID

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: resolvers,
  context: {
    prisma,
  },
});

console.log('starting...');
server.start(() => {
  console.log('server running');
});
