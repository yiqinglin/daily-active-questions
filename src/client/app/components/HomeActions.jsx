// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet from 'react-jss';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { AppStateContext } from './AppStateContext';

type Props = {
  classes: Object,
  placeholder: string,
  value: string,
  history: Object,
  location: Object,
  onChange: string => void
}

const buttonStyle = {
  marginLeft: '10px'
};

const HomeActions = ({ classes: c, placeholder, value, onChange, history, location }: Props) => {
  const backToHome = (
    <Tooltip title="Home" key="redirect">
      <Fab
        aria-label="home"
        style={buttonStyle}
        onClick={() => window.location="/"}
        size="medium"
        color="default"
      >
        <i className="material-icons">home</i>
    </Fab>
   </Tooltip>
  );
  const dashboard = (
    <Tooltip title="Dashboard" key="redirect">
      <Fab
        onClick={() => history.push('/dashboard')}
        aria-label="dashboard"
        style={buttonStyle}
        color="default"
        size="medium"
      >
        <i className="material-icons">show_chart</i>
      </Fab>
    </Tooltip>
  );

  return (
    <AppStateContext.Consumer>
      {( { isEditing, updateSubmitState } ) => (
        <div className={c.container}>
          <ReactCSSTransitionGroup
          transitionName="popup"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
            {isEditing &&
              <Tooltip title="Submit" key="submit">
                <Fab
                  aria-label="submit"
                  style={buttonStyle}
                  size="medium"
                  color="primary"
                  onClick={() => updateSubmitState(true)}
                >
                  <i className={cx(c.confirmBtn, "material-icons")}>check</i>
                </Fab>
              </Tooltip>
            }
            {location.pathname === '/' ? dashboard : backToHome}
            <Tooltip title="Logout" key="logout">
              <Fab aria-label="logout" style={buttonStyle} size="medium">
                <i className="material-icons">exit_to_app</i>
              </Fab>
            </Tooltip>
            </ReactCSSTransitionGroup>
        </div>
      )}
    </AppStateContext.Consumer>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    '& .popup-enter': {
      marginBottom: '-120px',
      transition: 'margin-bottom 300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    },
    '& .popup-enter.popup-enter-active': {
      marginBottom: '0',
    },
    '& .popup-leave': {
      marginBottom: '0',
      opactiy: '1',
      transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)'
    },
    '& .popup-leave.popup-leave-active': {
      marginBottom: '60px',
      opacity: '0.01'
    }
  },
  button: {
    marginLeft: '5px'
  },
  confirmBtn: {
    color: 'white'
  },

};

export default compose(
  injectSheet(styles),
  withRouter
)(HomeActions);