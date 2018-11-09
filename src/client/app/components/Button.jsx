// @flow
import React from 'react';
import injectSheet from 'react-jss'

type Props = {
  classes: Object,
  text: String,
  theme: 'PRIMARY' | 'SECONDARY' | 'DEFAULT',
  styles: Object,
  imgSrc: String,
  onClick: Function | String
}

const Button = ({ classes: c, text, styles, imgSrc, onClick }: Props) => (
  <div
    onClick={onClick}
    className={c.button}
    style={styles}
  >
    {text}
    <img src={imgSrc} className={c.img}/>
  </div>
);

const styles = {
  button: {
    cursor: 'pointer',
    border: '1px solid grey',
    padding: '15px 30px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '300',
    float: 'left',
    clear: 'both',
    marginTop: '5px',
    marginBottom: '5px',
    fontSize: '14px',
    transition: 'background-color .12s ease-in-out',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.1)'
    }
  },
  img: {
    position: 'absolute',
    right: '10px',
    top: '0',
    bottom: '0',
    margin: 'auto',
    height: '20px'
  }
};

export default injectSheet(styles)(Button);