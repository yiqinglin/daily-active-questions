// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import Color from 'tinycolor2';

type Props = {
  classes: Object,
  text: String,
  theme: 'PRIMARY' | 'REJECT' | 'DEFAULT',
  styles: Object,
  disabled: boolean,
  onClick: Function | String
}

const TextField = ({ classes: c, text, styles, onClick, disabled }: Props) => (
  <div
    onClick={onClick}
    className={classNames(c.button, disabled && c.disabled)}
    style={styles}
  >
    {text}
  </div>
);

const styles = (theme) => ({
  button: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: '300',
    float: 'left',
    clear: 'both',
    marginTop: '5px',
    marginBottom: '5px',
    fontSize: '14px',
    transition: 'background-color .12s ease-in-out',
    position: 'relative',
    flexGrow: '1',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: (props) => {
      switch (props.theme) {
        case 'PRIMARY':
          return theme.colorAllow;
        case 'REJECT':
          return theme.colorReject;
        case 'CANCEL':
          return theme.colorNeutral;
        case 'DEFAULT':
          return theme.colorPrimary;
        default:
          break;
      }
    },
    '&:hover': {
      backgroundColor: (props) => {
        if (props.disabled) {
          return;
        }
        switch (props.theme) {
          case 'PRIMARY':
            return Color(theme.colorAllow).darken(20).toString();
          case 'REJECT':
            return Color(theme.colorReject).darken(20).toString();
          case 'CANCEL':
            return Color(theme.colorNeutral).darken(20).toString();
          case 'DEFAULT':
            return Color(theme.colorPrimary).darken(20).toString();
          default:
            break;
        }
      },
    }
  },
  disabled: {
    cursor: 'not-allowed'
  }
});

export default injectSheet(styles)(TextField);