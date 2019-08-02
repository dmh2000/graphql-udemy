const Users = {
  // return all posts where the post id == user object post id
  posts(parent, args, { db }, info) {
    return db.posts.filter(post => {
      return post.user === parent.id;
    });
  },
  // return all comments where the comment user id = user object id
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.user === parent.id;
    });
  }
};

export default Users;
