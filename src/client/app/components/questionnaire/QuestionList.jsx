// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'react-apollo';
import withActiveQuestions from 'app/composers/queries/withActiveQuestions';
import withSubmitAnswers from 'app/composers/mutations/withSubmitAnswers';
import withDeleteQuestion from 'app/composers/mutations/withDeleteQuestion';
import withUpdateQuestion from 'app/composers/mutations/withUpdateQuestion';
import Question from './Question';
import AnswerScale from './AnswerScale';
import EditQuestion from './EditQuestion';

type Props = {
  classes: Object,
  activeQuestions: Array<Object>,
  answer: Function,
  deleteQuestion: Function,
  updateQuestion: Function,
  onSwitchMode: Function,
  onFinishSubmit: Function,
  isFetching: boolean,
  writeMode: boolean,
  onSubmit: boolean
}

type QuestionType = {
  title: string,
  id: string
}

type State = {
  updatedAnswers: { [string]: number },
  questionInEdit: QuestionType
}

class QuestionList extends React.Component<Props, State> {
  state = {
    updatedAnswers: {},
    questionInEdit: {
      title: '',
      id: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.onSubmit && this.props.onSubmit) {
      this.handleSubmit();
    }
  }

  updateAnswer = (questionId, value) => {
    if (!this.props.writeMode) return;

    const { updatedAnswers } = this.state;
    updatedAnswers[questionId] = value;

    this.setState({updatedAnswers});
  }

  handleSubmit = () => {
    const { updatedAnswers } = this.state;

    this.props.answer(updatedAnswers)
      .then(() => this.props.onFinishSubmit())
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

  handleUpdate = (newQuestion) => {
    const { questionInEdit: { id: qid }} = this.state;
    const confirmed = confirm(`Please confirm you\'d like to update the question to be:\n${newQuestion}`);

    if (confirmed) {
      this.props.updateQuestion(newQuestion, qid)
      .then(() => confirm('The question has been updated'))
      .then(() => this.setState({ questionInEdit: { id: '', title: ''}}))
      .catch(() => alert('problem!'));
    }
  }

  handleCancel = () => {
    this.setState({updatedAnswers: {}});
    this.props.onSwitchMode();
  }

  render() {
    const { classes: c, activeQuestions, isFetching, writeMode } = this.props;
    const { questionInEdit } = this.state;

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
            <Question
              question={q.title}
              key={i}
              deleteQuestion={() => this.handleDelete(q)}
              editQuestion={() => this.setState({ questionInEdit: { title: q.title, id: q.id } })}
            >
              <AnswerScale 
                selected={writeMode ? this.state.updatedAnswers[q.id] : q.answer}
                onSelect={v => this.updateAnswer(q.id, v)}
              />
            </Question>
          );
        })}
        {/* <div>
          <button onClick={this.handleCancel}>
            {writeMode ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={this.onSubmit}
            disabled={!writeMode}
          >Submit</button>
        </div> */}
        {questionInEdit.id && 
          <EditQuestion
            question={questionInEdit.title}
            qid={questionInEdit.id}
            updateQuestion={newQuestion => this.handleUpdate(newQuestion)}
            onClose={() => this.setState({ questionInEdit: { id: '', title: '' }})}
          />
        }
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
  withUpdateQuestion,
  withDeleteQuestion
)(QuestionList);