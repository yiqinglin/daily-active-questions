// @flow
import React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Calendar from 'app/components/calendar/Calendar';
import DetailsView from './DetailsView';

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
  const details = (mode === 'details' &&
    <DetailsView activeDate={mode==='details' && moment(`${year}-${month}-${day}`, "YYYY-MM-DD").format()} />);
  const calendarView = (mode !== 'details' &&
    <Calendar activeDate={mode && moment(`${year}-${month}`, "YYYY-MM").format()} />);
  const paperStyle = {
    width: '800px',
    minHeight: '300px',
    padding: '18px',
    marginTop: '80px',
    position: 'relative'
  };

  return (
    <Paper style={paperStyle}>
      {details}
      {calendarView}
    </Paper>
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
  }
};

export default injectSheet(styles)(Dashboard);