// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object
}

const Dashboard = ({ classes: c }: Props) => (
  <div className={c.container}>
    Visualization Town!
  </div>
);

const styles = {
  container: {
    backgroundColor: 'white',
    width: '700px',
    minHeight: '300px',
    padding: '18px',
    marginTop: '80px',
    borderRadius: '4px',
    position: 'relative'
  },
};

export default injectSheet(styles)(Dashboard);