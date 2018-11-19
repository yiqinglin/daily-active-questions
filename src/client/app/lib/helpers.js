// @flow
import moment from 'moment';

function getCurrentTime():string {
  return moment().format();
}

export {
  getCurrentTime
}