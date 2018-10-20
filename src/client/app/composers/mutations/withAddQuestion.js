// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation addQuestion($question: String){
    addQuestion(question: $question)
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  addQuestion: (question) => mutate({
    variables: { question },
    refetchQueries: ['activeQuestions']
  })
});
const withAddQuestion = graphql(MUTATION, {
  props: mapActionsToProps
});


export default compose(withAddQuestion);