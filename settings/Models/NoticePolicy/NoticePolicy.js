import { Metadata } from '../common';

import LoanNotice from './LoanNotice';

export default class NoticePolicy {
  static defaultNoticePolicy() {
    return {};
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.descrition = policy.descrition;
    this.active = policy.active;
    this.metadata = new Metadata(policy.metadata);
    this.loanNotices = policy.loanNotices ? policy.loanNotices.reduce((loanNotices, loanNotice) => {
      const ln = new LoanNotice(loanNotice);

      return [...loanNotices, ln];
    }, []) : [];
  }
}
