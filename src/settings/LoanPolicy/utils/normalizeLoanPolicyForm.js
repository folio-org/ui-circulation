import {
  cloneDeep,
  forEach,
  get,
  has,
  unset,
} from 'lodash';

import LoanPolicy from '../../Models/LoanPolicy';

const removeIncorrectPeriods = (loanPolicy) => {
  const periodsList = [
    'loansPolicy.period',
    'loansPolicy.openingTimeOffset',
    'loansPolicy.gracePeriod',
    'renewalsPolicy.period',
  ];

  const isPeriodValid = new LoanPolicy(loanPolicy).isPeriodValid;

  forEach(periodsList, (path) => {
    const period = get(loanPolicy, path, {});
    if (!isPeriodValid(period)) {
      unset(loanPolicy, path);
    }
  });

  return loanPolicy;
};

const removeInactiveOpeningTimeOffset = (loanPolicy) => {
  const pathToField = 'loansPolicy.openingTimeOffset';
  const isFieldActive = new LoanPolicy(loanPolicy).isOpeningTimeOffsetActive();
  const isFieldExists = has(loanPolicy, pathToField);

  if (isFieldExists && !isFieldActive) {
    unset(loanPolicy, pathToField);
  }

  return loanPolicy;
};

const normalizeLoanPolicyForm = (loanPolicy) => {
  const loanPolicyCopy = cloneDeep(loanPolicy);

  // TODO: refactor when sections initial state will be described
  return removeIncorrectPeriods(removeInactiveOpeningTimeOffset(loanPolicyCopy));
};

export default normalizeLoanPolicyForm;
