/* eslint-disable */
export default /* GraphQL */`

# Answers
type Answer {
  timestamp: Float
  value: Float
}

# Questions
type Question {
  id: ID!
  active: Float
  title: String
  answer: Float
}

# Users
type User {
  id: ID!
  avatar: String
  language: String
  displayName: String
  questions: [Question]
}

# the schema allows the following query:
type Query {
  user: User
  activeQuestions: [Question]
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
