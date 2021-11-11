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

export const intervalPeriodsLower = [
  {
    value: intervalIdsMap.MINUTES,
    label: 'ui-circulation.settings.lostItemFee.minutes',
  },
  {
    value: intervalIdsMap.HOURS,
    label: 'ui-circulation.settings.lostItemFee.hours',
  },
  {
    value: intervalIdsMap.DAYS,
    label: 'ui-circulation.settings.lostItemFee.days',
  },
  {
    value: intervalIdsMap.WEEKS,
    label: 'ui-circulation.settings.lostItemFee.weeks',
  },
  {
    value: intervalIdsMap.MONTHS,
    label: 'ui-circulation.settings.lostItemFee.months',
  },
];

export const anonymizingIntervals = [
  intervalIdsMap.MINUTES,
  intervalIdsMap.HOURS,
  intervalIdsMap.DAYS,
  intervalIdsMap.WEEKS,
  intervalIdsMap.MONTHS,
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

export const noticesSendEvents = [
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

export const uponAndBeforeSendEvents = [
  {
    value: noticesSendEventMap.UPON,
    label: 'ui-circulation.settings.noticePolicy.notices.upon',
  },
  {
    value: noticesSendEventMap.BEFORE,
    label: 'ui-circulation.settings.noticePolicy.notices.before',
  },
];

export const uponAndAfterSendEvents = [
  {
    value: noticesSendEventMap.UPON,
    label: 'ui-circulation.settings.noticePolicy.notices.upon',
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
  MANUAL_DUE_DATE_CHANGE: 'Manual due date change',
  ITEM_RECALLED: 'Item recalled',
};

export const loanTimeBasedEventsIds = {
  DUE_DATE: 'Due date',
  AGED_TO_LOST: 'Aged to lost',
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
  {
    value: loanUserInitiatedEventsIds.MANUAL_DUE_DATE_CHANGE,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.manualDueDateChange',
  },
  {
    value: loanUserInitiatedEventsIds.ITEM_RECALLED,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.itemRecalled',
  },
  {
    value: loanTimeBasedEventsIds.AGED_TO_LOST,
    label: 'ui-circulation.settings.noticePolicy.loanNotices.agedToLost',
  },
];

export const requestUserInitiatedEventsIds = {
  RECALL_REQUEST: 'Recall request',
  HOLD: 'Hold request',
  PAGE: 'Paging request',
  CANCEL: 'Request cancellation',
};

export const requestTimeBasedEventsIds = {
  HOLD_EXPIRATION: 'Hold expiration',
  REQUEST_EXPIRATION: 'Request expiration',
};

export const requestItemStateChangeEventsIds = {
  AVAILABLE: 'Available',
};

export const requestNoticesTriggeringEvents = [
  {
    value: requestItemStateChangeEventsIds.AVAILABLE,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.available',
  },
  {
    value: requestUserInitiatedEventsIds.PAGE,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.pagingRequest',
  },
  {
    value: requestUserInitiatedEventsIds.HOLD,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.holdRequest',
  },
  {
    value: requestUserInitiatedEventsIds.RECALL_REQUEST,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.recallRequest',
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
    value: requestTimeBasedEventsIds.REQUEST_EXPIRATION,
    label: 'ui-circulation.settings.noticePolicy.requestNotices.requestExpiration',
  },
];

export const staffSlipMap = {
  HOLD: 'Hold',
  TRANSIT: 'Transit',
  PICK_SLIP: 'Pick slip',
  REQUEST_DELIVERY: 'Request delivery',
};

export const patronNoticeCategoryIds = {
  LOAN: 'Loan',
  REQUEST: 'Request',
  FEE_FINE_CHARGE: 'FeeFineCharge',
  FEE_FINE_ACTION: 'FeeFineAction',
  AUTOMATED_FEE_FINE_CHARGE: 'AutomatedFeeFineCharge',
  AUTOMATED_FEE_FINE_ADJUSTMENT: 'AutomatedFeeFineAdjustment',
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
    id: patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
    label: 'ui-circulation.settings.patronNotices.categories.automatedFeeFineCharge',
  },
  {
    id: patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
    label: 'ui-circulation.settings.patronNotices.categories.automatedFeeFineAdjustment',
  },
  {
    id: patronNoticeCategoryIds.FEE_FINE_CHARGE,
    label: 'ui-circulation.settings.patronNotices.categories.feeFineCharge',
  },
  {
    id: patronNoticeCategoryIds.FEE_FINE_ACTION,
    label: 'ui-circulation.settings.patronNotices.categories.feeFineAction',
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
  OVERDUE_FINE: 'o',
  LOST_ITEM_FEE: 'i',
};

export const EDITOR_KEYWORD = {
  FALLBACK_POLICY: 'fallback-policy',
  PRIORITY: 'priority',
};

export const EDITOR_SPECIAL_SYMBOL = {
  HASH: '#',
  SLASH: '/',
  COMMA: ',',
  PLUS: '+',
  COLON: ':',
  NEGATION: '!',
};

export const WHITE_SPACE = ' ';

export const LOCATION_RULES_TYPES = [
  RULES_TYPE.INSTITUTION,
  RULES_TYPE.CAMPUS,
  RULES_TYPE.LIBRARY,
  RULES_TYPE.LOCATION,
];

export const timeBasedFeeFineEventsIds = {
  RETURNED: 'Overdue fine returned',
  RENEWED: 'Overdue fine renewed',
  ATL_FINE_CHARGED: 'Aged to lost - fine charged',
};

export const userInitiatedTimeBasedFeeFineEventsIds = {
  ATL_FINE_ITEM_RETURNED: 'Aged to lost & item returned - fine adjusted',
};

export const feeFineNoticesTriggeringEvents = [
  {
    value: timeBasedFeeFineEventsIds.RETURNED,
    label: 'ui-circulation.settings.noticePolicy.feeFineNotices.returned',
  },
  {
    value: timeBasedFeeFineEventsIds.RENEWED,
    label: 'ui-circulation.settings.noticePolicy.feeFineNotices.renewed',
  },
  {
    value: timeBasedFeeFineEventsIds.ATL_FINE_CHARGED,
    label: 'ui-circulation.settings.noticePolicy.feeFineNotices.atl.fineCharged',
  },
  {
    value: userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
    label: 'ui-circulation.settings.noticePolicy.feeFineNotices.atl.itemReturned',
  },
];

export const MAX_UNPAGED_RESOURCE_COUNT = '1000';

export default '';

export const DATE_FORMAT = 'YYYY/MM/DD';

export const TITLE_LEVEL_REQUESTS = {
  TLR_ENABLED: 'titleLevelRequestsFeatureEnabled',
  CREATE_TLR_BY_DEFAULT: 'createTitleLevelRequestsByDefault',
  CONFIRMATION_TEMPLATE:'confirmationPatronNoticeTemplateId',
  CANCELLATION_TEMPLATE:'cancellationPatronNoticeTemplateId',
  EXPIRATION_TEMPLATE:'expirationPatronNoticeTemplateId',
};

export const NOT_SELECTED = 'notSelected';

export const TITLE_LEVEL_REQUESTS_DEFAULT_VALUES = {
  [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: false,
  [TITLE_LEVEL_REQUESTS.CREATE_TLR_BY_DEFAULT]: false,
  [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: NOT_SELECTED,
  [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: NOT_SELECTED,
  [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: NOT_SELECTED,
};

export const MODULE_NAMES = {
  SETTINGS: 'SETTINGS',
};

export const CONFIG_NAMES = {
  TLR: 'TLR',
};

export const OPEN_REQUESTS_STATUSES = [
  'Open - Awaiting delivery',
  'Open - Awaiting pickup',
  'Open - In transit',
  'Open - Not yet filled',
];

export const REQUEST_LEVEL = {
  TITLE: 'Title',
};

export const TLR_FIELDS_FOR_RESET = [
  TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE,
  TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE,
  TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE,
];
