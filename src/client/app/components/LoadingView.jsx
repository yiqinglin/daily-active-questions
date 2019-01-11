// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import Loader from 'react-loader-spinner';

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
    const { classes: c, message, quoteCredit, theme } = this.props;

    return (
      <div className={c.container} key="1">
        <div className={c.loader}>
          <Loader
            type="Rings"
            color={theme.colorPrimary}
            height={120}
            width={120}
          />
        </div>
        <div>
          <p>If you don't know where you are going, any road will take you there.</p>
          <p className={c.credit}>- Lewis Carroll</p>
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
  },
  loader: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '120px',
    height: '120px'
  }
};

  
  export default compose(
    withTheme,
    injectSheet(styles)
  )(LoadingView);