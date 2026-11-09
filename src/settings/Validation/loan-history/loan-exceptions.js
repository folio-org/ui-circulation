import { closingTypesMap } from '../../../constants';

const loanExceptions = (data, sectionKey) => {
  return data[sectionKey].reduce((config, item, index) => {
    const section = data.closingType[sectionKey];
    // Exceptions are disabled unless "treat differently" is enabled
    const isClosingTypeIntervalSelected = data.treatEnabled && section && section[index] === closingTypesMap.INTERVAL;

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
};

export default loanExceptions;
