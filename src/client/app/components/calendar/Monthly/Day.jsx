// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object
}

const Day = ({ classes: c }: Props) => (
  <div className={c.container}>Day</div>
)

const styles = {
  container: {
    fontSize: '30px',
    color: 'green'
  }
};

export default injectSheet(styles)(Day);