// These next sets are temporary Select list options for LoanPolicyDetail.js
// The idea is to eventually replace them with small, controlled vocabularies
// on the server side.
export const loanProfileTypes = [
  { label: 'Fixed', value: 'Fixed' },
  { label: 'Rolling', value: 'Rolling' },
];

export const intervalPeriods = [
  { label: 'Minutes', id: 1, value: 'Minutes' },
  { label: 'Hours', id: 2, value: 'Hours' },
  { label: 'Days', id: 3, value: 'Days' },
  { label: 'Weeks', id: 4, value: 'Weeks' },
  { label: 'Months', id: 5, value: 'Months' },
];

export const intervalIdsMap = {
  MINUTES: 'Minutes',
  HOURS: 'Hours',
  DAYS: 'Days',
  WEEKS: 'Weeks',
  MONTHS: 'Months',
  YEARS: 'Years',
};

export const loanProfileMap = {
  FIXED: 'Fixed',
  ROLLING: 'Rolling',
  INDEFINITE: 'Indefinite'
};

export const CURRENT_DUE_DATE_TIME = 'CURRENT_DUE_DATE_TIME';
export const END_OF_THE_CURRENT_SERVICE_POINT_HOURS = 'END_OF_THE_CURRENT_SERVICE_POINT_HOURS';
export const BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS = 'BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS';

export const KEEP_CURRENT_DATE = 'KEEP_CURRENT_DATE';
export const CURRENT_DUE_DATE = 'CURRENT_DUE_DATE';
export const END_OF_THE_PREVIOUS_OPEN_DAY = 'END_OF_THE_PREVIOUS_OPEN_DAY';
export const END_OF_THE_NEXT_OPEN_DAY = 'END_OF_THE_NEXT_OPEN_DAY';
export const END_OF_THE_CURRENT_DAY = 'END_OF_THE_CURRENT_DAY';

export const shortTermLoansOptions = [
  {
    label: 'Keep the current due date/time',
    id: CURRENT_DUE_DATE_TIME,
    value: CURRENT_DUE_DATE_TIME,
  },
  {
    label: 'Move to the end of the current service point hours',
    id: END_OF_THE_CURRENT_SERVICE_POINT_HOURS,
    value: END_OF_THE_CURRENT_SERVICE_POINT_HOURS,
  },
  {
    label: 'Move to the beginning of the next open service point hours',
    id: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
    value: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  },
];

export const longTermLoansOptions = [
  {
    label: 'Keep the current due date',
    id: CURRENT_DUE_DATE,
    value: CURRENT_DUE_DATE,
  },
  {
    label: 'Move to the end of the previous open day',
    id: END_OF_THE_PREVIOUS_OPEN_DAY,
    value: END_OF_THE_PREVIOUS_OPEN_DAY,
  },
  {
    label: 'Move to the end of the next open day',
    id: END_OF_THE_NEXT_OPEN_DAY,
    value: END_OF_THE_NEXT_OPEN_DAY,
  },
  {
    label: 'Move to the end of the current day',
    id: END_OF_THE_CURRENT_DAY,
    value: END_OF_THE_CURRENT_DAY,
  },
];

export const renewFromOptions = [
  { label: 'Current due date', id: 1, value: 'CURRENT_DUE_DATE' },
  { label: 'System date', id: 2, value: 'SYSTEM_DATE' },
];

export const renewFromIds = {
  CURRENT_DUE_DATE: 'CURRENT_DUE_DATE',
  SYSTEM_DATE: 'SYSTEM_DATE',
};

export const patronIdentifierTypes = [
  { key: 'BARCODE', label: 'Barcode', queryKey: 'barcode' },
  { key: 'EXTERNAL', label: 'External system id', queryKey: 'externalSystemId' },
  { key: 'FOLIO', label: 'FOLIO record number', queryKey: 'id' },
  { key: 'USER', label: 'Username', queryKey: 'username' },
];

export const requestPolicyTypes = [
  'Hold',
  'Page',
  'Recall',
];

