import React, { PropTypes } from 'react';
import injectSheet from 'react-jss'
import ScoreButton from './ScoreButton';

const propTypes = {
  classes: PropTypes.object,
  score: PropTypes.integer
};

const Question = ({ classes: c, score }: PropTypes) => (
  <div className={c.container}>
    {[...Array(11).keys()].map(i => <ScoreButton score={i} key={i}/>)}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
};

export default injectSheet(styles)(Question);