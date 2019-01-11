// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classeNames from 'classnames';
import color from 'tinycolor2';
import { AppStateContext } from '../AppStateContext';

type Props = {
  classes: Object,
  score: Number,
  onClick: Number => void,
  isSelected: Boolean
}

const ScoreButton = ({ classes: c, score, onClick, isSelected }: Props) => {
  return (
    <AppStateContext.Consumer>
      {({isEditing}) => (
        <div
          className={classeNames(c.container, isSelected && c.selected, isEditing && c.highlighted)}
          onClick={() => onClick(score)}
        />
      )}
    </AppStateContext.Consumer>
  );
}

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
    position: 'relative',
    '&::after': {
      content: (props) => {
        if (props.score === 0) return '"not at all"';
        if (props.score === 10) return '"Totally"';
        return `'${props.score.toString()}'`;
      },
      position: 'absolute',
      right: '0',
      left: '-20px',
      top: '-25px',
      textAlign: 'center',
      fontSize: '12px',
      color: '#A7A7A7',
      fontWeight: '100',
      textTransform: 'capitalize',
      width: '56px'
    }
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
  },
  highlighted: {
    animationName: 'highlight',
    animationDuration: '.5s',
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
    }
  },
  '@keyframes highlight': {
    '0%': {borderColor: '#A7A7A7'},
    '70%': {borderColor: color(theme.colorPrimary).darken(10).setAlpha(.8).toRgbString()},
    '100%': {borderColor: '#A7A7A7'}
  },
  '@keyframes text-highlight': {
    '0%': {color: '#A7A7A7'},
    '70%': {color: color(theme.colorPrimary).setAlpha(.6).toRgbString()},
    '100%': {color: '#A7A7A7'}
  }
});

export default injectSheet(styles)(ScoreButton);