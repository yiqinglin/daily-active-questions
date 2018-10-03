// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation answer($answers: JSON) {
    answer(answers: $answers)
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  answer: (answers) => mutate({
    variables: { answers },
    refetchQueries: ['activeQuestions']
  })
});
const withSubmitAnswers = graphql(MUTATION, {
  props: mapActionsToProps
});


export default compose(withSubmitAnswers);