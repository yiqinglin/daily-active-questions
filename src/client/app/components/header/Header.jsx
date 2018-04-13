import React, { PropTypes } from 'react';
import injectSheet from 'react-jss'
import Avatar from './Avatar';

const propTypes = {
  classes: PropTypes.object
};

const Header = ({ classes: c }: PropTypes) => (
  <div className={c.header}>
    <Avatar />
    Profile
  </div>
);

const styles = {
  header: {
    // background: '-moz-linear-gradient(30deg, #ffaf4b 0%, #f9ce3e 78%, #ff920a 100%)', /* FF3.6-15 */
    // background: '-webkit-linear-gradient(30deg, #ffaf4b 0%,#f9ce3e 78%,#ff920a 100%)', /* Chrome10-25,Safari5.1-6 */
    // background: 'linear-gradient(30deg, #ffaf4b 0%,#f9ce3e 78%,#ff920a 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    // boxShadow: '-8px 17px 13px 0px rgba(187,187,187,0.54)',
    background: '#f9ce3e',
    height: '200px',
    width: '700px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '80px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    padding: ' 18px'
  }
};

export default injectSheet(styles)(Header);