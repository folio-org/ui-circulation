import {
  isEmpty,
  isNumber,
} from 'lodash';

export default class Period {
  static isPeriodValid(period = {}) {
    return isNumber(period.duration) && !isEmpty(period.intervalId);
  }

  constructor(period = {}) {
    this.duration = period.duration;
    this.intervalId = period.intervalId;
  }
}
