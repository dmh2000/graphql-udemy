const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(p => p.id === postId && p.published);
      if (post === null) throw new Error('Post Not Found');

      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  // SUBSCRIBE step 1 : define the subscription
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    }
  }
};

export default Subscription;
