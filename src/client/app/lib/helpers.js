// @flow
import moment from 'moment';

function getCurrentTime():string {
  return moment().format();
}

function getDaysInCurrentMonthGrid(today: string): Array<string> {
  const monthStartAt = moment.parseZone(today).startOf('month').day();
  const monthEndAt = moment.parseZone(today).endOf('month').day();

  const prevMonthDays = getPrevMonthDays(today, monthStartAt);
  const currMonthDays = getMonthDays(moment.parseZone(today).startOf('month').format());
  const nextMonthDays = getMonthDays(moment.parseZone(today).add(1, 'month').startOf('month').format(), 6 - monthEndAt);

  return [...prevMonthDays, ...currMonthDays, ...nextMonthDays];
}

function getPrevMonthDays(today: string, length: number): Array<string> {
  const prevMonthArray = new Array(length).fill(0);
  let prevMonthDayPointer = moment.parseZone(today).add(-1, 'month').endOf('month').format();
  const prevMonthDays = prevMonthArray.reduce((acc, curr, i) => {
    acc.unshift(prevMonthDayPointer);
    prevMonthDayPointer = moment.parseZone(prevMonthDayPointer).add(-1, 'day').format();

    return acc;
  }, []);

  return prevMonthDays;
}

function getMonthDays(startAt: string, length?: number): Array<string> {
  // Length is 0 means that the month ends on a Saturday and we don't have to look at the next month to fill out the grid.
  if (length == 0){
    return [];
  }
  if (!length) {
    length = moment.parseZone(startAt).endOf('month').date();
  }

  let dayPointer = moment.parseZone(startAt).format();
  let counter = length;
  let res = [];

  do {
    res.push(dayPointer);
    dayPointer = moment.parseZone(dayPointer).add(1, 'day').format();
    counter = counter - 1;
  } while(counter > 0)

  return res;
}

function scoreToColor(score: Number) {
  const value = parseFloat(score);

  switch (Math.floor(value/2)) {
    case 1:
      return 'colorCodeRed';
    case 2:
      return 'colorCodeOrange';
    case 3:
      return 'colorCodeYellow';
    case 4:
     return 'colorCodeGreen';
    case 5:
      return 'colorCodeBlue';
  }
}

export {
  getCurrentTime,
  getDaysInCurrentMonthGrid,
  scoreToColor
}