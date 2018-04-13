// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object
}

const Avatar = ({classes: c}: Props) => (
  <div className={c.avatar}>
    
  </div>
);

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '100px',
    backgroundColor: '#cacaca',
    backgroundImage: 'url("https://api.adorable.io/avatars/addddd.png")',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    marginLeft: '18px',
    marginRight: '18px'

  }
};

export default injectSheet(styles)(Avatar);