import { closingTypesMap } from '../../../constants';

export default function (data, sectionKey) {
  return data[sectionKey].reduce((config, item, index) => {
    const section = data.closingType[sectionKey];
    const isClosingTypeIntervalSelected = section && section[index] === closingTypesMap.INTERVAL;

    const loanExceptionConfig = {
      [`${sectionKey}[${index}].paymentMethod`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: false,
      },
      [`${sectionKey}[${index}].duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isClosingTypeIntervalSelected,
      },
      [`${sectionKey}[${index}].intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isClosingTypeIntervalSelected,
      }
    };

    return { ...config, ...loanExceptionConfig };
  }, {});
}
