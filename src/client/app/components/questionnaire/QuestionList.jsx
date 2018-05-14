// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'react-apollo';
import withActiveQuestions from 'app/composers/queries/withActiveQuestions';
import Question from './Question';

type Props = {
  classes: Object,
  questions: Array<string>,
  activeQuestions: Array<Object>,
  isFetching: Boolean
}

const QuestionList = ({ classes: c, questions, activeQuestions, isFetching }: Props) => {
  if (isFetching) {
    return null;
  }
  return (
    <div className={c.container}>
      {questions.map((q, i) => <Question question={q} key={i}/>)}
    </div>
  );
}

const styles = {
  container: {
  }
};

export default compose(
  injectSheet(styles),
  withActiveQuestions
)(QuestionList);