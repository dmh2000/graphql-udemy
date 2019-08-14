import uuidv1 from 'uuid/v1';

// constants
const MUTATION_CREATE = 'CREATED';
const MUTATION_DELETE = 'DELETED';
const MUTATION_UPDATE = 'UPDATED';

// ============================================
// USERS
// ============================================
function _createUser(db, data) {
  // quit if email already in user
  const emailTaken = db.users.some(u => u.email === data.email);
  if (emailTaken) throw new Error('Email taken');

  // create a user object
  const user = {
    id: uuidv1(),
    ...data
  };

  // add to users database
  db.users.push(user);

  // send to client
  return user;
}

function _deleteUser(db, id) {
  let user = db.users.find(u => u.id === id);
  if (user === null) throw new Error('User Not Found');

  // keep only comments not made by this user
  db.comments = db.comments.filter(comment => comment.user !== id);

  // get list of posts made by this user
  let userPosts = db.posts.filter(post => post.user === id);

  // remove any comments to that post made by user
  db.comments = db.comments.filter(comment => {
    // keep only comments that are not linked to posts by this user
    // i.e. return false if this comments post matches a user post
    // return true if comments post does not match a user post
    return !userPosts.find(post => comment.post === post.id);
  });

  // keep only posts not made by this user
  db.posts = db.posts.filter(post => post.user !== id);

  // keep all users except this one
  db.users = db.users.filter(user => user.id !== id);

  return user;
}

function _updateUser(db, id, data) {
  let user = db.users.find(u => u.id === id);
  if (user === null) throw new Error('User Not Found');
  if (typeof data.name === 'string') user.name = data.name;
  if (typeof data.age !== 'undefined') user.age = data.age;
  if (typeof data.email === 'string' && user.email !== data.email) {
    // check for duplicate email
    if (db.users.some(u => u.email === data.email)) {
      throw new Error('Duplicate email');
    }
    // update email
    user.email = data.email;
  }

  return user;
}

// ============================================
// POSTS
// ============================================
function _createPost(db, pubsub, data) {
  const userExists = db.users.some(u => u.id === data.user);
  if (!userExists) throw new Error('User not found');

  const post = {
    id: uuidv1(),
    ...data
  };

  db.posts.push(post);

  // SUBSCRIBE step 2 : publish the post (if it is published)
  if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: MUTATION_CREATE,
        data: post
      }
    });
  }

  return post;
}

function _deletePost(db, pubsub, id) {
  let post = db.posts.find(p => p.id === id);
  if (post === null) {
    throw new Error("Post doesn't exist");
  }

  // remove comments for that post
  // remove any comments to that post made by user
  db.comments = db.comments.filter(comment => {
    // keep only comments that don't match id
    return comment.post !== id;
  });

  // remove the post
  db.posts = db.posts.filter(p => p.id !== id);

  if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: MUTATION_DELETE,
        data: post
      }
    });
  }

  return post;
}

function _updatePost(db, pubsub, id, data) {
  const post = db.posts.find(p => p.id === id);
  if (post === null) throw new Error('Post Not Found');

  if (typeof data.title !== 'undefined') post.title = data.title;
  if (typeof data.body !== 'undefined') post.body = data.body;

  if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: MUTATION_UPDATE,
        data: post
      }
    });
  }

  return post;
}
// ============================================
// COMMENTS
// ============================================

function _createComment(db, pubsub, data) {
  const userExists = db.users.some(u => u.id === data.user);
  if (!userExists) throw new Error('User not found');
  const postExists = db.posts.some(p => p.id === data.post);
  if (!postExists) throw new Error('Post not found');

  const comment = {
    id: uuidv1(),
    ...data
  };

  db.comments.push(comment);

  // publish for subscribe
  pubsub.publish(`comment ${data.post}`, { comment });

  return comment;
}

function _deleteComment(db, id) {
  const comment = db.comments.find(c => c.id === id);
  if (comment === null) {
    throw new Error("comment doesn't exist");
  }

  db.comments = db.comments.filter(c => c.id !== comment.id);

  return comment;
}

function _updateComment(db, id, data) {
  const comment = db.comments.find(c => c.id === id);
  if (comment === null) throw new Error('Comment not found');

  if (typeof data.text !== 'undefined') comment.text = data.text;

  return comment;
}

const Mutation = {
  // USERS
  createUser(parent, args, { db }, info) {
    return _createUser(db, args.data);
  },
  deleteUser(parent, args, { db }, info) {
    return _deleteUser(db, args.id);
  },
  updateUser(parent, args, { db }, info) {
    return _updateUser(db, args.id, args.data);
  },
  // POSTS
  createPost(parent, args, { db, pubsub }, info) {
    return _createPost(db, pubsub, args.data);
  },
  deletePost(parent, args, { db, pubsub }, info) {
    return _deletePost(db, pubsub, args.id);
  },
  updatePost(parent, args, { db, pubsub }, info) {
    return _updatePost(db, pubsub, args.id, args.data);
  },
  // COMMENTS
  createComment(parent, args, { db, pubsub }, inf0) {
    return _createComment(db, pubsub, args.data);
  },
  deleteComment(parent, args, { db }, info) {
    return _deleteComment(db, args.id);
  },
  updateComment(parent, args, { db }, info) {
    return _updateComment(db, args.id, args.data);
  }
};

export default Mutation;
