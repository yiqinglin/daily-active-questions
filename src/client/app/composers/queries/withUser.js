// @flow
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
query user {
  user {
    id
    avatar
    displayName
  }
}`;
const mapDataToProps = result => ({
  user: result.data.user,
  isFetching: result.data.loading
});
const withUser = graphql(QUERY, {
  props: mapDataToProps
});

export default compose(withUser);