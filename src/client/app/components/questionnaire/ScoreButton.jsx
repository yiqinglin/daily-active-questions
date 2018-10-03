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
    cursor: 'pointer'
  },
  score: {
    fontSize: '11px'
  },
  selected: {
    color: 'pink'
  }
};

export default injectSheet(styles)(ScoreButton);