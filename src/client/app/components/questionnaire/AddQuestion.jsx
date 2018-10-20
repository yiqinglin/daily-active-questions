// @flow
import React from 'react';
import injectSheet from 'react-jss'
import { compose } from 'react-apollo';
import AnswerScale from './AnswerScale';
import Modal from '../Modal';
import TextField from '../TextField';
import withAddQuestion from 'app/composers/mutations/withAddQuestion';

type Props = {
  classes: Object,
  addQuestion: Function
}
type State = {
  isAdding: boolean,
  questionDraft: string
}

class AddQuestion extends React.Component<Props, State> {
  state = {
    isAdding: false,
    questionDraft: ''
  }

  onSubmit = () => {
    const { questionDraft: question } = this.state;

    if (question) {
      this.props.addQuestion(question)
        .then(() => this.setState({ isAdding: false }))
        .catch(e => console.log(e))
    }
  }

  render() {
    const { classes: c } = this.props;
    const EditView = this.state.isAdding && (
      <Modal onClose={() => this.setState({ isAdding: false, questionDraft: '' })}>
        <h3>Let's add a question!</h3>
        <b>Did I do my best...</b>
        <TextField
          placeholder="to make friends?"
          value={this.state.questionDraft}
          onChange={s => this.setState({ questionDraft: s })}
        />
        <button onClick={this.onSubmit} disabled={!this.state.questionDraft}>Submit</button>
      </Modal>
    );
    const BtnView = !this.state.isAdding && (
      <button onClick={() => this.setState({ isAdding: true })}>Add Question</button>
    );

    return (
      <div className={c.container}>
      {EditView}
      {BtnView}
    </div>
    )
  }
}

const styles = {
  container: {
    marginBottom: '36px'
  }
};

export default compose(
  withAddQuestion,
  injectSheet(styles)
)(AddQuestion);