import React, { PropTypes } from 'react';
import injectSheet from 'react-jss'
import AnswerScale from './AnswerScale';

const propTypes = {
  classes: PropTypes.object,
  question: PropTypes.string
};

const Question = ({ classes: c, question }: PropTypes) => (
  <div className={c.container}>
    <h4>{question}</h4>
    <AnswerScale />
  </div>
);

const styles = {
  container: {
    marginBottom: '36px'
  }
};

export default injectSheet(styles)(Question);