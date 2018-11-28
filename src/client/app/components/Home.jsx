// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import QuestionList from 'app/components/questionnaire/QuestionList';
import AddQuestion from 'app/components/questionnaire/AddQuestion';
import Button from 'app/components/Button';
import Flag from './Flag';

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
          onClick={() => this.setState({ writeMode: true })}
          extendable
          onConfirm={this.onClickSubmit}
          onCancel={() => this.setState({ writeMode: false })}
        />
        <Flag
          icon="add_circle"
          hex={theme.colorSecondary}
          styles={{ marginTop: '20px' }}
          onClick={() => this.setState({ modalOpen: true })}  
        />
        <Flag
          icon="swap_vert"
          hex={theme.colorAccent}
          styles={{ marginTop: '20px' }}
        />
      </div>
    );
    const addQuestionModal = this.state.modalOpen &&
      <AddQuestion
        onSuccess={() => this.closeModal()}
        onClose={() => this.closeModal()}
      />;
  
    return (
      <div className={c.container}>
        <h3 className={c.headline}>Did I do my best...</h3>
        <QuestionList
          writeMode={this.state.writeMode}
          onSwitchMode={() => this.setState({ writeMode: false })}
          onSubmit={this.state.isSubmitting}
          onFinishSubmit={this.onFinishSubmit}
        />
        <div className={c.pageFlags}>
          {PageFlags}
        </div>
        {addQuestionModal}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    backgroundColor: 'white',
    width: '700px',
    minHeight: '300px',
    padding: '18px',
    marginTop: '80px',
    borderRadius: '4px',
    position: 'relative'
  },
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
    marginLeft: '-18px',
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
