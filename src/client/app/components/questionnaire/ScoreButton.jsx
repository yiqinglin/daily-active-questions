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
  />
);

const styles = theme => ({
  container: {
    width: '20px',
    height: '20px',
    borderRadius: '20px',
    border: '2px solid #A7A7A7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color, .12s ease-in-out',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: theme.colorPrimary,
      color: 'white',
      '&::before': {
        content: '""',
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        left: '2px',
        top: '2px',
        position: 'absolute',
        backgroundColor: theme.colorPrimary
      }
    },
    position: 'relative',
    '&::after': {
      content: (props) => {
        if (props.score === 0) return '"not at all"';
        if (props.score === 10) return '"Totally"';
        return `'${props.score.toString()}'`;
      },
      position: 'absolute',
      right: '0',
      left: '-17px',
      top: '-20px',
      textAlign: 'center',
      fontSize: '10px',
      color: '#A7A7A7',
      fontWeight: '100',
      textTransform: 'capitalize',
      width: '50px'
    }
  },
  score: {
  },
  selected: {
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: theme.colorPrimary,
    '&::before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '12px',
      left: '2px',
      top: '2px',
      position: 'absolute',
      backgroundColor: theme.colorPrimary
    }
  }
});

export default injectSheet(styles)(ScoreButton);