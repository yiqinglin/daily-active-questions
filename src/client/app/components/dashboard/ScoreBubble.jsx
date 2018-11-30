// @flow
import React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
  score: String,
  onClick: Function
}

const ScoreBubble = ({ classes: c, score, onClick }: Props) => (
  <div
    className={c.container}
    onClick={onClick}
  >{score}</div>
);

const scoreToColor = (score) => {
  const value = parseFloat(score);

  switch (Math.floor(value/2)) {
    case 1:
      return 'red';
    case 2:
      return 'orange';
    case 3:
      return 'yellow';
    case 4:
     return 'lime';
    case 5:
      return 'green';
  }
}

const styles = theme => ({
  container: {
    width: '30px',
    height: '30px',
    borderRadius: '30px',
    backgroundColor: props => scoreToColor(props.score),
    color: 'white',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: '500'
  }
});

export default injectSheet(styles)(ScoreBubble);