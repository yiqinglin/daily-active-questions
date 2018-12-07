// @flow
import * as React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import moment, { duration } from 'moment';
import cx from 'classnames';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom';
import { scoreToColor } from 'app/lib/helpers';
import withDailyDetails from 'app/composers/queries/withDailyDetails';

type DailyDetails = {
  date: String,
  questions: Array<Object>
}

type Props = {
  classes: Object,
  history: Object,
  activeDate: string,
  isFetching: boolean,
  dailyDetails: Array<DailyDetails>
}
type State = {
  onScrollLeave: boolean,
  scrollIntoView: boolean
}

class DetailsView extends React.Component<Props, State> {
  highlightedElem: HTMLDivElement;
  state = { onScrollLeave: false, scrollIntoView: false };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.scrollIntoView && this.highlightedElem) {
      window.scrollTo({
        top: this.highlightedElem.offsetTop, 
        behavior: "smooth"
      })
      this.setState({ scrollIntoView: true })
    }
  }

  render() {
    const { classes: c, activeDate, history, isFetching, dailyDetails } = this.props;
    const { onScrollLeave } = this.state;
    
    if (isFetching) return (<div>Fetching...</div>);

    const createRef = (element, date) => {
      if (moment.parseZone(date).isSame(moment.parseZone(activeDate), 'day') && !this.highlightedElem) {
        this.highlightedElem = element;

      }
    };
    const isCurrentMonth = () => moment.parseZone(activeDate).isSame(moment(), 'month');
    const onClickNextMonth = () => {
      if (!isCurrentMonth()) { history.push(`/dashboard/details/${moment.parseZone(activeDate).add(1, 'months').format('YYYY/MM/DD')}`)};
    };

    return (
      <div className={c.container}>
        <Waypoint
          onEnter={() => this.setState({ onScrollLeave: false })}
          onLeave={() => this.setState({ onScrollLeave: true })}
        />
        <div className={cx(c.monthBanner, onScrollLeave && c.fixed)}>
          <div className={c.arrowBtn} onClick={() => history.push(`/dashboard/details/${moment.parseZone(activeDate).add(-1, 'months').format('YYYY/MM/DD')}`)}>
            <i className="material-icons">chevron_left</i>
          </div>
          <div>{moment.parseZone(activeDate).format('MMMM YYYY')}</div>
          <div className={cx(c.arrowBtn, isCurrentMonth() && c.disabled)} onClick={onClickNextMonth}>
            <i className="material-icons">chevron_right</i>
          </div>
        </div>
        <div>
          {dailyDetails.map((daily, i) =>
            <div key={i} className={c.dayRow} ref={(element) => createRef(element, daily.date)}>
              <div className={c.date}>
                <span className={c.dayMonth}>{moment.parseZone(daily.date).format('MMMM D')}</span>
                <span className={c.dayOfTheWeek}>{moment.parseZone(daily.date).format('dddd')}</span>
              </div>
              <div className={c.qSection}>
                {daily.questions.length > 0 && daily.questions.map((question, id) => 
                  <div className={c.questionRow} key={id}>
                    <div className={cx(c.colorCode, scoreToColor(question.value))}/>
                    <div className={c.question}>{question.question}</div>
                    <div className={cx(c.value, scoreToColor(question.value))}>
                      {question.value}
                    </div>
                  </div>
                )}
                {daily.questions.length == 0 && (
                  <div className={c.noEntry}>No data entered for the day.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: '350px',
    minHeight: '900px'
  },
  monthBanner: {
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    padding: '5px',
    paddingBottom: '10px',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fixed: {
    position: 'fixed',
    top: '0',
    width: '700px',
    height: '40px',
    backgroundColor: 'white',
    left: '0',
    right: '0',
    margin: 'auto',
    paddingTop: '10px',
    paddingLeft: '23px',
    paddingRight: '23px'
  },
  dayRow: {
    marginRight: '15px',
    marginLeft: '15px',
    padding: '5px'
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#aaa',
    textTransform: 'uppercase',
    fontSize: '14px'
  },
  qSection: {
    marginTop: '5px',
    marginBottom: '5px'
  },
  questionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  colorCode: {
    height: '15px',
    width: '5px',
    backgroundColor: 'red',
    marginRight: '10px',
    '&.colorCodeRed': {
      backgroundColor: theme.colorCodeRed
    },
    '&.colorCodeOrange': {
      backgroundColor: theme.colorCodeOrange
    },
    '&.colorCodeYellow': {
      backgroundColor: theme.colorCodeYellow
    },
    '&.colorCodeGreen': {
      backgroundColor: theme.colorCodeGreen
    },
    '&.colorCodeBlue': {
      backgroundColor: theme.colorCodeBlue
    },
  },
  question: {
    marginRight: '20px',
    color: '#636363'
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    '&.colorCodeRed': {
      color: theme.colorCodeRed
    },
    '&.colorCodeOrange': {
      color: theme.colorCodeOrange
    },
    '&.colorCodeYellow': {
      color: theme.colorCodeYellow
    },
    '&.colorCodeGreen': {
      color: theme.colorCodeGreen
    },
    '&.colorCodeBlue': {
      color: theme.colorCodeBlue
    },
  },
  noEntry: {
    color: '#676767',
    textTransform: 'uppercase',
    fontSize: '14px'
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
});

export default compose(
  withDailyDetails,
  withRouter,
  withTheme,
  injectSheet(styles)
)(DetailsView);