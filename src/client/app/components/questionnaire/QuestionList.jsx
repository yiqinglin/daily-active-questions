// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'react-apollo';
import withActiveQuestions from 'app/composers/queries/withActiveQuestions';
import withSubmitAnswers from 'app/composers/mutations/withSubmitAnswers';
import withDeleteQuestion from 'app/composers/mutations/withDeleteQuestion';
import Question from './Question';
import AnswerScale from './AnswerScale';
import AddQuestion from './AddQuestion';

type Props = {
  classes: Object,
  activeQuestions: Array<Object>,
  answer: Function,
  deleteQuestion: Function,
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

  handleDelete = (question) => {
    const confirmed = confirm(`Please confirm you\'d like to stop tracking this question:\n${question.title}`);
    if (confirmed) {
      this.props.deleteQuestion(question.id)
      .then(() => confirm('The question has been deleted'))
      .catch(() => alert('problem!'));
    }
    
  }

  render() {
    const { classes: c, activeQuestions, isFetching } = this.props;
    const { isEditing } = this.state;

    if (isFetching) {
      return <div className={c.container}>Retrieving question list...</div>;
    }
    if (!activeQuestions) return (
      <div className={c.container}>
        <i className="material-icons">sentiment_very_dissatisfied</i>
        A problem occured while retriving your question list...
      </div>
    )
    if (activeQuestions.length == 0) {
      return (
        <div className={c.container}>Add a new question...</div>
      )
    }
    return (
      <div className={c.container}>
        {activeQuestions.map((q, i) => {
          return (
            <Question question={q.title} key={i} deleteQuestion={() => this.handleDelete(q)}>
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
  withSubmitAnswers,
  withDeleteQuestion
)(QuestionList);