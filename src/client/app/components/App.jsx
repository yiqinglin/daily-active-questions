// @flow
import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { compose } from 'react-apollo';
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
  colorPrimary: '#F9CE3E',
  colorSecondary: '#7EA391',
  colorAllow: '#94A37E',
  colorReject: '#BC8485',
  colorAccent: '#94A37E',
  colorNeutral: '#AAAAAA',
  colorCodeRed: '#540B0E',
  colorCodeOrange: '#9E2A2B',
  colorCodeYellow: '#E09F3E',
  colorCodeGreen: '#82AD6D',
  colorCodeBlue: '#335C67'
};

const MuiTheme = createMuiTheme({
  palette: {
    default: { main: theme.colorNeutral},
    primary: { main: theme.colorPrimary},
    secondary: { main: theme.colorSecondary},
    error: { main: theme.colorReject}
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

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <ThemeProvider theme={theme}>
          <AppStateContext.Provider value={this.state}>
            <Router>
              <div className={c.container}>
                <div className={c.titlePiece}>Daily Active Questions</div>
                <Switch>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/dashboard/:mode?/:year?/:month?/:day?" component={Dashboard} />
                  <PrivateRoute path="/" component={Home} />
                </Switch>
                <PrivateRoute path="/" component={HomeActions} />
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
