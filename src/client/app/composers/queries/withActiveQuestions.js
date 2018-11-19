// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getCurrentTime } from 'app/lib/helpers';

const QUERY = gql`
query activeQuestions($todayIs: String) {
  activeQuestions(todayIs: $todayIs) {
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
  options: {variables: {todayIs: getCurrentTime()}},
  props: mapDataToProps
});


export default compose(withActiveQuestions);