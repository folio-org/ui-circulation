import { reduce } from 'lodash';

import {
  closedLoansRules,
  USER_SPECIFIC_RULE,
} from '../../../constants';

const general = (data) => {
  const userSpecificConfig = {
    [`${USER_SPECIFIC_RULE}.duration`]: {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
      shouldValidate: data.isClosingTypeIntervalSelected(USER_SPECIFIC_RULE),
    },
    [`${USER_SPECIFIC_RULE}.intervalId`]: {
      rules: ['isNotEmptySelect'],
      shouldValidate: data.isClosingTypeIntervalSelected(USER_SPECIFIC_RULE),
    },
  };

  return reduce(closedLoansRules, (config, item) => {
    const ruleConfig = {
      [`${item}.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: data.isClosingTypeIntervalSelected(item),
      },
      [`${item}.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: data.isClosingTypeIntervalSelected(item),
      },
      [`${item}Selected`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: data.isAnyClosingTypeSelected(item),
      },
    };

    return { ...config, ...ruleConfig };
  }, userSpecificConfig);
};

export default general;
