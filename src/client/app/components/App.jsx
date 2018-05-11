// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Home from 'app/components/Home';
import Header from 'app/components/header/Header';

type Props = {
  classes: Object
}

const App = ({ classes: c }: Props) => (
  <div className={c.container}>
    <Header />
    <Home />
    <a href="/auth/google">Sign In with Google</a>
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

export default injectSheet(styles)(App);
