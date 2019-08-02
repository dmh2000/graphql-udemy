const Posts = {
  // return the single user where the user id == parent object user id
  user(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.user;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export default Posts;
