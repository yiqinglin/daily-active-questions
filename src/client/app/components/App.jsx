// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'react-apollo';
import Home from 'app/components/Home';
import Header from 'app/components/header/Header';
import withUser from 'app/composers/queries/withUser';

type Props = {
  classes: Object,
  user: Object,
  isFetching: Boolean
}

const App = ({ classes: c }: Props) => (
  <div className={c.container}>
    <Header />
    <Home />
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default compose(
  withUser,
  injectSheet(styles) 
)(App);
