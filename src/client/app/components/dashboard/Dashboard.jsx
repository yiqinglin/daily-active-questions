// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Calendar from 'app/components/calendar/Calendar';

type Props = {
  classes: Object
}

const Dashboard = ({ classes: c }: Props) => (
  <div className={c.container}>
    <Calendar />
  </div>
);

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