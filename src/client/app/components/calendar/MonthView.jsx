// @flow
import React from 'react';
import { compose } from 'react-apollo';
import injectSheet from 'react-jss';
import moment from 'moment';
import { getDaysInCurrentMonthGrid } from 'app/lib/helpers';
import Day from './Monthly/Day';
import withDailyAverage from 'app/composers/queries/withDailyAverage';
import ScoreBubble from 'app/components/dashboard/ScoreBubble';

type Props = {
  classes: Object,
  today: string,
  isFetching: boolean,
  dailyAverage: Array<Object>
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

  getTodaysValue = (date) => {
    const { dailyAverage } = this.props;
    
    // Match date and return average vaule.
    for (let day of dailyAverage) {
      if (moment.parseZone(day.timestamp).isSame(moment.parseZone(date), 'day')) {
        return <ScoreBubble score={day.value} />;
      }
    }

    // No data was found for that date.
    return '';
  }
  

  render() {
    const { classes: c, today, isFetching, dailyAverage } = this.props;
    const { selectedDay } = this.state;    
    const thisMonthGrid = getDaysInCurrentMonthGrid(today);
    // The center of the array will always be the active month we are looking for.
    const activeMonth = thisMonthGrid[Math.round((thisMonthGrid.length - 1) / 2)];

    return (
      <div className={c.container}>
        {thisMonthGrid.map((date, i) => 
          <Day date={date} key={i} activeMonth={activeMonth}>
            {isFetching ? '...' : this.getTodaysValue(date)}
          </Day>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

export default compose(
  injectSheet(styles),
  withDailyAverage
)(MonthView);