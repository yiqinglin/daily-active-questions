// @flow
import * as React from 'react';
import { compose } from 'react-apollo';
import injectSheet, { withTheme } from 'react-jss';
import moment, { duration } from 'moment';
import cx from 'classnames';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom';
import { scoreToColor } from 'app/lib/helpers';

type Props = {
  classes: Object,
  activeDate: string
}
type State = {
  onScrollLeave: boolean
}

class DetailsView extends React.Component<Props, State> {
  highlightedElem: HTMLDivElement;
  state = { onScrollLeave: false };
  
  componentDidMount(){
    window.scrollTo({
      top: this.highlightedElem.offsetTop, 
      behavior: "smooth"
  })
  }

  render() {
    const { classes: c, activeDate, history } = this.props;
    const { onScrollLeave } = this.state;
    const mockData = [
      {
        date: moment('2018-11-01', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-02', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-03', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '7',
          'to understand': '8'
        }
      },
      {
        date: moment('2018-11-04', 'YYYY-MM-DD').format(),
        questions: {}
      },
      {
        date: moment('2018-11-05', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '9',
          'to meditate': '6',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-06', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-07', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-08', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-09', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-10', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-11', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-12', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-13', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-14', 'YYYY-MM-DD').format(),
        questions: {}
      },
      {
        date: moment('2018-11-15', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-16', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-17', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-18', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-19', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-20', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-21', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-22', 'YYYY-MM-DD').format(),
        questions: {}
      },
      {
        date: moment('2018-11-23', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-24', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-25', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-26', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-27', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-28', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-29', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      },
      {
        date: moment('2018-11-30', 'YYYY-MM-DD').format(),
        questions: {
          'to make friends': '3',
          'to meditate': '3',
          'to understand': '5'
        }
      }
    ];
    
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
          {mockData.map((day, i) =>
            <div key={i} className={c.dayRow} ref={(element) => createRef(element, day.date)}>
              <div className={c.date}>
                <span className={c.dayMonth}>{moment.parseZone(day.date).format('MMMM D')}</span>
                <span className={c.dayOfTheWeek}>{moment.parseZone(day.date).format('dddd')}</span>
              </div>
              <div className={c.qSection}>
                {Object.keys(day.questions).length > 0 && Object.keys(day.questions).map((question, id) => 
                  <div className={c.questionRow} key={id}>
                    <div className={cx(c.colorCode, scoreToColor(day.questions[question]))}/>
                    <div className={c.question}>{question}</div>
                    <div className={cx(c.value, scoreToColor(day.questions[question]))}>
                      {day.questions[question]}
                    </div>
                  </div>
                )}
                {Object.keys(day.questions).length == 0 && (
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
  withRouter,
  withTheme,
  injectSheet(styles)
)(DetailsView);