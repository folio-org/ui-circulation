import {
  GENERAL_NAME_FIELD_VALIDATION_PROPS,
  RULES,
} from '../../../constants/Validation/general';
import { PATH } from '../../../constants/Validation/fine-policy';

export default function (finePolicy) {
  return {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    [PATH.OVERDUE_FINE_QUANTITY]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.HAS_OVERDUE_FINE_INTERVAL],
      shouldValidate: finePolicy.isIntervalSelected(PATH.OVERDUE_FINE_INTERVAL_ID) || finePolicy.hasNonZeroValue(PATH.OVERDUE_FINE_QUANTITY),
    },
    [PATH.OVERDUE_FINE_INTERVAL_ID]: {
      rules: [RULES.IS_NOT_EMPTY_SELECT],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    [PATH.OVERDUE_RECALL_FINE_QUANTITY]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.HAS_OVERDUE_RECALL_FINE_INTERVAL],
      shouldValidate: finePolicy.isIntervalSelected(PATH.OVERDUE_RECALL_FINE_INTERVAL_ID) || finePolicy.hasNonZeroValue(PATH.OVERDUE_RECALL_FINE_QUANTITY),
    },
    [PATH.OVERDUE_RECALL_FINE_INTERVAL_ID]: {
      rules: [RULES.IS_NOT_EMPTY_SELECT],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    [PATH.MAX_OVERDUE_FINE]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.IS_GREATER_THAN_OVERDUE_FINE, RULES.IS_MAXIMUM_OVERDUE_FINE_VALID],
      shouldValidate: finePolicy.isOverdueFine() || finePolicy.hasNonZeroValue(PATH.MAX_OVERDUE_FINE),
    },
    [PATH.MAX_OVERDUE_RECALL_FINE]: {
      rules: [RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO, RULES.IS_GREATER_THAN_OVERDUE_RECALL_FINE, RULES.IS_MAXIMUM_OVERDUE_RECALL_FINE_VALID],
      shouldValidate: finePolicy.isOverdueRecallFine() || finePolicy.hasNonZeroValue(PATH.MAX_OVERDUE_RECALL_FINE),
    },
  };
}
