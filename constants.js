
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
};

export const loanProfileMap = {
  FIXED: 'Fixed',
  ROLLING: 'Rolling',
  INDEFINITE: 'Indefinite'
};

export const CURRENT_DUE_DATE_TIME = 'CURRENT_DUE_DATE_TIME';
export const END_OF_THE_CURRENT_SERVICE_POINT_HOURS = 'END_OF_THE_CURRENT_SERVICE_POINT_HOURS';
export const BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS = 'BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS';

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

export const loanNoticesFormats = [
  { value: 'Email', label: 'Email' },
];

export const loanNoticesFrequencyMap = {
  ONE_TIME: 'One time',
  RECURRING: 'Recurring',
};

export const loanNoticesSendEventMap = {
  AFTER: 'After',
  BEFORE: 'Before',
  UPON: 'Upon At'
};

export const loanNoticesFrequency = [
  { value: loanNoticesFrequencyMap.ONE_TIME, label: loanNoticesFrequencyMap.ONE_TIME },
  { value: loanNoticesFrequencyMap.RECURRING, label: loanNoticesFrequencyMap.RECURRING },
];

export const loanNoticesSendEvent = [
  { value: loanNoticesSendEventMap.UPON, label: 'Upon/At' },
  { value: loanNoticesSendEventMap.BEFORE, label: loanNoticesSendEventMap.BEFORE },
  { value: loanNoticesSendEventMap.AFTER, label: loanNoticesSendEventMap.AFTER },
];

export const loanNoticesSendWhen = [
  { value: 'Due date', label: 'Due date' },
  { value: 'Overdue', label: 'Overdue' },
  { value: 'Renewed', label: 'Renewed' },
];

export default '';
