// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet from 'react-jss';
import cx from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import withUser from 'app/composers/queries/withUser';

type Props = {
  classes: Object,
  activeDate: string,
  history: Object,
  user: Object
}

const Navigation = ({ classes: c, activeDate, history, onClickNext, onClickPrev, user }: Props) => {
  const activeMonth = parseInt(moment.parseZone(activeDate).format("MM"));
  const activeYear = parseInt(moment.parseZone(activeDate).format("YYYY"));
  const getYearMonth = (direction: string) => {
    switch (direction) {
      case 'prev':
        if (activeMonth === 1) {
          return `${activeYear - 1}/12`;
        } else {
          return `${activeYear}/${activeMonth - 1}`;
        }
      case 'next':
        if (activeMonth === 12) {
          return `${activeYear + 1}/1`;
        } else {
          return `${activeYear}/${activeMonth + 1}`;
        }
      default:
        return '';
    }
  }
  const isCurrentMonth = () => moment.parseZone(activeDate).isSame(moment(), 'month');
  const isBeforeRegister = () => moment.parseZone(activeDate).isSameOrBefore(moment(user.registeredAt), 'month');
  const redirectClickWithGuard = (guard, redirectUrl) => {
    if (guard) {
      history.push(redirectUrl);
    }
  };

  return (
    <div className={c.container}>
      <div
        className={cx(c.arrowBtn, isBeforeRegister() && c.disabled)}
        onClick={() => redirectClickWithGuard(!isBeforeRegister(),
          `/dashboard/monthly/${moment.parseZone(activeDate).add(-1, 'months').format('YYYY/MM/DD')}`)}
      >
        <i className="material-icons">chevron_left</i>
      </div>
      <div>
        {moment.parseZone(activeDate).format("MMMM YYYY")}
      </div>
      <div
        className={cx(c.arrowBtn, isCurrentMonth() && c.disabled)}
        onClick={() => redirectClickWithGuard(!isCurrentMonth(),
          `/dashboard/monthly/${moment.parseZone(activeDate).add(1, 'months').format('YYYY/MM/DD')}`)}
      >
        <i className="material-icons">chevron_right</i>
      </div>
    </div>
  );  
}
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
  },
  disabled: {
    cursor: 'not-allowed',
    color: '#ddd',
    '&:hover': {
      color: '#ddd',
      backgroundColor: 'transparent'
    }
  }
};

export default compose(
  injectSheet(styles),
  withRouter,
  withUser,
)(Navigation);