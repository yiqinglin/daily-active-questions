// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { getCurrentTime } from 'app/lib/helpers';
import MonthView from './MonthView';
import Navigation from './Navigation';

type Props = {
  classes: Object,
  activeDate: string
}

const Calendar = ({ classes: c, activeDate }: Props) => (
  <div className={c.container}>
  <Navigation
    activeDate={activeDate}
  />
  <MonthView today={activeDate} />  
</div>
);

const styles = {
  container: {
    width: '100%',
    minWidth: '350px'
  }
};

export default injectSheet(styles)(Calendar);