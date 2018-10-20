// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object,
  question: String,
  children: Node,
  deleteQuestion: Function
}

const Question = ({ classes: c, question, children, deleteQuestion }: Props) => (
  <div className={c.container}>
    <div className={c.qLine}>
      <h4>{question}</h4>
      <div className={c.actions}>
        <i className="material-icons">edit</i>
        <i className="material-icons" onClick={deleteQuestion}>delete</i>
      </div>
    </div>
    {children}
  </div>
);

const styles = {
  container: {
    marginBottom: '36px'
  },
  qLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actions: {
    '&> .material-icons': {
      fontSize: '16px',
      color: 'rgb1(84, 84, 81, 1)',
      marginLeft: '5px',
      cursor: 'pointer',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        color: 'rgba(84, 84, 81, 0.3)'
      }
    }
  }
};

export default injectSheet(styles)(Question);