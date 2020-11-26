import buildPeriodValidationConfig from './utils';

const recalls = (loanPolicy) => {
  return {
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.recallReturnInterval'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.minimumGuaranteedLoanPeriod'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.recalls.alternateRecallReturnInterval'),
  };
};

const holds = (loanPolicy) => {
  return {
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.holds.alternateCheckoutLoanPeriod'),
    ...buildPeriodValidationConfig(loanPolicy, 'requestManagement.holds.alternateRenewalLoanPeriod'),
  };
};

export default function (loanPolicy) {
  return {
    ...recalls(loanPolicy),
    ...holds(loanPolicy),
  };
}
