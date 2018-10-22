// @flow
import React from 'react';
import injectSheet from 'react-jss'
import { compose } from 'react-apollo';
import Modal from '../Modal';
import TextField from '../TextField';

type Props = {
  classes: Object,
  onClose: Function,
  updateQuestion: Function,
  question: string,
  qid: string
}
type State = {
  questionDraft: string
}

class EditQuestion extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      questionDraft: props.question
    }
  }

  onSubmit = () => {
    const { questionDraft: question } = this.state;

    if (question) {
      this.props.updateQuestion(question);
    }
  }

  render() {
    const { classes: c, question, onClose } = this.props;

    return (
      <div className={c.container}>  
        <Modal onClose={onClose}>
          <b>Did I do my best...</b>
          <TextField
            placeholder={question}
            value={this.state.questionDraft}
            onChange={s => this.setState({ questionDraft: s })}
          />
          <button onClick={this.onSubmit} disabled={!this.state.questionDraft}>Submit</button>
        </Modal>
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
  injectSheet(styles)
)(EditQuestion);