import {
  isEmpty,
  isNumber,
} from 'lodash';

export default class LostItem {
  static isPeriodValid(lostItem = {}) {
    return isNumber(lostItem.duration) && lostItem.duration > 0 && !isEmpty(lostItem.intervalId);
  }

  constructor(lostItem = {}) {
    this.duration = lostItem.duration;
    this.intervalId = lostItem.intervalId;
  }
}
