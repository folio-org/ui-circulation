import {
  cloneDeep,
  forEach,
  unset,
  isUndefined,
} from 'lodash';

import { Notice } from '../../Models/NoticePolicy';

const setNoticeDefaults = (sectionKey, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (notice) => {
    notice.name = 'mockName';
    notice.templateName = 'mockTemplateName';

    if (isUndefined(notice.realTime)) {
      notice.realTime = false;
    }
  });

  return noticePolicy;
};

const checkNoticeHiddenFields = (sectionKey, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (item, index) => {
    const notice = new Notice(item);

    if (!notice.isRecurring()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
    }

    if (!notice.sendOptions.isBeforeOrAfter()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendBy`);
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
    setNoticeDefaults.bind(null, 'loanNotices'),
    checkNoticeHiddenFields.bind(null, 'loanNotices'),
    setNoticeDefaults.bind(null, 'requestNotices'),
    checkNoticeHiddenFields.bind(null, 'requestNotices'),
  ];

  return filter(entity, ...callbacks);
};
