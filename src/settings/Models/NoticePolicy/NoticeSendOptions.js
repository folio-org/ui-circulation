import {
  includes,
  isEqual,
} from 'lodash';

import { Period } from '../common';
import {
  loanTimeBasedEventsIds,
  noticesSendEventMap,
} from '../../../constants';

export default class NoticeSendOptions {
  constructor(options = {}) {
    this.sendHow = options.sendHow;
    this.sendWhen = options.sendWhen;
    this.sendBy = new Period(options.sendBy);
    this.sendEvery = new Period(options.sendEvery);
  }

  isSendOptionsAvailable(allowedIds = []) {
    return includes(allowedIds, this.sendWhen);
  }

  isBeforeOrAfter() {
    return isEqual(this.sendHow, noticesSendEventMap.AFTER)
       || isEqual(this.sendHow, noticesSendEventMap.BEFORE);
  }

  isFrequencyAvailable(allowedIds = []) {
    return this.isSendOptionsAvailable(allowedIds) && this.isBeforeOrAfter();
  }

  isLoanDueDateTimeSelected() {
    return isEqual(this.sendWhen, loanTimeBasedEventsIds.DUE_DATE);
  }
}
