/* eslint-disable */
export default /* GraphQL */`

# Users
type User {
  id: ID!
  avatar: String
  language: String
  displayName: String
}

# Todos
type Todo {
  id: ID!
  title: String
  completed: Boolean!
}

# the schema allows the following query:
type Query {
  user: User
  todos: [Todo]
}

# this schema allows the following mutation:
type Mutation {
  login: User
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
