// @flow
import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { compose } from 'react-apollo';
import cx from 'classnames';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from 'app/components/Home';
import HomeActions from 'app/components/HomeActions';
import Login from 'app/components/Login';
import Dashboard from 'app/components/dashboard/Dashboard';
import withUser from 'app/composers/queries/withUser';
import PrivateRoute from './PrivateRoute';
import { AppStateContext } from './AppStateContext';

type Props = {
  classes: Object,
  user: Object,
  isFetching: Boolean
}

const theme = {
  colorPrimary: '#34495E',
  colorSecondary: '#F1C40F',
  colorAccent: '#c0392b',
  colorNeutral: '#bdc3c7',
  colorCodeRed: '#c0392b',
  colorCodeOrange: '#d35400',
  colorCodeYellow: '#f39c12',
  colorCodeGreen: '#27ae60',
  colorCodeBlue: '#2c3e50'
};

const MuiTheme = createMuiTheme({
  palette: {
    default: { main: theme.colorNeutral},
    primary: { main: theme.colorPrimary},
    secondary: { main: theme.colorSecondary},
    error: { main: theme.colorAccent}
  },
  // To mute the warning of the upcoming typography migration: https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: { useNextVariants: true }
})

class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    
    this.updateEditState = (nextState) => {
      this.setState({
        isEditing: nextState
      })
    }

    this.updateSubmitState = (nextState) => {
      this.setState({
        isSubmitting: nextState
      })
    }

    this.state = {
      isEditing: false,
      isSubmitting: false,
      updateEditState: this.updateEditState,
      updateSubmitState: this.updateSubmitState
    }
  }

  render() {
    const { classes: c } = this.props;
    const isOnLoginPage = window.location.href.split('/').pop() === 'login';

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <ThemeProvider theme={theme}>
          <AppStateContext.Provider value={this.state}>
            <Router>
              <div className={c.container}>
                <div className={c.menuBar}>
                  <img src="/img/logo_with_text.png"/>
                </div>
                <Switch>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/dashboard/:mode?/:year?/:month?/:day?" component={Dashboard} />
                  <PrivateRoute path="/" component={Home} />
                </Switch>
                <PrivateRoute path="/" component={HomeActions} />
                <div className={cx(c.backgroundElements, isOnLoginPage && c.hide)}>
                  reflekt
                </div>
              </div>
            </Router>
          </AppStateContext.Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  menuBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    marginTop: '10px',
    '& img': {
      height: '100%',
      width: 'auto'
    }
  },
  backgroundElements: {
    zIndex: '-1',
    left: '-20px',
    bottom: '0',
    position: 'fixed',
    fontFamily: '"Barlow", sans-serif',
    fontSize: '250px',
    fontWeight: '500',
    color: theme.colorAccent
  },
  hide: {
    display: 'none'
  }
};

export default compose(
  withUser,
  injectSheet(styles) 
)(App);
