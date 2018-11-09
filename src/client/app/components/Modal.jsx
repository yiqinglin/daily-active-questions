/***
 * A note about this Modal component.
 * I'm planning to use Mater ial-UI (https://github.com/mui-org/material-ui)
 * for many of the UI components, including this Modal. However, the latest
 * Material-UI requires react version to be 16.3 or higher while I'm still
 * (unfortunately) running on v15. 
 * The plan is to finish the majority of this app's functionality before
 * working on migrating the project to the lastest react version.
 * The integration of Masterial-UI and the deprecation of this Modal
 * component will happen thereafter.
 */
// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object,
  children: Node,
  onClose: () => void,
  bgIcon: String,
  iconBgColor: String,
  containerStyle: Object // Additional modal style provided by the user that will override the default style.
}

const Modal = ({ classes: c, containerStyle, onClose, children, bgIcon, iconBgColor }: Props) => (
  <div>
    <div className={c.backdrop} onClick={onClose} />
    <div className={c.container} style={containerStyle}>
      {children}
      <div className={c.decoIcon} style={{ backgroundColor: iconBgColor }}><i className="material-icons">{bgIcon}</i></div>
    </div>
  </div>
);

const styles = {
  backdrop: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  container: {
    position: 'absolute',
    margin: 'auto',
    left: '0',
    right: '0',
    top: '0',
    width: '500px',
    height: '300px',
    backgroundColor: 'white',
    overflow: 'hidden'
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