import Query from './Query';
import Mutation from './Mutation';
import Post from './Post';
import User from './User';
import Comment from './Comment';
import Subscription from './Subscription';

const Resolvers =
  // Resolvers
  {
    Query: Query,
    Mutation: Mutation,
    Post: Post,
    User: User,
    Comment: Comment,
    // Subscription: Subscription
  };

export default Resolvers;
