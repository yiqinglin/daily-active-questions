// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Color from 'tinycolor2';

type Props = {
  classes: Object,
  text: String,
  theme: 'PRIMARY' | 'SECONDARY' | 'DEFAULT',
  styles: Object,
  isIcon: boolean,
  imgSrc: String,
  onClick: Function | String
}

const FloatButton = ({ classes: c, text, styles, isIcon, onClick }: Props) => (
  <div
    onClick={onClick}
    className={c.button}
    style={styles}
  >
    {isIcon ? <i className="material-icons">{text}</i> : <i>{text}</i>}
  </div>
);

const styles = (theme) => ({
  button: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: theme.colorNeutral,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      backgroundColor: Color(theme.colorNeutral).darken(20).toString()
    }
  }
});

export default injectSheet(styles)(FloatButton);