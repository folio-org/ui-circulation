import {
  isEmpty,
  isNumber,
} from 'lodash';

export default class OverdueFine {
  static isPeriodValid(overdueFine = {}) {
    return isNumber(overdueFine.quantity) && !isEmpty(overdueFine.intervalId);
  }

  constructor(overdueFine = {}) {
    this.quantity = overdueFine.quantity;
    this.intervalId = overdueFine.intervalId;
  }
}
