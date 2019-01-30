import {
  cloneDeep,
  forEach,
  get,
  unset,
  isEmpty,
} from 'lodash';

import LoanPolicy from '../../Models/LoanPolicy';
import { Period } from '../../Models/common';
import { loanProfileMap } from '../../../constants';

const checkInvalidPeriods = (policy) => {
  const loanPolicy = cloneDeep(policy);

  const periodsList = [
    'loansPolicy.period',
    'loansPolicy.openingTimeOffset',
    'loansPolicy.gracePeriod',
    'renewalsPolicy.period',
    'requestManagement.recalls.recallReturnInterval',
    'requestManagement.recalls.minLoanPeriod',
    'requestManagement.recalls.alternateGracePeriod',
    'requestManagement.holds.alternateCheckoutLoanPeriod',
    'requestManagement.holds.alternateRenewalLoanPeriod',
    'requestManagement.pages.alternateCheckoutLoanPeriod',
    'requestManagement.pages.alternateRenewalLoanPeriod',
  ];

  forEach(periodsList, (path) => {
    const period = get(loanPolicy, path);
    if (!Period.isPeriodValid(period)) {
      unset(loanPolicy, path);
    }
  });

  return loanPolicy;
};

const checkFixedProfile = (policy) => {
  const loanPolicy = cloneDeep(policy);

  if (loanPolicy.loansPolicy.profileId === loanProfileMap.FIXED) {
    unset(loanPolicy, 'loansPolicy.period');
  }

  return loanPolicy;
};

const checkUnlimitedRenewals = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isUnlimited = get(loanPolicy, 'renewalsPolicy.unlimited');

  if (isUnlimited) {
    unset(loanPolicy, 'renewalsPolicy.numberAllowed');
  }

  return loanPolicy;
};

const checkDifferentRenewalPeriod = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isDifferentPeriod = get(loanPolicy, 'renewalsPolicy.differentPeriod');

  if (!isDifferentPeriod) {
    unset(loanPolicy, 'renewalsPolicy.alternateFixedDueDateScheduleId');
    unset(loanPolicy, 'renewalsPolicy.period');
  }

  return loanPolicy;
};

const checkOpeningTimeOffset = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isFieldActive = new LoanPolicy(loanPolicy).isOpeningTimeOffsetActive();

  if (!isFieldActive) {
    unset(loanPolicy, 'loansPolicy.openingTimeOffset');
  }

  return loanPolicy;
};

const checkLoanable = (policy) => {
  const notLoanablePolicy = {
    id: policy.id,
    name: policy.name,
    description: policy.description,
    metadata: policy.metadata,
    loanable: false,
    renewable: false,
  };

  return policy.loanable ? policy : notLoanablePolicy;
};

const checkRenewable = (policy) => {
  const loanPolicy = cloneDeep(policy);

  if (!loanPolicy.renewable) {
    unset(loanPolicy, 'renewalsPolicy');
  }

  return loanPolicy;
};

const checkRequestManagementSection = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const sections = ['recalls', 'holds', 'pages'];

  forEach(sections, (sectionName) => {
    const pathToSection = `requestManagement.${sectionName}`;
    const section = get(loanPolicy, pathToSection);
    if (isEmpty(section)) {
      unset(loanPolicy, pathToSection);
    }
  });

  if (isEmpty(get(loanPolicy, 'requestManagement'))) {
    unset(loanPolicy, 'requestManagement');
  }

  return loanPolicy;
};

const filter = (entity, ...callbacks) => {
  let filteredEntity = cloneDeep(entity);

  forEach(callbacks, (callback) => {
    filteredEntity = callback(filteredEntity);
  });

  return filteredEntity;
};

export const normalize = (entity) => {
  const callbacks = [
    checkFixedProfile,
    checkOpeningTimeOffset,
    checkUnlimitedRenewals,
    checkDifferentRenewalPeriod,
    checkRenewable,
    checkLoanable,
    checkInvalidPeriods,
    checkRequestManagementSection,
  ];

  return filter(entity, ...callbacks);
};

export default normalize;
