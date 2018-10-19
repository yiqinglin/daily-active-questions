// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object,
  placeholder: string,
  value: string,
  onChange: string => void
}

const TextField = ({ classes: c, placeholder, value, onChange }: Props) => (
  <input
    className={c.input}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
    value={value}
  />
);

const styles = {
  input: {
    font: 'inherit',
    width: '100%',
    border: '0',
    borderBottom: '1px solid rgba(0,0,0,0.42)',
    margin: '0',
    padding: '6px 0 7px',
    display: 'block',
    minWidth: '0',
    boxSizing: 'content-box',
    background: 'none',
    '&:focus': {
      outline: '0',
      borderBottom: '1px solid rgba(0,0,0,0.62)',
    }
  }
};

export default injectSheet(styles)(TextField);