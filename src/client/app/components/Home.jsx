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
  isSubmitting: boolean,
  flagNeedsReset: boolean
}

class Home extends React.Component<Props, State> {
  static contextType = AppStateContext;
  state = {
    modalOpen: false,
    isSubmitting: false,
    flagNeedsReset: false
  }
  
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  onClickSubmit = () => {
    if (!this.context.isSubmitting) {
      this.context.updateSubmitState(true);
    }
  }

  onFinishSubmit = () => {
    this.context.updateSubmitState(false);
    this.context.updateEditState(false);

    // When flagNeedsReset is flipped from False to True, Flag component updates/rerenders.
    // So we need to reset the value of this state after it's flipped so that it can be reused next time.
    this.setState({ flagNeedsReset: true }, () => this.setState({ flagNeedsReset: false }))
  }

  render() {
    const { classes: c, theme } = this.props;
    const PageFlags = (
      <div className={c.flags}>
        <Flag
          icon="/img/answer.svg"
          custom
          hex={theme.colorPrimary}
          onClick={() => this.context.updateEditState(true)}
          extendable
          onConfirm={this.onClickSubmit}
          onCancel={() => this.context.updateEditState(false)}
          title="Edit"
          placement="right"
          reset={this.state.flagNeedsReset}
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
          onSubmit={this.context.isSubmitting}
          onFinishSubmit={this.onFinishSubmit}
        />
        <div className={c.pageFlags}>
          {PageFlags}
        </div>
        {addQuestionModal}
        {this.context.isSubmitting && <LoadingView message="Updating..." />}
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
