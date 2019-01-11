// @flow
import React from 'react';
import injectSheet from 'react-jss'
import cx from 'classnames';
import color from 'tinycolor2';
import ScoreButton from './ScoreButton';
import { AppStateContext } from '../AppStateContext';

type Props = {
  classes: Object,
  score: number,
  selected: number,
  onSelect: () => void
}

const AnswerScale = ({ classes: c, score, onSelect, selected }: Props) => {
  return (
    <AppStateContext.Consumer>
      {({ isEditing }) => (
        <div className={c.container}>
          {[...Array(11).keys()].map(i => 
            <ScoreButton
              isSelected={selected === i}
              score={i}
              key={i}
              onClick={onSelect}
            />)
          }
          <div className={cx(c.bar, isEditing && c.highlighted)}/>
        </div>
      )}   
    </AppStateContext.Consumer>
  );
}

const styles = theme => ({
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
    background: 'linear-gradient(45deg, rgba(216,216,216,0) 0%,rgba(216,216,216,.2) 8%,rgba(216,216,216,.2) 50%,rgba(216,216,216,.2) 92%,rgba(216,216,216,0) 100%)',
    pointerEvents: 'none'
  }
});

export default injectSheet(styles)(AnswerScale);