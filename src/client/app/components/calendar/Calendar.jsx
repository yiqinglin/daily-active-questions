// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { getCurrentTime } from 'app/lib/helpers';
import MonthView from './MonthView';
import Navigation from './Navigation';

type Props = {
  classes: Object,
  today: string
}
type State = {
  currentTime: string
}

class Calendar extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: props.today ? props.today : getCurrentTime()
    }
  }

  onClickNavNext = () => {
    this.setState({ currentTime: moment.parseZone(this.state.currentTime).add(1, 'months').format()})
  }

  onClickNavPrev = () => {
    this.setState({ currentTime: moment.parseZone(this.state.currentTime).add(-1, 'months').format()})
  }

  render() {
    const { classes: c } = this.props;
    const { currentTime } = this.state;

    return (
      <div className={c.container}>
        Calendar!
        <Navigation
          today={currentTime}
          onClickNext={this.onClickNavNext}
          onClickPrev={this.onClickNavPrev}
        />
        <MonthView today={currentTime}/>  
      </div>
    );    
  }
}

const styles = {
  container: {
    width: '100%',
    minWidth: '350px'
  }
};

export default injectSheet(styles)(Calendar);