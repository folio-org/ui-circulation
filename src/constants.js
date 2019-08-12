// These next sets are temporary Select list options for LoanPolicyDetail.js
// The idea is to eventually replace them with small, controlled vocabularies
// on the server side.
export const loanProfileTypeIdsMap = {
  FIXED: 'Fixed',
  ROLLING: 'Rolling',
};

export const loanProfileTypes = [
  {
    label: 'ui-circulation.settings.loanPolicy.profileType.fixed',
    value: loanProfileTypeIdsMap.FIXED,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.profileType.rolling',
    value: loanProfileTypeIdsMap.ROLLING,
  },
];

export const intervalIdsMap = {
  MINUTES: 'Minutes',
  HOURS: 'Hours',
  DAYS: 'Days',
  WEEKS: 'Weeks',
  MONTHS: 'Months',
  YEARS: 'Years',
};

export const intervalPeriods = [
  {
    value: intervalIdsMap.MINUTES,
    label: 'ui-circulation.settings.common.minutes',
  },
  {
    value: intervalIdsMap.HOURS,
    label: 'ui-circulation.settings.common.hours',
  },
  {
    value: intervalIdsMap.DAYS,
    label: 'ui-circulation.settings.common.days',
  },
  {
    value: intervalIdsMap.WEEKS,
    label: 'ui-circulation.settings.common.weeks',
  },
  {
    value: intervalIdsMap.MONTHS,
    label: 'ui-circulation.settings.common.months',
  },
];

export const loanProfileMap = {
  FIXED: 'Fixed',
  ROLLING: 'Rolling',
};

export const CURRENT_DUE_DATE_TIME = 'CURRENT_DUE_DATE_TIME';
export const END_OF_THE_CURRENT_SERVICE_POINT_HOURS = 'END_OF_THE_CURRENT_SERVICE_POINT_HOURS';
export const BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS = 'BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS';

export const CURRENT_DUE_DATE = 'CURRENT_DUE_DATE';
export const END_OF_THE_PREVIOUS_OPEN_DAY = 'END_OF_THE_PREVIOUS_OPEN_DAY';
export const END_OF_THE_NEXT_OPEN_DAY = 'END_OF_THE_NEXT_OPEN_DAY';

export const shortTermLoansOptions = [
  {
    label: 'ui-circulation.settings.loanPolicy.shortTermLoan.currentDueDateTime',
    id: CURRENT_DUE_DATE_TIME,
    value: CURRENT_DUE_DATE_TIME,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.shortTermLoan.endOfTheCurrentServicePointHours',
    id: END_OF_THE_CURRENT_SERVICE_POINT_HOURS,
    value: END_OF_THE_CURRENT_SERVICE_POINT_HOURS,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.shortTermLoan.beginningOhTheNextOpenServicePointHours',
    id: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
    value: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  },
];

export const longTermLoansOptions = [
  {
    label: 'ui-circulation.settings.loanPolicy.longTermLoan.currentDueDate',
    id: CURRENT_DUE_DATE,
    value: CURRENT_DUE_DATE,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.longTermLoan.endOfThePreviousOpenDay',
    id: END_OF_THE_PREVIOUS_OPEN_DAY,
    value: END_OF_THE_PREVIOUS_OPEN_DAY,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.longTermLoan.endOfTheNextOpenDay',
    id: END_OF_THE_NEXT_OPEN_DAY,
    value: END_OF_THE_NEXT_OPEN_DAY,
  },
];

export const renewFromIds = {
  CURRENT_DUE_DATE: 'CURRENT_DUE_DATE',
  SYSTEM_DATE: 'SYSTEM_DATE',
};

export const renewFromOptions = [
  {
    label: 'ui-circulation.settings.loanPolicy.renewFrom.currentDueDate',
    id: renewFromIds.CURRENT_DUE_DATE,
    value: renewFromIds.CURRENT_DUE_DATE,
  },
  {
    label: 'ui-circulation.settings.loanPolicy.renewFrom.systemDate',
    id: renewFromIds.SYSTEM_DATE,
    value: renewFromIds.SYSTEM_DATE,
  },
];

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

export const noticesFormats = [
  {
    value: noticesFormatsMap.EMAIL,
    label: 'ui-circulation.settings.noticePolicy.notices.email',
  },
];

export const noticesFrequency = [
  {
    value: noticesFrequencyMap.ONE_TIME,
    label: 'ui-circulation.settings.noticePolicy.notices.oneTime',
  },
  {
    value: noticesFrequencyMap.RECURRING,
    label: 'ui-circulation.settings.noticePolicy.notices.recurring',
  },
];

export const noticesSendEvent = [
  {
    value: noticesSendEventMap.UPON,
    label: 'ui-circulation.settings.noticePolicy.notices.upon',
  },
  {
    value: noticesSendEventMap.BEFORE,
    label: 'ui-circulation.settings.noticePolicy.notices.before',
  },
  {
    value: noticesSendEventMap.AFTER,
    label: 'ui-circulation.settings.noticePolicy.notices.after',
  },
];

