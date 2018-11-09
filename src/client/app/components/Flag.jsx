
// @flow
import React from 'react';
import injectSheet from 'react-jss'
import Color from 'tinycolor2';

type Props = {
  classes: Object,
  icon: String,
  custom: boolean,
  hex: String,
  styles: Object,
  onClick: Function
}

const Flag = ({ classes: c, custom, icon, styles, onClick }: Props) => (
  <div className={c.container} style={styles} onClick={onClick}>
    {custom ? <img src={icon} className={c.icon} /> :
      <i className="material-icons">{icon}</i>}
  </div>
);

const styles = {
  container: {
    width: '50px',
    height: '50px',
    borderRadius: '0 4px 4px 0',
    backgroundColor: props => props.hex,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: props => Color(props.hex).darken(20).toString()
    }
  },
  icon: {
    width: '25px',
    height: '25px'
  }
}

export default injectSheet(styles)(Flag);


