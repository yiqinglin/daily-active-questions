// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { getCurrentTime } from 'app/lib/helpers';

const QUERY = gql`
query dailyAverage($timeframe: String) {
  dailyAverage(timeframe: $timeframe) {
    value
    timestamp
  }
}`;
const mapDataToProps = result => ({
  dailyAverage: result.data.dailyAverage,
  isFetching: result.data.loading
});
const withDailyAverage = graphql(QUERY, {
  options: ({ today }) => ({variables: {timeframe: today || getCurrentTime()}}),
  props: mapDataToProps
});

export default compose(withDailyAverage);
