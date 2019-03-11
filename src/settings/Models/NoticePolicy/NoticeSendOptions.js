import {
  isEqual,
  includes,
} from 'lodash';

import { Period } from '../common';
import { noticesSendEventMap } from '../../../constants';

export default class NoticeSendOptions {
  constructor(options = {}) {
    this.sendHow = options.sendHow;
    this.sendWhen = options.sendWhen;
    this.sendBy = new Period(options.sendBy);
    this.sendEvery = new Period(options.sendEvery);
  }

  isTimeBasedEventSelected(timeBasedEventsIds = []) {
    return includes(timeBasedEventsIds, this.sendWhen);
  }

  isBeforeOrAfter() {
    return isEqual(this.sendHow, noticesSendEventMap.AFTER)
       || isEqual(this.sendHow, noticesSendEventMap.BEFORE);
  }
}
