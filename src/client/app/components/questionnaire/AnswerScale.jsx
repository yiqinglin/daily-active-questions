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
    <div className={c.bar}/>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
    position: 'relative'
  },
  bar: {
    position:'absolute',
    width: '100%',
    height: '10px',
    backgroundColor: 'rgba(216,216,216,.2)',
    pointerEvents: 'none'
  }
};

export default injectSheet(styles)(AnswerScale);