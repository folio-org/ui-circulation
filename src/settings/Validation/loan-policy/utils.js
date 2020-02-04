const buildPeriodValidationConfig = (loanPolicy, path) => {
  return {
    [`${path}.duration`]: {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue(`${path}.duration`) || loanPolicy.isIntervalSelected(`${path}.intervalId`),
    },
    [`${path}.intervalId`]: {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.hasValue(`${path}.duration`),
    },
  };
};

export default buildPeriodValidationConfig;
