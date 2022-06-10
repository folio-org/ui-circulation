import { reduce } from 'lodash';

import { closedLoansRules } from '../../../constants';

const general = (data) => {
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
  }, {});
};

export default general;
