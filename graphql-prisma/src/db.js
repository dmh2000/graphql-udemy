let users = [
  {
    id: '1',
    name: 'bob',
    email: 'bob@xyz.com',
    age: 25
  },
  {
    id: '2',
    name: 'alice',
    email: 'alice@xyz.com',
    age: 26
  },
  {
    id: '3',
    name: 'jon',
    email: 'jon@xyz.com',
    age: 27
  },
  {
    id: '4',
    name: 'mary',
    email: 'mary@xyz.com',
    age: 28
  }
];

let posts = [
  {
    id: '1',
    title: 'this is a post title 1',
    body: 'This is a post body 1',
    published: true,
    user: '1'
  },
  {
    id: '2',
    title: 'this is a post title 2 ',
    body: 'This is a post body 2 ',
    published: true,
    user: '2'
  },
  {
    id: '3',
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '3'
  },
  {
    id: '4',
    title: 'this is a post title 3 ',
    body: 'This is a post body 3',
    published: false,
    user: '1'
  }
];

let comments = [
  {
    id: '101',
    text: 'comment 1',
    user: '2',
    post: '1'
  },
  {
    id: '102',
    text: 'comment 2',
    user: '2',
    post: '2'
  },
  {
    id: '103',
    text: 'comment 3',
    user: '3',
    post: '3'
  },
  {
    id: '104',
    text: 'comment 1',
    user: '4',
    post: '4'
  }
];

const db = {
  users,
  posts,
  comments
};

export default db;
