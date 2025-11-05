import {
  timeBasedFeeFineEventsIds,
  userInitiatedTimeBasedFeeFineEventsIds,
  loanUserInitiatedEventsIds,
  loanTimeBasedEventsIds,
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
    loanUserInitiatedEventsIds.HOLD_REQUESTED_FOR_ITEM,
    requestItemStateChangeEventsIds.AVAILABLE,
    ...Object.values(requestUserInitiatedEventsIds),
    ...Object.values(requestTimeBasedEventsIds),
    timeBasedFeeFineEventsIds.RENEWED,
    timeBasedFeeFineEventsIds.RETURNED,
    userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
  ];

  const conditionalEvents = [
    loanTimeBasedEventsIds.AGED_TO_LOST,
  ];

  if (postponedEvents.includes(eventId)) {
    messageKey = 'ui-circulation.settings.noticePolicy.notices.postponed.notification';
  }

  if (realTimeEvents.includes(eventId)) {
    messageKey = 'ui-circulation.settings.noticePolicy.notices.realTime.notification';
  }

  if (conditionalEvents.includes(eventId)) {
    messageKey = 'ui-circulation.settings.noticePolicy.notices.conditional.notification';
  }

  return messageKey;
};
