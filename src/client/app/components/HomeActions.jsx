// @flow
import React from 'react';
import injectSheet from 'react-jss'
import FloatButton from './FloatButton';

type Props = {
  classes: Object,
  placeholder: string,
  value: string,
  onChange: string => void
}

const HomeActions = ({ classes: c, placeholder, value, onChange }: Props) => (
  <div className={c.container}>
    <FloatButton
      onClick={() => window.location="/logout"}
      text="exit_to_app"
      isIcon
    />
  </div>
);

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  }
};

export default injectSheet(styles)(HomeActions);