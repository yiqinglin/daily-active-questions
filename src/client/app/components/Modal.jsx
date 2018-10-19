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
  containerStyle: Object // Additional modal style provided by the user that will override the default style.
}

const Modal = ({ classes: c, containerStyle, onClose, children }: Props) => (
  <div>
    <div className={c.backdrop} onClick={onClose} />
    <div className={c.container} style={containerStyle}>
      This is a modal
      {children}
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
    bottom: '0',
    width: '500px',
    height: '300px',
    padding: '20px',
    backgroundColor: 'white'
  }
};

export default injectSheet(styles)(Modal);