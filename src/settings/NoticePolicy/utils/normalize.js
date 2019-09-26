import {
  isUndefined,
  cloneDeep,
  forEach,
  values,
  unset,
} from 'lodash';

import { Notice } from '../../Models/NoticePolicy';

import {
  loanTimeBasedEventsIds,
  requestTimeBasedEventsIds
} from '../../../constants';

const timeBasedEventsIds = [
  ...values(loanTimeBasedEventsIds),
  ...values(requestTimeBasedEventsIds),
];

const setNoticeDefaults = (sectionKey, policy) => {
  const noticePolicy = cloneDeep(policy);

  forEach(noticePolicy[sectionKey], (notice) => {
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

    if (!notice.sendOptions.isTimeBasedEventSelected(timeBasedEventsIds)) {
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
    checkNoticeHiddenFields.bind(null, 'loanNotices'),
    setNoticeDefaults.bind(null, 'requestNotices'),
    checkNoticeHiddenFields.bind(null, 'requestNotices'),
  ];

  return filter(entity, ...callbacks);
};
