// @flow
import React from 'react';
import injectSheet from 'react-jss'
import ScoreButton from './ScoreButton';

type Props = {
  classes: Object,
  score: number
}

const Question = ({ classes: c, score }: Props) => (
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