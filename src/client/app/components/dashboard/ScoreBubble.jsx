// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import { scoreToColor } from 'app/lib/helpers';

type Props = {
  classes: Object,
  score: String
}

const ScoreBubble = ({ classes: c, score }: Props) => (
  <div
    className={c.container}
  >{score}</div>
);


const styles = theme => ({
  container: {
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    backgroundColor: props => theme[scoreToColor(props.score)],
    color: 'white',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '700'
  }
});

export default compose(
  withTheme,
  injectSheet(styles)
)(ScoreBubble);