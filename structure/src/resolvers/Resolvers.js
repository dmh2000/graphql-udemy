import Query from './Query';
import Mutation from './Mutation';
import Posts from './Posts';
import Users from './Users';
import Comments from './Comments';

const Resolvers =
  // Resolvers
  {
    Query: Query,
    Mutation: Mutation,
    Post: Posts,
    User: Users,
    Comment: Comments
  };

export default Resolvers;
