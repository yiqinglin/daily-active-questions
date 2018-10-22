// @flow
import React from 'react';
import { graphql, compose } from 'react-apollo';
import injectSheet from 'react-jss';
import gql from 'graphql-tag';
import QuestionList from 'app/components/questionnaire/QuestionList';
import withUser from 'app/composers/queries/withUser';

type Props = {
  classes: Object,
  user: Object
}

const Home = ({ classes: c, user }: Props) => (
  <div className={c.container}>
    <h3 className={c.headline}>Did I do my best...</h3>
    {user ? <QuestionList /> : <div>Log in with your Google account and start</div>}
  </div>
);

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

export default compose(
  injectSheet(styles),
  withUser
)(Home);
