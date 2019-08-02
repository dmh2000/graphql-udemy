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
    createUser(data: CreateUserInput) : User!
    deleteUser(id: ID!) : User!

    createPost(data: CreatePostInput) : Post!
    deletePost(id: ID!) : Post!

    createComment(data: CreateCommentInput) : Comment!
    deleteComment(id: ID!) : Comment!
  }

  input CreateUserInput {
    name:String!
    email:String!
    age: Int
  }

  input CreatePostInput {
    title:String!
    body:String!
    published:Boolean!
    user: ID!
  }

  input CreateCommentInput {
    text:String!
    user:ID!
    post:ID!
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

let users = [
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

function newUser(data) {
  // quit if email already in user
  const emailTaken = users.some(u => u.email === data.email);
  if (emailTaken) throw new Error('Email taken');

  // create a user object
  const user = {
    id: uuidv1(),
    ...data,
  };

  // add to users database
  users.push(user);

  // send to client
  return user;
}

function removeUser(id) {
  let user = users.find(u => u.id === id);
  if (users === null) throw new Error('User Not Found');

  // keep only comments not made by this user
  comments = comments.filter(comment => comment.user !== id);

  // get list of posts made by this user
  let userPosts = posts.filter(post => post.user === id);

  // remove any comments to that post made by user
  comments = comments.filter(comment => {
    // keep only comments that are not linked to posts by this user
    // i.e. return false if this comments post matches a user post
    // return true if comments post does not match a user post
    return !userPosts.find(post => comment.post === post.id);
  });

  // keep only posts not made by this user
  posts = posts.filter(post => post.user !== id);

  // keep all users except this one
  users = users.filter(user => user.id !== id);

  return user;
}

let posts = [
  {
    id: '1',
    title: 'this is a post title 1',
    body: 'This is a post body 1',
    published: true,
    user: '1',
  },
  {
    id: '2',
    title: 'this is a post title 2 ',
    body: 'This is a post body 2 ',
    published: true,
    user: '2',
  },
  {
    id: '3',
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '3',
  },
  {
    id: '4',
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '1',
  },
];

function newPost(data) {
  const userExists = users.some(u => u.id === data.user);
  if (!userExists) throw new Error('User not found');

  const post = {
    id: uuidv1(),
    ...data,
  };

  posts.push(post);

  return post;
}

function removePost(id) {
  let post = posts.find(p => p.id === id);
  if (post === null) {
    throw new Error("Post doesn't exist");
  }

  // remove comments for that post
  // remove any comments to that post made by user
  comments = comments.filter(comment => {
    // keep only comments that don't match id
    return comment.post !== id;
  });

  // remove the post
  posts = posts.filter(p => p.id !== id);

  return post;
}
/*
  type Comment {
    id: ID!
    body: String!
    user: User!
    post: Post!
  }*/

let comments = [
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

function newComment(data) {
  const userExists = users.some(u => u.id === data.user);
  if (!userExists) throw new Error('User not found');
  const postExists = posts.some(p => p.id === data.post);
  if (!postExists) throw new Error('Post not found');

  const comment = {
    id: uuidv1(),
    ...data,
  };

  comments.push(comment);

  return comment;
}

function removeComment(id) {
  const comment = comments.find(c => c.id === id);
  if (comment === null) {
    throw new Error("comment doesn't exist");
  }

  comments = comments.filter(c => c.id !== comment.id);

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
    // USERS
    createUser(parent, args, ctx, info) {
      return newUser(args.data);
    },
    deleteUser(parent, args, ctx, info) {
      return removeUser(args.id);
    },
    // POSTS
    createPost(parent, args, ctx, info) {
      return newPost(args.data);
    },
    deletePost(parent, args, ctx, info) {
      return removePost(args.id);
    },
    // COMMENTS
    createComment(parent, args, ctx, inf0) {
      return newComment(args.data);
    },
    deleteComment(parent, args, ctx, info) {
      return removeComment(args.id);
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
