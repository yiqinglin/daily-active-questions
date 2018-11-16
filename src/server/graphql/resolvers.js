import GraphQLJSON from 'graphql-type-json';
import QueryResolvers from './resolvers/queries';
import MutationResolvers from './resolvers/mutations';

export default {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  JSON: GraphQLJSON
};
