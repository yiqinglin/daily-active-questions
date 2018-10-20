// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classeNames from 'classnames';

type Props = {
  classes: Object,
  score: Number,
  onClick: Number => void,
  isSelected: Boolean
}

const ScoreButton = ({ classes: c, score, onClick, isSelected }: Props) => (
  <div
    className={classeNames(c.container, isSelected && c.selected)}
    onClick={() => onClick(score)}
  >
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
    cursor: 'pointer',
    transition: 'background-color, .12s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 192, 203, .3)',
      border: 'rgba(255, 192, 203, .3)',
      color: 'white'
    }
  },
  score: {
    fontSize: '11px'
  },
  selected: {
    backgroundColor: 'rgba(255, 192, 203, 1)',
    border: 'rgba(255, 192, 203, 1)',
    color: 'white'
  }
};

export default injectSheet(styles)(ScoreButton);