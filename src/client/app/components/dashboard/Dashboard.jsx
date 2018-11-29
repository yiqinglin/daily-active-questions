// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import Calendar from 'app/components/calendar/Calendar';

type URLParams = {
  mode: 'monthly' | 'details',
  day: string,
  month: string,
  year: string
}

type Props = {
  classes: Object,
  match: {
    params: URLParams
  }
}

const Dashboard = ({ classes: c, match }: Props) => {
  const { mode, day, month, year } = match.params;

  return (
    <div className={c.container}>
      <Calendar activeDate={mode && moment(`${year}-${month}`, "YYYY-MM").format()} />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    width: '700px',
    minHeight: '300px',
    padding: '18px',
    marginTop: '80px',
    borderRadius: '4px',
    position: 'relative'
  },
};

export default injectSheet(styles)(Dashboard);