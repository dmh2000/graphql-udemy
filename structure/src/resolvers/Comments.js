const Comments = {
  // return the single user where user id == parent object user id
  user(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.user;
    });
  },
  // return the single post where post id == parent object post id
  post(parent, args, { db }, info) {
    return db.posts.find(post => {
      return post.id === parent.post;
    });
  }
};

export default Comments;
