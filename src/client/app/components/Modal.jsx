// @flow
import * as React from 'react';
import injectSheet from 'react-jss'
import FlexButton from './FlexButton';
import Paper from '@material-ui/core/Paper';

type Props = {
  classes: Object,
  children: React.Node,
  onClose: () => void,
  bgIcon: String,
  iconBgColor: String,
  containerStyle: Object // Additional modal style provided by the user that will override the default style.
}

const containerDefaultStyle = {
  zIndex: '10',
  position: 'fixed',
  margin: 'auto',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  width: '500px',
  height: '300px',
  backgroundColor: 'white',
  overflow: 'hidden'
}
const Modal = ({ classes: c, containerStyle, onClose, children, bgIcon, iconBgColor }: Props) => (
  <div>
    <div className={c.backdrop} onClick={onClose} />
    <Paper style={{...containerDefaultStyle, ...containerStyle}}>
      {children}
      <div className={c.decoIcon} style={{ backgroundColor: iconBgColor }}>
        <i className="material-icons">{bgIcon}</i>
      </div>
    </Paper>
  </div>
);

const styles = {
  backdrop: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: '5'
  },
  decoIcon: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    borderRadius: '250px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: '-50px',
    bottom: '0',
    zIndex: '1',
    cursor: 'default',
    '& > .material-icons': {
      fontSize: '180px'
    }
  }
};

export default injectSheet(styles)(Modal);