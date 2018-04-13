// @flow
import React from 'react';
import { graphql, compose } from 'react-apollo';
import injectSheet from 'react-jss';
import gql from 'graphql-tag';
import QuestionList from 'app/components/questionnaire/QuestionList';

type Props = {
  classes: Object
}

const questions = [
  'To set clear goals?',
  'To make progress for achieving my goals?',
  'To find meaning?',
  'To be happy?',
  'To build positive relationships?',
  'To be fully engaged?'
]
const Home = ({ classes: c }: Props) => (
  <div className={c.container}>
    <h3 className={c.headline}>Did I do my best...</h3>
    <QuestionList questions={questions}/>
    {/* <button
      onClick={() => !isFetching && addUser(`User${Date.now()}`)}
    >
      Add a user
    </button>
    <h5>Users</h5>
    <ul>
      {users.map(user =>
        <li key={user.username}>{user.username}</li>
      )}
    </ul> */}
  </div>
);

/**
 * Query Data
 */
// const QUERY = gql`
//   query getUsers {
//     users {
//       _id,
//       username
//     }
//   }
// `;
// const mapDataToProps = result => ({
//   users: result.data.users,
//   isFetching: result.data.loading
// });
// const withData = graphql(QUERY, {
//   props: mapDataToProps
// });

/**
 * Query Actions
 */
// const ACTIONS = gql`
//   mutation addUser($username: String!) {
//     addUser(username: $username) {
//       _id,
//       username
//     }
//   }
// `;
// const mapActionsToProps = ({ mutate }) => ({
//   addUser: username => mutate({
//     variables: { username },
//     refetchQueries: ['getUsers']
//   })
// });
// const withActions = graphql(ACTIONS, {
//   props: mapActionsToProps
// });

const styles = {
  container: {
    backgroundColor: 'white',
    width: '700px',
    minHeight: '300px',
    padding: '18px'
  },
  headline: {
    marginBottom: '36px'
  }
};

// export default compose(withData, withActions)(Home);
export default injectSheet(styles)(Home);
