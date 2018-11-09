// @flow
import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { compose } from 'react-apollo';
import Home from 'app/components/Home';
import withUser from 'app/composers/queries/withUser';
import HomeActions from './HomeActions';

type Props = {
  classes: Object,
  user: Object,
  isFetching: Boolean
}

const theme = {
  colorPrimary: '#F9CE3E',
  colorSecondary: '#7EA391',
  colorAllow: '#94A37E',
  colorReject: '#BC8485',
  colorAccent: '#94A37E',
  colorNeutral: '#AAAAAA'
}

const App = ({ classes: c }: Props) => (
  <ThemeProvider theme={theme}>
    <div className={c.container}>
      <div className={c.titlePiece}>Daily Active Questions</div>
      <Home />
    </div>
  </ThemeProvider>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  titlePiece: {
    fontWeight: '700',
    fontSize: '130px',
    textAlign: 'center',
    height: '200px',
    marginTop: '-100px',
    lineHeight: '200px',
    color: 'white',
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
    textTransform: 'uppercase'
  }
};

export default compose(
  withUser,
  injectSheet(styles) 
)(App);
