// @flow
import React from 'react';
import injectSheet from 'react-jss'
import AnswerScale from './AnswerScale';
import Modal from '../Modal';
import TextField from '../TextField';
import { renderToStringWithData } from 'react-apollo';

type Props = {
  classes: Object,
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
    alert(`submitting question: ${this.state.questionDraft}`);
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
        <button onClick={this.onSubmit}>Submit</button>
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

export default injectSheet(styles)(AddQuestion);