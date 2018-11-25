// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { getPrevMonthDays, getMonthDays } from 'app/lib/helpers';

type Props = {
  classes: Object,
  today: string
}

type State = {
  selectedDay: string
}


class MonthView extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedDay: props.today
    }
  }

  

  render() {
    const { classes: c, today } = this.props;
    const { selectedDay } = this.state;
    const monthStartAt = moment.parseZone(today).startOf('month').day();
    const monthEndAt = moment.parseZone(today).endOf('month').day();
    const endOfMonth = moment.parseZone(today).endOf('month').date();
    const endOfPrevMonth = moment.parseZone(today).add(-1, 'month').endOf('month').date();
    const days = [...getPrevMonthDays(endOfPrevMonth, monthStartAt),
      ...getMonthDays(endOfMonth), ...getMonthDays(6 - monthEndAt)];

    return (
      <div className={c.container}>
        {days.map((day, i) => <i key={i}>{day}</i>)}
      </div>
    );
  }
}

const styles = {
  container: {
    fontSize: '30px',
    color: 'green'
  }
};

export default injectSheet(styles)(MonthView);