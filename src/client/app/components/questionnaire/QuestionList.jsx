// @flow
import React from 'react';
import injectSheet, { withTheme } from 'react-jss';
import { compose } from 'react-apollo';
import withActiveQuestions from 'app/composers/queries/withActiveQuestions';
import withSubmitAnswers from 'app/composers/mutations/withSubmitAnswers';
import withDeleteQuestion from 'app/composers/mutations/withDeleteQuestion';
import withUpdateQuestion from 'app/composers/mutations/withUpdateQuestion';
import { AppStateContext } from 'app/components/AppStateContext';
import { getCurrentTime } from 'app/lib/helpers';
import Question from './Question';
import AnswerScale from './AnswerScale';
import AddQuestion from './AddQuestion';
import Modal from '../Modal';
import FlexButton from '../FlexButton';
import LoadingView from '../LoadingView';

type Props = {
  classes: Object,
  theme: Object,
  activeQuestions: Array<Object>,
  answer: Function,
  deleteQuestion: Function,
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
  questionInEdit: QuestionType,
  deleteConfirm: QuestionType,
  loading: boolean
}

class QuestionList extends React.Component<Props, State> {
  static contextType = AppStateContext;
  state = {
    updatedAnswers: {},
    deleteConfirm: {
      title: '',
      id: ''
    },
    questionInEdit: {
      title: '',
      id: ''
    },
    loading: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.onSubmit && this.props.onSubmit) {
      this.handleSubmit();
    }
  }

  updateAnswer = (questionId, value) => {
    if (!this.context.onEdit) return;

    const { updatedAnswers } = this.state;
    
    updatedAnswers[questionId] = value;

    this.setState({updatedAnswers});
  }

  handleSubmit = () => {
    const { updatedAnswers } = this.state;

    // Get client's time in string.      
    const timestamp = getCurrentTime();

    this.props.answer(updatedAnswers, timestamp)
      .then(() => this.props.onFinishSubmit())
      .catch(() => console.log('problem!'));
  }

  handleDelete = () => {
    this.setState({ loading: true });
    this.props.deleteQuestion(this.state.deleteConfirm.id)
      .then(() => confirm('The question has been deleted'))
      .then(() => this.setState({ deleteConfirm: { id: '', title: ''}, loading: false}))
      .catch(() => alert('problem!'));
  }

  handleCancel = () => {
    this.setState({updatedAnswers: {}});
    this.context.toggleEdit();
  }

  render() {
    const { classes: c, activeQuestions, isFetching, writeMode, theme } = this.props;
    const { questionInEdit, deleteConfirm } = this.state;

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

    const DeleteModal = this.state.deleteConfirm.title && (
      <Modal
        onClose={() => this.setState({ deleteConfirm: { title: '', id: '' }})}
        bgIcon="delete_outline"
        iconBgColor={theme.colorPrimary}
      >
        <div className={c.modalContainer}>
          <div className={c.content}>
            <h3>Please confirm you'd like to DELETE this question</h3>
            <b>{this.state.deleteConfirm.title}</b>
          </div>
          <div className={c.actionGroup}>
            <FlexButton
              theme="REJECT"
              text="confirm"
              onClick={this.handleDelete}
            />
            <FlexButton
              theme="CANCEL"
              text="cancel"
              onClick={() => this.setState({ deleteConfirm: { title: '', id: '' }})}  
            />
          </div>
        </div>
      </Modal>
    );

    return (
      <div className={c.container}>
        {activeQuestions.map((q, i) => {
          return (
            <Question
              question={q.title}
              key={i}
              deleteQuestion={() => this.setState({ deleteConfirm: { title: q.title, id: q.id }})}
              editQuestion={() => this.setState({ questionInEdit: { title: q.title, id: q.id }})}
            >
              <AnswerScale 
                selected={this.context.onEdit ? this.state.updatedAnswers[q.id] : q.answer}
                onSelect={v => this.updateAnswer(q.id, v)}
              />
            </Question>
          );
        })}
        {questionInEdit.id &&
          <AddQuestion
            question={questionInEdit}
            onClose={() => this.setState({ questionInEdit: { id: '', title: '' }})}
            onSuccess={() => this.setState({ questionInEdit: { id: '', title: '' }})}
          />
        }
        {DeleteModal}
        {this.state.loading && <LoadingView />}
      </div>
    );
  }
}

const styles = {
  modalContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: '5',
    padding: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    marginTop: '-40px'
  },
  actionGroup: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '50px',
    display: 'flex',
    left: '0',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
};

export default compose(
  injectSheet(styles),
  withTheme,
  withActiveQuestions,
  withSubmitAnswers,
  withDeleteQuestion
)(QuestionList);