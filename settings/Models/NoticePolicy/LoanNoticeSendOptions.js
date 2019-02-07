import { isEqual } from 'lodash';

import { Period } from '../common';
import { loanNoticesSendEventMap } from '../../../constants';

export default class LoanNoticeSendOptions {
  constructor(options = {}) {
    this.sendHow = options.sendHow;
    this.sendWhen = options.sendWhen;
    this.sendBy = new Period(options.sendBy);
    this.sendEvery = new Period(options.sendEvery);
  }

  isBeforeOrAfter() {
    return isEqual(this.sendHow, loanNoticesSendEventMap.AFTER)
       || isEqual(this.sendHow, loanNoticesSendEventMap.BEFORE);
  }
}
