// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import withAddQuestion from 'app/composers/mutations/withAddQuestion';
import withUpdateQuestion from 'app/composers/mutations/withUpdateQuestion';
import AnswerScale from './AnswerScale';
import Modal from '../Modal';
import TextField from '../TextField';
import FlexButton from '../FlexButton';

type QuestionType = {
  title: string,
  id: string
}

type Props = {
  classes: Object,
  theme: Object,
  question?: QuestionType,
  addQuestion: Function,
  updateQuestion: Function,
  onSuccess: Function,
  onClose: Function 
}
type State = {
  questionDraft: string
}

class AddQuestion extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      questionDraft: props.question ? props.question.title : ''
    }
  }

  onSubmit = () => {
    const { question } = this.props;
    const { questionDraft } = this.state;
    
    if (!!questionDraft) {
      if (question) {
        this.handleAddQuestion(questionDraft);
      } else {
        this.handleUpdateQuestion(questionDraft);
      }
    }
  }

  handleAddQuestion = (newQuestion) => {
    this.props.updateQuestion(newQuestion, this.props.question.id)
      .then(() => this.props.onSuccess())
      .catch(e => console.log(e))
  }

  handleUpdateQuestion = (newQuestion) => {
    this.props.addQuestion(newQuestion)
      .then(() => this.props.onSuccess())
      .catch(e => console.log(e))
  }

  render() {
    const { classes: c, theme, onClose, question } = this.props;
    const placeholder = question ? question.title : "to make friends?";
    const headline = question ? "Edit question" : "Add a question";

    return (
      <Modal
        onClose={onClose}
        bgIcon="edit"
        iconBgColor={theme.colorPrimary}
      >
        <div className={c.container}>
          <div className={c.content}>
            <h3>{headline}</h3>
            <b>Did I do my best...</b>
            <TextField
              placeholder={placeholder}
              value={this.state.questionDraft}
              onChange={s => this.setState({ questionDraft: s })}
            />
          </div>
          <div className={c.actionGroup}>
            <FlexButton
              theme="PRIMARY"
              text="submit"
              onClick={this.onSubmit}  
              disabled={!this.state.questionDraft}  
            />
            <FlexButton theme="CANCEL" text="cancel" onClick={this.props.onClose} />
          </div>
        </div>
      </Modal>
    )
  }
}

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    zIndex: '5'
  },
  content: {
    width: '60%',
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
}
export default compose(
  withAddQuestion,
  withUpdateQuestion,
  injectSheet(styles),
  withTheme
)(AddQuestion);