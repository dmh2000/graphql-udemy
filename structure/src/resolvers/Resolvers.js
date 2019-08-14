import Query from './Query';
import Mutation from './Mutation';
import Posts from './Posts';
import Users from './Users';
import Comments from './Comments';
import Subscription from './Subscription';

const Resolvers =
  // Resolvers
  {
    Query: Query,
    Mutation: Mutation,
    Post: Posts,
    User: Users,
    Comment: Comments,
    Subscription: Subscription
  };

export default Resolvers;
