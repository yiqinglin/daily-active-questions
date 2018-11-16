/* eslint-disable */
export default /* GraphQL */`

scalar JSON

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
  answer(answers: JSON): Boolean
  addQuestion(question: String): Boolean
  deleteQuestion(qid: String): Boolean
  updateQuestion(question: String, qid: String): Boolean
}

schema {
  query: Query
  mutation: Mutation
}
`;
