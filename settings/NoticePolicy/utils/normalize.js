import {
  cloneDeep,
  forEach,
  unset,
  isUndefined,
} from 'lodash';

import { Notice } from '../../Models/NoticePolicy';

const setLoanNoticeDefaults = (policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy.loanNotices, (loanNotice) => {
    loanNotice.name = 'mockName';
    loanNotice.templateName = 'mockTemplateName';

    if (isUndefined(loanNotice.realTime)) {
      loanNotice.realTime = false;
    }
  });

  return noticePolicy;
};

const checkLoanNoticeHiddenFields = (policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy.loanNotices, (loanNotice, index) => {
    const notice = new Notice(loanNotice);

    if (!notice.isRecurring()) {
      unset(noticePolicy, `loanNotices[${index}].sendOptions.sendEvery`);
    }

    if (!notice.sendOptions.isBeforeOrAfter()) {
      unset(noticePolicy, `loanNotices[${index}].sendOptions.sendBy`);
    }
  });

  return noticePolicy;
};

const filter = (entity, ...callbacks) => {
  let filteredEntity = cloneDeep(entity);

  forEach(callbacks, (callback) => {
    filteredEntity = callback(filteredEntity);
  });

  return filteredEntity;
};

export default (entity) => {
  const callbacks = [
    setLoanNoticeDefaults,
    checkLoanNoticeHiddenFields,
  ];

  return filter(entity, ...callbacks);
};
