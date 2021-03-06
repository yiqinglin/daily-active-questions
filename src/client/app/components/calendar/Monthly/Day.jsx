// @flow
import * as React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import classname from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

type Props = {
  classes: Object,
  history: Object,
  date: string,
  activeMonth: string,
  children: React.Node
}

const Day = ({ classes: c, date, activeMonth, history, children }: Props) => {
  const isWeekend = (date) => {
    // momnent.day() will return 0 for Sunday and 6 for Saturday.
    return moment.parseZone(date).day() % 6 == 0;
  }

  const isNeighboringMonth = (date) => {
    return !moment.parseZone(date).isSame(moment.parseZone(activeMonth), 'month');
  }

  return (
    <div className={c.container} onClick={() => history.push(`/dashboard/details/${moment.parseZone(date).format('YYYY/MM/DD')}`)}>
      <div className={classname(c.date, isWeekend(date) && c.weekend, isNeighboringMonth(date) && c.neighborMonth)}>
        {moment.parseZone(date).date()}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' ,
    flex: '1 0 14%',
    cursor: 'pointer',
    fontWeight: '300',
    height: '70px',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#eee'
    }
  },
  date: {
    fontSize: '12px',
    position: 'absolute',
    left: '5px',
    top: '5px'
  },
  weekend: {
    color: theme.colorAccent
  },
  neighborMonth: {
    color: `${theme.colorNeutral} !important`
  }
});

export default compose(
  withRouter,
  withTheme,
  injectSheet(styles)
)(Day);