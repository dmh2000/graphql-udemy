import { GraphqlServer, GraphQLServer } from 'graphql-yoga';

// scalar types - String, Boolean, Int, Float, ID

// Type definitions : application schema
const typeDefs = `
  type Query {
    me : User!
    post(index: Int): Post
    postById(id: ID) : Post

    greeting(name: String): String!
    add(a: [Float!]): Float!
    grades: [Int!]!

    posts: [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id : ID!
    title : String!
    body : String!
    published: Boolean!
  }
`;

const posts = [
  {
    id: 1,
    title: 'this is a post title 1',
    body: 'This is a post body 1',
    published: true,
  },
  {
    id: 2,
    title: 'this is a post title 2 ',
    body: 'This is a post body 2 ',
    published: true,
  },
  {
    id: 3,
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
  },
];

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: 1,
        name: 'david howard',
        email: 'xyz@xyz.com',
        age: null,
      };
    },
    post(parent, args, ctx, info) {
      return posts[args.index];
    },
    greeting(parent, args, ctx, info) {
      console.log(args);
      return `hello ${args.name}`;
    },
    add(parent, args, ctx, info) {
      let i = 1;
      return args.a.reduce((p, v) => {
        console.log(p, v, i++);
        return p + v;
      }, 0);
    },
    grades(parent, args, ctx, info) {
      return [1, 2, 3, 4, 5];
    },
    posts(parent, args, ctx, info) {
      return posts;
    },
    postById(parent, args, ctx, info) {
      return posts.find(v => {
        return v.id == args.id;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => {
  console.log('server running');
});
