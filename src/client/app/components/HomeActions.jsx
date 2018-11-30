// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import FloatButton from './FloatButton';

type Props = {
  classes: Object,
  placeholder: string,
  value: string,
  history: Object,
  location: Object,
  onChange: string => void
}

const buttonStyle = {
  marginLeft: '5px'
}
const HomeActions = ({ classes: c, placeholder, value, onChange, history, location }: Props) => {
  const backToHome = (
    <FloatButton
      onClick={() => window.location="/"}
      text="home"
      isIcon
      styles={buttonStyle}
    />
  );
  const dashboard = (
    <FloatButton
      onClick={() => history.push('/dashboard')}
      text="show_chart"
      isIcon
      styles={buttonStyle}
    />
  );

  return (
    <div className={c.container}>
      <FloatButton
        onClick={() => window.location="/logout"}
        text="exit_to_app"
        isIcon
        styles={buttonStyle}
      />
      {location.pathname === '/' ? dashboard : backToHome}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    flexFlow: 'row-reverse'
  }
};

export default compose(
  injectSheet(styles),
  withRouter
)(HomeActions);