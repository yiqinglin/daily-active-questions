// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
query activeQuestions {
  activeQuestions {
    id
    active
    title
    answer
  }
}`;
const mapDataToProps = result => ({
  activeQuestions: result.data.activeQuestions,
  isFetching: result.data.loading
});
const withActiveQuestions = graphql(QUERY, {
  props: mapDataToProps
});


export default compose(withActiveQuestions);