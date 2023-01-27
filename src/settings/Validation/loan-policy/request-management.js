import buildPeriodValidationConfig from './utils';

export const recalls = (loanPolicy) => {
  return {
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.recallReturnInterval'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.minimumGuaranteedLoanPeriod'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.alternateRecallReturnInterval'),
  };
};

export const holds = (loanPolicy) => {
  return {
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.holds.alternateCheckoutLoanPeriod'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.holds.alternateRenewalLoanPeriod'),
  };
};

const requests = (loanPolicy) => {
  return {
    ...recalls(loanPolicy),
    ...holds(loanPolicy),
  };
};

export default requests;
