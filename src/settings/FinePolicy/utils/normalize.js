import {
  isEmpty,
  isUndefined,
  cloneDeep,
} from 'lodash';

export const isZeroOrBlank = (period) => {
  const isZero = !isUndefined(period) && Number(period.quantity) === 0;
  const isBlank = !isUndefined(period) && isEmpty(period.quantity);

  return isZero || isBlank;
};

export default (policy) => {
  const finePolicy = cloneDeep(policy);

  if (isZeroOrBlank(finePolicy.overdueFine)) {
    delete finePolicy.overdueFine;
  }

  if (isZeroOrBlank(finePolicy.overdueRecallFine)) {
    delete finePolicy.overdueRecallFine;
  }

  return finePolicy;
};
