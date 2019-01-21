import checkPeriod from '../utils';

const recalls = (model) => {
  const recallReturnInterval = checkPeriod(model, 'requestManagement.recalls.recallReturnInterval');
  const minLoanPeriod = checkPeriod(model, 'requestManagement.recalls.minLoanPeriod');
  const alternateGracePeriod = checkPeriod(model, 'requestManagement.recalls.alternateGracePeriod');

  return {
    'requestManagement.recalls.recallReturnInterval.duration': {
      rules: ['isPositiveNumber'],
      shouldValidate: recallReturnInterval.duration || recallReturnInterval.intervalId,
    },
    'requestManagement.recalls.recallReturnInterval.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: recallReturnInterval.duration,
    },
    'requestManagement.recalls.minLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: minLoanPeriod.duration || minLoanPeriod.intervalId,
    },
    'requestManagement.recalls.minLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: minLoanPeriod.duration,
    },
    'requestManagement.recalls.alternateGracePeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: alternateGracePeriod.duration || alternateGracePeriod.intervalId,
    },
    'requestManagement.recalls.alternateGracePeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: alternateGracePeriod.duration,
    },
  };
};

const holds = (model) => {
  const alternateRenewalLoanPeriod = checkPeriod(model, 'requestManagement.holds.alternateCheckoutLoanPeriod');
  const alternateCheckoutLoanPeriod = checkPeriod(model, 'requestManagement.holds.alternateCheckoutLoanPeriod');

  return {
    'requestManagement.holds.alternateCheckoutLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: alternateCheckoutLoanPeriod.duration || alternateCheckoutLoanPeriod.intervalId,
    },
    'requestManagement.holds.alternateCheckoutLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: alternateCheckoutLoanPeriod.duration,
    },
    'requestManagement.holds.alternateRenewalLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: alternateRenewalLoanPeriod.duration || alternateRenewalLoanPeriod.intervalId,
    },
    'requestManagement.holds.alternateRenewalLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: alternateRenewalLoanPeriod.duration,
    },
  };
};

const pages = (model) => {
  const alternateCheckoutLoanPeriod = checkPeriod(model, 'requestManagement.pages.alternateCheckoutLoanPeriod');
  const alternateRenewalLoanPeriod = checkPeriod(model, 'requestManagement.pages.alternateRenewalLoanPeriod');

  return {
    'requestManagement.pages.alternateCheckoutLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: alternateCheckoutLoanPeriod.duration || alternateCheckoutLoanPeriod.intervalId,
    },
    'requestManagement.pages.alternateCheckoutLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: alternateCheckoutLoanPeriod.duration,
    },
    'requestManagement.pages.alternateRenewalLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: alternateRenewalLoanPeriod.duration || alternateRenewalLoanPeriod.intervalId,
    },
    'requestManagement.pages.alternateRenewalLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: alternateRenewalLoanPeriod.duration,
    },
  };
};

export default function (model) {
  return {
    ...recalls(model),
    ...holds(model),
    ...pages(model),
  };
}
