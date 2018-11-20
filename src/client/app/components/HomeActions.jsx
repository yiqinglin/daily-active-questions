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
  onChange: string => void
}

const buttonStyle = {
  marginLeft: '5px'
}
const HomeActions = ({ classes: c, placeholder, value, onChange, history }: Props) => (
  <div className={c.container}>
    <FloatButton
      onClick={() => window.location="/logout"}
      text="exit_to_app"
      isIcon
      styles={buttonStyle}
    />
    <FloatButton
      onClick={() => history.push('/dashboard')}
      text="show_chart"
      isIcon
      styles={buttonStyle}
    />
  </div>
);

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