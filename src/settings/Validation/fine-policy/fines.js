import {
  GENERAL_NAME_FIELD_VALIDATION_PROPS,
  RULES,
} from '../../../constants/Validation/general';
import { FINE_POLICY_PATH } from '../../../constants/Validation/fine-policy';

const fines = (finePolicy) => {
  return {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    [FINE_POLICY_PATH.OVERDUE_FINE_QUANTITY]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.HAS_OVERDUE_FINE_INTERVAL],
      shouldValidate: finePolicy.isIntervalSelected(FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID) || finePolicy.hasNonZeroValue(FINE_POLICY_PATH.OVERDUE_FINE_QUANTITY),
    },
    [FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID]: {
      rules: [RULES.IS_NOT_EMPTY_SELECT],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    [FINE_POLICY_PATH.OVERDUE_RECALL_FINE_QUANTITY]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.HAS_OVERDUE_RECALL_FINE_INTERVAL],
      shouldValidate: finePolicy.isIntervalSelected(FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID) || finePolicy.hasNonZeroValue(FINE_POLICY_PATH.OVERDUE_RECALL_FINE_QUANTITY),
    },
    [FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID]: {
      rules: [RULES.IS_NOT_EMPTY_SELECT],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    [FINE_POLICY_PATH.MAX_OVERDUE_FINE]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.IS_GREATER_THAN_OVERDUE_FINE, RULES.IS_MAXIMUM_OVERDUE_FINE_VALID],
      shouldValidate: finePolicy.isOverdueFine() || finePolicy.hasNonZeroValue(FINE_POLICY_PATH.MAX_OVERDUE_FINE),
    },
    [FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.IS_GREATER_THAN_OVERDUE_RECALL_FINE, RULES.IS_MAXIMUM_OVERDUE_RECALL_FINE_VALID],
      shouldValidate: finePolicy.isOverdueRecallFine() || finePolicy.hasNonZeroValue(FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE),
    },
  };
};

export default fines;
