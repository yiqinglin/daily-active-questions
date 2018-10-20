// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION = gql`
  mutation deleteQuestion($qid: String){
    deleteQuestion(qid: $qid)
  }
`;
const mapActionsToProps = ({ mutate }) => ({
  deleteQuestion: (qid) => mutate({
    variables: { qid },
    refetchQueries: ['activeQuestions']
  })
});
const withDeleteQuestion = graphql(MUTATION, {
  props: mapActionsToProps
});


export default compose(withDeleteQuestion);