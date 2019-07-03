import {
  closedLoansRules,
  closingTypesMap,
} from '../../../constants';

export default function (data) {
  return Object.values(closedLoansRules).reduce((config, item) => {
    const isClosingTypeIntervalSelected = data.closingType[item] === closingTypesMap.INTERVAL;
    const ruleConfig = {
      [`${item}.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isClosingTypeIntervalSelected,
      },
      [`${item}.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isClosingTypeIntervalSelected,
      },
    };

    return { ...config, ...ruleConfig };
  }, {});
}
