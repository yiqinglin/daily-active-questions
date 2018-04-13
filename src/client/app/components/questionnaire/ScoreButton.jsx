import React, { PropTypes } from 'react';
import injectSheet from 'react-jss'

const propTypes = {
  classes: PropTypes.object,
  score: PropTypes.string
};

const ScoreButton = ({ classes: c, score }: PropTypes) => (
  <div className={c.container}>
    <span className={c.score}>{score}</span>
  </div>
);

const styles = {
  container: {
    width: '30px',
    height: '30px',
    borderRadius: '30px',
    border: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  score: {
    fontSize: '11px'
  }
};

export default injectSheet(styles)(ScoreButton);