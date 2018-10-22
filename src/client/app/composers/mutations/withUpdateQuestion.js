// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation updateQuestion($question: String, $qid: String){
    updateQuestion(question: $question, qid: $qid)
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  updateQuestion: (question, qid) => mutate({
    variables: { question, qid },
    refetchQueries: ['activeQuestions']
  })
});
const withUpdateQuestion = graphql(MUTATION, {
  props: mapActionsToProps
});


export default compose(withUpdateQuestion);