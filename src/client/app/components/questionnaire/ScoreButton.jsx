// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object,
  score: Number
}

const ScoreButton = ({ classes: c, score }: Props) => (
  <div className={c.container}>
    <span className={c.score}>{score.toString()}</span>
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