export const noticesFormatsMap = {
  EMAIL: 'Email',
};

export const noticesFrequencyMap = {
  ONE_TIME: 'One time',
  RECURRING: 'Recurring',
};

export const noticesSendEventMap = {
  AFTER: 'After',
  BEFORE: 'Before',
  UPON: 'Upon At',
};

export const loanNoticesSendWhenMap = {
  DUE_DATE: 'Due date',
  OVERDUE: 'Overdue',
  RENEWED: 'Renewed',
};

export const requestNoticesSendWhenMap = {
  RECALL_REQUEST: 'Recall request',
  HOLD_REQUEST: 'Hold request',
  PAGING_REQUEST: 'Paging request',
  AVAILABLE: 'Available',
  HOLD_EXPIRATION: 'Hold Expiration',
  REQUEST_CANCELATION: 'Request cancellation',
};

export const noticesFormats = [
  { value: noticesFormatsMap.EMAIL, label: 'ui-circulation.settings.noticePolicy.notices.email' },
];

export const noticesFrequency = [
  { value: noticesFrequencyMap.ONE_TIME, label: 'ui-circulation.settings.noticePolicy.notices.oneTime' },
  { value: noticesFrequencyMap.RECURRING, label: 'ui-circulation.settings.noticePolicy.notices.recurring' },
];

export const noticesSendEvent = [
  { value: noticesSendEventMap.UPON, label: 'ui-circulation.settings.noticePolicy.notices.upon' },
  { value: noticesSendEventMap.BEFORE, label: 'ui-circulation.settings.noticePolicy.notices.before' },
  { value: noticesSendEventMap.AFTER, label: 'ui-circulation.settings.noticePolicy.notices.after' },
];

export const noticesIntervalPeriods = [
  { value: intervalIdsMap.MINUTES, label: 'ui-circulation.settings.noticePolicy.notices.minutes' },
  { value: intervalIdsMap.HOURS, label: 'ui-circulation.settings.noticePolicy.notices.hours' },
  { value: intervalIdsMap.DAYS, label: 'ui-circulation.settings.noticePolicy.notices.days' },
  { value: intervalIdsMap.WEEKS, label: 'ui-circulation.settings.noticePolicy.notices.weeks' },
  { value: intervalIdsMap.MONTHS, label: 'ui-circulation.settings.noticePolicy.notices.months' },
  { value: intervalIdsMap.YEARS, label: 'ui-circulation.settings.noticePolicy.notices.years' },
];

export const loanNoticesSendWhen = [
  { value: loanNoticesSendWhenMap.DUE_DATE, label: 'ui-circulation.settings.noticePolicy.loanNotices.dueDate' },
  { value: loanNoticesSendWhenMap.OVERDUE, label: 'ui-circulation.settings.noticePolicy.loanNotices.overdue' },
  { value: loanNoticesSendWhenMap.RENEWED, label: 'ui-circulation.settings.noticePolicy.loanNotices.renewed' },
];

export const requestNoticesSendWhen = [
  { value: requestNoticesSendWhenMap.RECALL_REQUEST, label: 'ui-circulation.settings.noticePolicy.requestNotices.recallRequest' },
  { value: requestNoticesSendWhenMap.HOLD_REQUEST, label: 'ui-circulation.settings.noticePolicy.requestNotices.holdRequest' },
  { value: requestNoticesSendWhenMap.PAGING_REQUEST, label: 'ui-circulation.settings.noticePolicy.requestNotices.pagingRequest' },
  { value: requestNoticesSendWhenMap.AVAILABLE, label: 'ui-circulation.settings.noticePolicy.requestNotices.available' },
  { value: requestNoticesSendWhenMap.HOLD_EXPIRATION, label: 'ui-circulation.settings.noticePolicy.requestNotices.holdExpiration' },
  { value: requestNoticesSendWhenMap.REQUEST_CANCELATION, label: 'ui-circulation.settings.noticePolicy.requestNotices.requestCancelation' },
];

export default '';
