// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import QuestionList from 'app/components/questionnaire/QuestionList';
import AddQuestion from 'app/components/questionnaire/AddQuestion';
import Button from 'app/components/Button';
import Flag from './Flag';
import LoadingView from './LoadingView';
import Paper from '@material-ui/core/Paper';
import { AppStateContext } from './AppStateContext';

type Props = {
  classes: Object,
  theme: Object
}
type State = {
  modalOpen: boolean,
  writeMode: boolean,
  isSubmitting: boolean
}

class Home extends React.Component<Props, State> {
  static contextType = AppStateContext;
  state = {
    modalOpen: false,
    writeMode: false,
    isSubmitting: false
  }
  
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  onClickSubmit = () => {
    if (!this.state.isSubmitting) {
      this.setState({isSubmitting: true})
    }
  }

  onFinishSubmit = () => {
    this.setState({ isSubmitting: false, writeMode: false })
  }

  render() {
    const { classes: c, theme } = this.props;
    const PageFlags = (
      <div className={c.flags}>
        <Flag
          icon="/img/answer.svg"
          custom
          hex={theme.colorPrimary}
          onClick={this.context.toggleEdit}
          extendable
          onConfirm={this.onClickSubmit}
          onCancel={this.context.toggleEdit}
          title="Edit"
          placement="right"
        />
        <Flag
          icon="add_circle"
          hex={theme.colorSecondary}
          styles={{ marginTop: '20px' }}
          onClick={() => this.setState({ modalOpen: true })}  
          title="Add Question"
          placement="right"
        />
      </div>
    );
    const addQuestionModal = this.state.modalOpen &&
      <AddQuestion
        onSuccess={() => this.closeModal()}
        onClose={() => this.closeModal()}
      />;
    const paperStyle = {
      width: '800px',
      minHeight: '300px',
      padding: '18px 28px',
      marginTop: '80px',
      position: 'relative'
    };

    return (
      <Paper style={paperStyle}>
        <h3 className={c.headline}>Did I do my best...</h3>
        <QuestionList
          onSubmit={this.state.isSubmitting}
          onFinishSubmit={this.onFinishSubmit}
        />
        <div className={c.pageFlags}>
          {PageFlags}
        </div>
        {addQuestionModal}
        {this.state.isSubmitting && <LoadingView message="Updating..." />}
      </Paper>
    );
  }
}

const styles = theme => ({
  pageFlags: {
    position: 'absolute',
    left: '100%',
    top: '0'
  },
  flags: {
    marginTop: '120px'
  },
  headline: {
    marginBottom: '36px',
    marginLeft: '-28px',
    paddingLeft: '18px',
    backgroundColor: theme.colorNeutral,
    width: '300px',
    height: '55px',
    lineHeight: '55px',
    color: 'white',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: '-35px',
      display: 'inline-block',
      width: '0' ,
      height: '0' ,
      borderTop: '0',
      borderBottom: '55px solid transparent',
      borderLeft: `35px solid ${theme.colorNeutral}`,
    }
  }
});

export default compose(
  injectSheet(styles),
  withTheme
)(Home);
