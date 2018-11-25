// @flow
import React from 'react';
import injectSheet from 'react-jss';
import cx from 'classnames';
import moment from 'moment';

type Props = {
  classes: Object,
  today: string,
  onClickNext: Function,
  onClickPrev: Function
}

const Navigation = ({ classes: c, today, onClickNext, onClickPrev }: Props) => (
  <div className={c.container}>
    <div className={c.arrowBtn} onClick={onClickPrev}>
      <i className="material-icons">chevron_left</i>
    </div>
    <div>
      {moment.parseZone(today).format("MMMM YYYY")}
    </div>
    <div className={c.arrowBtn} onClick={onClickNext}>
      <i className="material-icons">chevron_right</i>
    </div>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '50px'
  },
  arrowBtn: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ddd',
      color: 'white'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50px'
  }
};

export default injectSheet(styles)(Navigation);