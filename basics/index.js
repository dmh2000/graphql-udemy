import { GraphqlServer, GraphQLServer } from 'graphql-yoga';
import uuidv1 from 'uuid/v1';

// scalar types - String, Boolean, Int, Float, ID

// Type definitions : application schema
const typeDefs = `
  type Query {
    me : User!

    greeting(name: String): String!
    add(a: [Float!]): Float!
    grades: [Int!]!

    post(id: ID): Post
    postById(id: ID) : Post
    posts(user: ID) : [Post]
    user(id: ID) : User
    users : [User!]!

    comments : [Comment!]!

  }

  type Mutation {
    createUser(name:String!, email:String!,age: Int) : User!
    createPost(title:String!, body:String!, published:Boolean!, user: ID!) : Post!
    createComment(text:String!,user:ID!,post:ID!) : Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id : ID!
    title : String!
    body : String!
    published: Boolean!
    user: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    post: Post!
  }
`;

const users = [
  {
    id: '1',
    name: 'bob',
    email: 'bob@xyz.com',
    age: 25,
  },
  {
    id: '2',
    name: 'alice',
    email: 'alice@xyz.com',
    age: 26,
  },
  {
    id: '3',
    name: 'jon',
    email: 'jon@xyz.com',
    age: 27,
  },
  {
    id: '4',
    name: 'mary',
    email: 'mary@xyz.com',
    age: 28,
  },
];

function newUser(args) {
  // quit if email already in user
  const emailTaken = users.some(u => u.email === args.email);
  if (emailTaken) throw new Error('Email taken');

  // create a user object
  const user = {
    id: uuidv1(),
    ...args,
  };

  // add to users database
  users.push(user);

  // send to client
  return user;
}

const posts = [
  {
    id: 1,
    title: 'this is a post title 1',
    body: 'This is a post body 1',
    published: true,
    user: '1',
  },
  {
    id: 2,
    title: 'this is a post title 2 ',
    body: 'This is a post body 2 ',
    published: true,
    user: '2',
  },
  {
    id: 3,
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '3',
  },
  {
    id: 4,
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '1',
  },
];

function newPost(args) {
  const userExists = users.some(u => u.id === args.user);
  if (!userExists) throw new Error('User not found');

  const post = {
    id: uuidv1(),
    ...args,
  };

  posts.push(post);

  return post;
}

/*
  type Comment {
    id: ID!
    body: String!
    user: User!
    post: Post!
  }*/

const comments = [
  {
    id: '101',
    text: 'comment 1',
    user: '2',
    post: '1',
  },
  {
    id: '102',
    text: 'comment 2',
    user: '2',
    post: '2',
  },
  {
    id: '103',
    text: 'comment 3',
    user: '3',
    post: '3',
  },
  {
    id: '104',
    text: 'comment 1',
    user: '4',
    post: '4',
  },
];

function newComment(args) {
  const userExists = users.some(u => u.id === args.user);
  if (!userExists) throw new Error('User not found');
  const postExists = posts.some(p => p.id === args.post);
  if (!postExists) throw new Error('Post not found');

  const comment = {
    id: uuidv1(),
    ...args,
  };

  comments.push(comment);

  return comment;
}

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
    // -------------------------------------------------
    post(parent, args, ctx, info) {
      console.log('post', parent);
      return posts.find(p => (p.id = args.id));
    },
    posts(parent, args, ctx, info) {
      return posts;
    },
    postById(parent, args, ctx, info) {
      return posts.find(v => {
        return v.id === args.id;
      });
    },

    user(parent, args, ctx, info) {
      console.dir(users);
      return users.find(v => v.id === args.id);
    },

    users(parent, args, ctx, info) {
      return users;
    },

    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      return newUser(args);
    },
    createPost(parent, args, ctx, info) {
      return newPost(args);
    },
    createComment(parent, args, ctx, inf) {
      return newComment(args);
    },
  },
  Post: {
    // return the single user where the user id == parent object user id
    user(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.user;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    // return all posts where the post id == user object post id
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.user === parent.id;
      });
    },
    // return all comments where the comment user id = user object id
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.user === parent.id;
      });
    },
  },
  Comment: {
    // return the single user where user id == parent object user id
    user(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.user;
      });
    },
    // return the single post where post id == parent object post id
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

console.log('starting...');
server.start(() => {
  console.log('server running');
});
