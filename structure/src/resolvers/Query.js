import uuidv1 from 'uuid/v1';

const Query = {
  post(parent, args, { db }, info) {
    console.log('post', parent);
    return db.posts.find(p => (p.id = args.id));
  },
  posts(parent, args, { db }, info) {
    return db.posts;
  },
  postById(parent, args, { db }, info) {
    return db.posts.find(v => {
      return v.id === args.id;
    });
  },

  user(parent, args, { db }, info) {
    return db.users.find(v => v.id === args.id);
  },

  users(parent, args, { db }, info) {
    return db.users;
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export default Query;