export const noticesIntervalPeriods = [
  ...intervalPeriods,
  {
    value: intervalIdsMap.YEARS,
    label: 'ui-circulation.settings.common.years',
  },
];

export const loanUserInitiatedEventsIds = {
  CHECK_IN: 'Check in',
  CHECK_OUT: 'Check out',
  RENEWED: 'Renewed',
};

export const loanTimeBasedEventsIds = {
  DUE_DATE: 'Due date',
};

export const loanNoticesTriggeringEvents = [
  {
    value: loanUserInitiatedEventsIds.CHECK_IN,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.checkIn',
  },
  {
    value: loanUserInitiatedEventsIds.CHECK_OUT,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.checkOut',
  },
  {
    value: loanUserInitiatedEventsIds.RENEWED,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.renewed',
  },
  {
    value: loanTimeBasedEventsIds.DUE_DATE,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.dueDate',
  },
];

export const requestUserInitiatedEventsIds = {
  RECALL_REQUEST: 'Recall request',
  RECALL_LOANEE: 'Recall loanee',
  HOLD: 'Hold request',
  PAGE: 'Paging request',
  CANCEL: 'Request cancellation'
};

export const requestTimeBasedEventsIds = {
  HOLD_EXPIRATION: 'Hold Expiration',
};

export const requestItemStateChangeEventsIds = {
  AVAILABLE: 'Available',
};

export const requestNoticesTriggeringEvents = [
  {
    value: requestUserInitiatedEventsIds.RECALL_LOANEE,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.recallLoanee',
  },
  {
    value: requestUserInitiatedEventsIds.RECALL_REQUEST,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.recallRequest',
  },
  {
    value: requestUserInitiatedEventsIds.HOLD,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.holdRequest',
  },
  {
    value: requestUserInitiatedEventsIds.PAGE,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.pagingRequest',
  },
  {
    value: requestUserInitiatedEventsIds.CANCEL,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.requestCancelation',
  },
  {
    value: requestTimeBasedEventsIds.HOLD_EXPIRATION,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.holdExpiration',
  },
  {
    value: requestItemStateChangeEventsIds.AVAILABLE,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.available',
  },
];

export const staffSlipMap = {
  HOLD: 'Hold',
  TRANSIT: 'Transit',
};

export const patronNoticeCategoryIds = {
  LOAN: 'Loan',
  REQUEST: 'Request',
  FEE_FINE_CHARGE: 'FeeFineCharge',
  FEE_FINE_ACTION: 'FeeFineAction',
  OTHER: 'Other',
};

export const patronNoticeCategories = [
  {
    id: patronNoticeCategoryIds.LOAN,
    label: 'ui-circulation.settings.patronNotices.categories.loan',
  },
  {
    id: patronNoticeCategoryIds.REQUEST,
    label: 'ui-circulation.settings.patronNotices.categories.request',
  },
  {
    id: patronNoticeCategoryIds.FEE_FINE_CHARGE,
    label: 'ui-circulation.settings.patronNotices.categories.feeFineCharge',
  },
  {
    id: patronNoticeCategoryIds.FEE_FINE_ACTION,
    label: 'ui-circulation.settings.patronNotices.categories.feeFineAction',
  },
  {
    id: patronNoticeCategoryIds.OTHER,
    label: 'ui-circulation.settings.patronNotices.categories.other',
  },
];

export const closingTypesMap = {
  IMMEDIATELY: 'immediately',
  INTERVAL: 'interval',
  NEVER: 'never',
};

export const closingTypes = [
  {
    value: closingTypesMap.IMMEDIATELY,
    label: 'ui-circulation.settings.loanHistory.immediatelyAfterClose',
  },
  {
    value: closingTypesMap.INTERVAL,
    label: 'ui-circulation.settings.loanHistory.interval',
  },
  {
    value: closingTypesMap.NEVER,
    label: 'ui-circulation.settings.loanHistory.never',
  },
];

export const closedLoansRules = {
  DEFAULT: 'loan',
  WITH_FEES_FINES: 'feeFine',
};

export const HINT_ELEMENT_CLASS = 'CodeMirror-hint';
export const ACTIVE_HINT_ELEMENT_CLASS = `${HINT_ELEMENT_CLASS}-active`;

export const RULES_TYPE = {
  INSTITUTION: 'a',
  CAMPUS: 'b',
  LIBRARY: 'c',
  LOCATION: 's',
  PATRON_GROUP: 'g',
  MATERIAL: 'm',
  LOAN: 't',
};

export const POLICY = {
  LOAN: 'l',
  REQUEST: 'r',
  NOTICE: 'n',
};

export const LOCATION_RULES_TYPES = [
  RULES_TYPE.INSTITUTION,
  RULES_TYPE.CAMPUS,
  RULES_TYPE.LIBRARY,
  RULES_TYPE.LOCATION,
];

export default '';
