import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Home from 'app/components/Home';
import Header from 'app/components/header/Header';

const propTypes = {
  classes: PropTypes.object
};


const App = ({ classes: c }) => (
  <div className={c.container}>
    <Header />
    <Home />
  </div>
);

App.propTypes = propTypes;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default injectSheet(styles)(App);
