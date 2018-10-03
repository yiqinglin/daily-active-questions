// @flow
import React from 'react';
import injectSheet from 'react-jss'
import ScoreButton from './ScoreButton';

type Props = {
  classes: Object,
  score: number,
  selected: number,
  onSelect: () => void
}

const AnswerScale = ({ classes: c, score, onSelect, selected }: Props) => (
  <div className={c.container}>
    {[...Array(11).keys()].map(i => 
      <ScoreButton
        isSelected={selected === i}
        score={i}
        key={i}
        onClick={onSelect}
      />)
    }
  </div>
);

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
};

export default injectSheet(styles)(AnswerScale);