// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { getDaysInCurrentMonthGrid, getPrevMonthDays, getMonthDays } from 'app/lib/helpers';
import Day from './Monthly/Day';

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
    const thisMonthGrid = getDaysInCurrentMonthGrid(today);
    // The center of the array will always be the active month we are looking for.
    const activeMonth = thisMonthGrid[Math.round((thisMonthGrid.length - 1) / 2)];

    return (
      <div className={c.container}>
        {thisMonthGrid.map((date, i) => 
          <Day date={date} key={i} activeMonth={activeMonth}/>
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

export default injectSheet(styles)(MonthView);