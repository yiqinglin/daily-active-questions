// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import withAddQuestion from 'app/composers/mutations/withAddQuestion';
import AnswerScale from './AnswerScale';
import Modal from '../Modal';
import TextField from '../TextField';
import FlexButton from '../FlexButton';

type Props = {
  classes: Object,
  theme: Object,
  addQuestion: Function,
  onSuccess: Function,
  onClose: Function 
}
type State = {
  questionDraft: string
}

class AddQuestion extends React.Component<Props, State> {
  state = {
    questionDraft: ''
  }

  onSubmit = () => {
    const { questionDraft: question } = this.state;

    if (question) {
      this.props.addQuestion(question)
        .then(() => this.props.onSuccess())
        .catch(e => console.log(e))
    }
  }

  render() {
    const { classes: c, theme } = this.props;

    return (
      <Modal
        onClose={() => this.props.onClose()}
        bgIcon="edit"
        iconBgColor={theme.colorPrimary}
      >
        <div className={c.container}>
          <div className={c.content}>
            <h3>Add a question</h3>
            <b>Did I do my best...</b>
            <TextField
              placeholder="to make friends?"
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
            <FlexButton theme="CANCEL" text="cancel" onClick={this.props.onClose}/>
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
    top: '-40px',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    zIndex: '5'
  },
  content: {
    width: '60%'
  },
  actionGroup: {
    position: 'absolute',
    bottom: '-40px',
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
  injectSheet(styles),
  withTheme
)(AddQuestion);