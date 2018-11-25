// @flow
import moment from 'moment';

function getCurrentTime():string {
  return moment().format();
}

function getPrevMonthDays(lastDayPrevMonth: number, length: number): Array<number> {
  let nextDate = lastDayPrevMonth;
  const prevMonthArray = new Array(length).fill(0);
  const prevMonthDays = prevMonthArray.reduce((acc, curr, i) => {
    acc.unshift(nextDate);
    nextDate = nextDate - 1;
    return acc;
  }, []);

  return prevMonthDays;
}

function getMonthDays(length: number): Array<number> {
  let counter = length;
  let day = 1;
  let res = [];

  do {
    res.push(day);
    day = day + 1;
    counter = counter - 1;
  } while(counter > 0)

  return res;
}

export {
  getCurrentTime,
  getPrevMonthDays,
  getMonthDays
}