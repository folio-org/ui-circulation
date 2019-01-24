import {
  Metadata,
  Period,
} from '../common';

class NoticeSendOptions {
  constructor(options = {}) {
    this.sendHow = options.sendHow;
    this.sendWhen = options.sendWhen;
    this.sendBy = new Period(options.sendBy);
    this.sendEvery = new Period(options.sendEvery);
  }
}

class Notice {
  constructor(notice = {}) {
    this.name = notice.name;
    this.templateId = notice.templateId;
    this.templateName = notice.templateName;
    this.format = notice.format;
    this.frequency = notice.frequency;
    this.realTime = notice.realTime;
    this.sendOptions = new NoticeSendOptions(notice.sendOptions);
  }
}

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
  }
}
