import React, { PropTypes } from 'react';
import injectSheet from 'react-jss'
import Question from './Question';

const propTypes = {
  classes: PropTypes.object,
  questions: PropTypes.array
};

const QuestionList = ({ classes: c, questions }: PropTypes) => (
  <div className={c.container}>
    {questions.map((q, i) => <Question question={q} key={i}/>)}
  </div>
);

const styles = {
  container: {
  }
};

export default injectSheet(styles)(QuestionList);