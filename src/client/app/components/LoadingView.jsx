// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  message?: string
}

class LoadingView extends React.Component<Props> {
  componentDidMount() {
    // Disable scroll on body when loading screen is present.
    if (document.body) {
      document.body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    // Reset before unmounting.
    if (document.body) {
      document.body.style.overflowY = "scroll";
    }
  }

  render() {
    const { classes: c, message } = this.props;

    return (
      <div className={c.container}>{message ? message : 'Loading...'}</div>
    );
  }
}

const styles = {
  container: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '50px',
    textTransform: 'uppercase',
    fontWeight: '500'
  }
};

export default injectSheet(styles)(LoadingView);