import { isEqual } from 'lodash';

import NoticeSendOptions from './NoticeSendOptions';
import { noticesFrequencyMap } from '../../../constants';

export default class Notice {
  constructor(notice = {}) {
    this.templateId = notice.templateId;
    this.format = notice.format;
    this.frequency = notice.frequency;
    this.realTime = notice.realTime;
    this.sendOptions = new NoticeSendOptions(notice.sendOptions);
  }

  isRecurring() {
    return isEqual(this.frequency, noticesFrequencyMap.RECURRING);
  }
}
