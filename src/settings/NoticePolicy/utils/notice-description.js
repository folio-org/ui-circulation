import {
  feeFineEventsIds,
  loanUserInitiatedEventsIds,
  requestItemStateChangeEventsIds,
  requestUserInitiatedEventsIds,
  requestTimeBasedEventsIds,
} from '../../../constants';

export default (eventId) => {
  let messageKey = null;

  const postponedEvents = [
    loanUserInitiatedEventsIds.CHECK_IN,
    loanUserInitiatedEventsIds.CHECK_OUT,
  ];

  const realTimeEvents = [
    loanUserInitiatedEventsIds.RENEWED,
    loanUserInitiatedEventsIds.MANUAL_DUE_DATE_CHANGE,
    loanUserInitiatedEventsIds.ITEM_RECALLED,
    requestItemStateChangeEventsIds.AVAILABLE,
    ...Object.values(requestUserInitiatedEventsIds),
    ...Object.values(requestTimeBasedEventsIds),
    ...Object.values(feeFineEventsIds),
  ];

  if (postponedEvents.includes(eventId)) {
    messageKey = 'ui-circulation.settings.noticePolicy.notices.postponed.notification';
  }

  if (realTimeEvents.includes(eventId)) {
    messageKey = 'ui-circulation.settings.noticePolicy.notices.realTime.notification';
  }

  return messageKey;
};
