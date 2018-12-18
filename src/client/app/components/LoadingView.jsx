// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  message?: string,
  quoteCredit?: string
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
    const { classes: c, message, quoteCredit } = this.props;

    return (
      <div className={c.container}>
        <div>
          <p>{message ? message : 'Loading...'}</p>
          {quoteCredit && 
            <p className={c.credit}>- {quoteCredit}</p>
          }
        </div>
      </div>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: '300',
    zIndex: '10',
    padding: '50px'
  },
  credit: {
    fontSize: '15px',
    fontStyle: 'italic',
    textAlign: 'right'
  }
};

export default injectSheet(styles)(LoadingView);