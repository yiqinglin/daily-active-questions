// @flow
import React from 'react';
import injectSheet from 'react-jss'
import AnswerScale from './AnswerScale';

type Props = {
  classes: Object,
  question: String,
  children: Node
}

const Question = ({ classes: c, question, children }: Props) => (
  <div className={c.container}>
    <h4>{question}</h4>
    {children}
  </div>
);

const styles = {
  container: {
    marginBottom: '36px'
  }
};

export default injectSheet(styles)(Question);