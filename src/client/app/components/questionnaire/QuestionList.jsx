// @flow
import React from 'react';
import injectSheet from 'react-jss'
import Question from './Question';

type Props = {
  classes: Object,
  questions: Array<string>
}

const QuestionList = ({ classes: c, questions }: Props) => (
  <div className={c.container}>
    {questions.map((q, i) => <Question question={q} key={i}/>)}
  </div>
);

const styles = {
  container: {
  }
};

export default injectSheet(styles)(QuestionList);