export const RULES = {
  HAS_OVERDUE_FINE_INTERVAL: 'hasOverdueFineInterval',
  HAS_OVERDUE_RECALL_FINE_INTERVAL: 'hasOverdueRecallFineInterval',
  IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO: 'isFloatGreaterThanOrEqualToZero',
  IS_GREATER_THAN_OVERDUE_FINE: 'isGreaterThanOverdueFine',
  IS_GREATER_THAN_OVERDUE_RECALL_FINE: 'isGreaterThanOverdueRecallFine',
  IS_MAXIMUM_OVERDUE_FINE_VALID: 'isMaximumOverdueFineValid',
  IS_MAXIMUM_OVERDUE_RECALL_FINE_VALID: 'isMaximumOverdueRecallFineValid',
  IS_NOT_EMPTY: 'isNotEmpty',
  IS_NOT_EMPTY_SELECT: 'isNotEmptySelect',
};

export const GENERAL_NAME_FIELD_VALIDATION_PROPS = {
  'name': {
    rules: [RULES.IS_NOT_EMPTY],
    shouldValidate: true,
  },
};
