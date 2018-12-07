// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
query dailyDetails($month: String) {
  dailyDetails(month: $month) {
    date
    questions {
      question
      value
    }
  }
}`;
const mapDataToProps = result => ({
  dailyDetails: result.data.dailyDetails,
  isFetching: result.data.loading
});
const withDailyDetails = graphql(QUERY, {
  options: ({ activeDate }) => ({variables: {month: activeDate}}),
  props: mapDataToProps
});

export default compose(withDailyDetails);
