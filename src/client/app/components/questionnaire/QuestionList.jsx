// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'react-apollo';
import withActiveQuestions from 'app/composers/queries/withActiveQuestions';
import withSubmitAnswers from 'app/composers/mutations/withSubmitAnswers';
import Question from './Question';
import AnswerScale from './AnswerScale';
import AddQuestion from './AddQuestion';

type Props = {
  classes: Object,
  activeQuestions: Array<Object>,
  answer: Function,
  isFetching: boolean
}

type State = {
  updatedAnswers: { [string]: number },
  isEditing: boolean
}

class QuestionList extends React.Component<Props, State> {
  state = {
    updatedAnswers: {},
    isEditing: false
  }

  updateAnswer = (questionId, value) => {
    if (!this.state.isEditing) return;

    const { updatedAnswers } = this.state;
    updatedAnswers[questionId] = value;

    this.setState({updatedAnswers});
  }

  onSubmit = () => {
    const { updatedAnswers } = this.state;

    this.props.answer(updatedAnswers)
      .then(() => this.setState({ isEditing: false }))
      .catch(() => console.log('problem!'));
  }

  render() {
    const { classes: c, activeQuestions, isFetching } = this.props;
    const { isEditing } = this.state;

    if (isFetching) {
      return <div className={c.container}>Retrieving question list...</div>;
    }
    if (activeQuestions.length == 0) {
      return (
        <div className={c.container}>Add a new question...</div>
      )
    }
    return (
      <div className={c.container}>
        {activeQuestions.map((q, i) => {
          return (
            <Question question={q.title} key={i}>
              <AnswerScale 
                selected={isEditing ? this.state.updatedAnswers[q.id] : q.answer}
                onSelect={v => this.updateAnswer(q.id, v)}
              />
            </Question>
          );
        })}
        <AddQuestion />
        <div>
          <button onClick={() => this.setState({
            isEditing: !isEditing,
            updatedAnswers: {}
          })}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={this.onSubmit}
            disabled={!isEditing}
          >Submit</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
  }
};

export default compose(
  injectSheet(styles),
  withActiveQuestions,
  withSubmitAnswers
)(QuestionList);