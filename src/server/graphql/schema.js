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

# Daily average scores across all questions
type DailyAverage {
  value: Float,
  timestamp: Float
}

# the schema allows the following query:
type Query {
  user: User
  activeQuestions: [Question]
  dailyAverage: [DailyAverage]
}

# this schema allows the following mutation:
type Mutation {
  answer(answers: JSON, timestamp: Float): Boolean
  addQuestion(question: String): Boolean
  deleteQuestion(qid: String): Boolean
  updateQuestion(question: String, qid: String): Boolean
}

schema {
  query: Query
  mutation: Mutation
}
`;
