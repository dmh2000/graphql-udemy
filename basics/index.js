import { GraphqlServer, GraphQLServer } from 'graphql-yoga';

// Type definitions : application schema
const typeDefs = `
type Query {
  hello: String!,
  name: String!
  location: String!,
  bio: String!
}
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'hello';
    },
    name() {
      return 'my name';
    },
    location() {
      return 'sparks';
    },
    bio() {
      return 'retired';
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log('server running');
});
