import {
  isUndefined,
  cloneDeep,
  forEach,
  values,
  unset,
} from 'lodash';

import { Notice } from '../../Models/NoticePolicy';

import {
  feeFineEventsIds,
  loanTimeBasedEventsIds,
  requestTimeBasedEventsIds
} from '../../../constants';

const setNoticeDefaults = (sectionKey, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (notice) => {
    if (isUndefined(notice.realTime)) {
      notice.realTime = false;
    }
  });

  return noticePolicy;
};

const checkNoticeHiddenFields = (sectionKey, allowedIds, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (item, index) => {
    const notice = new Notice(item);

    if (!notice.sendOptions.isSendOptionsAvailable(allowedIds)) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendBy`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendHow`);
      unset(noticePolicy, `[${sectionKey}][${index}].frequency`);
    }

    if (!notice.sendOptions.isBeforeOrAfter()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendBy`);
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
      unset(noticePolicy, `[${sectionKey}][${index}].frequency`);
    }

    if (!notice.isRecurring()) {
      unset(noticePolicy, `[${sectionKey}][${index}].sendOptions.sendEvery`);
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
    checkNoticeHiddenFields.bind(null, 'loanNotices', values(loanTimeBasedEventsIds)),
    setNoticeDefaults.bind(null, 'requestNotices'),
    checkNoticeHiddenFields.bind(null, 'requestNotices', values(requestTimeBasedEventsIds)),
    setNoticeDefaults.bind(null, 'feeFineNotices'),
    checkNoticeHiddenFields.bind(null, 'feeFineNotices', values(feeFineEventsIds)),
  ];

  return filter(entity, ...callbacks);
};
