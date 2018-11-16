// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation answer($answers: JSON, $timestamp: String) {
    answer(answers: $answers, timestamp: $timestamp)
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  answer: (answers, timestamp) => mutate({
    variables: { answers, timestamp },
    refetchQueries: ['activeQuestions']
  })
});
const withSubmitAnswers = graphql(MUTATION, {
  props: mapActionsToProps
});


export default compose(withSubmitAnswers);