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
  value: String,
  timestamp: String
}

type QuestionAnswer {
  question: String,
  value: String
}

type DailyDetails {
  date: String,
  questions: [QuestionAnswer]
}

# the schema allows the following query:
type Query {
  user: User
  activeQuestions(todayIs: String): [Question]
  dailyAverage(timeframe: String): [DailyAverage]
  dailyDetails(month: String): [DailyDetails]
}

# this schema allows the following mutation:
type Mutation {
  answer(answers: JSON, timestamp: String): Boolean
  addQuestion(question: String): Boolean
  deleteQuestion(qid: String): Boolean
  updateQuestion(question: String, qid: String): Boolean
}

schema {
  query: Query
  mutation: Mutation
}
`;
