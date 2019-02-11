import Notice from './Notice';
import { Metadata } from '../common';

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
      const ln = new Notice(loanNotice);

      return [...loanNotices, ln];
    }, []) : [];
    this.requestNotices = policy.requestNotices ? policy.requestNotices.reduce((requestNotices, requestNotice) => {
      const rn = new Notice(requestNotice);

      return [...requestNotices, rn];
    }, []) : [];
  }
}
