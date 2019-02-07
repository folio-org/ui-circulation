import { isEqual } from 'lodash';

import LoanNoticeSendOptions from './LoanNoticeSendOptions';
import { loanNoticesFrequencyMap } from '../../../constants';

export default class LoanNotice {
  constructor(notice = {}) {
    this.templateId = notice.templateId;
    this.format = notice.format;
    this.frequency = notice.frequency;
    this.realTime = notice.realTime;
    this.sendOptions = new LoanNoticeSendOptions(notice.sendOptions);
  }

  isRecurring() {
    return isEqual(this.frequency, loanNoticesFrequencyMap.RECURRING);
  }
}
