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

export const checkInvalidPeriods = (policy) => {
  const loanPolicy = cloneDeep(policy);

  const periodsList = [
    'loansPolicy.period',
    'loansPolicy.openingTimeOffset',
    'loansPolicy.gracePeriod',
    'renewalsPolicy.period',
    'requestManagement.recalls.recallReturnInterval',
    'requestManagement.recalls.minimumGuaranteedLoanPeriod',
    'requestManagement.recalls.alternateRecallReturnInterval',
    'requestManagement.holds.alternateCheckoutLoanPeriod',
    'requestManagement.holds.alternateRenewalLoanPeriod',
  ];

  forEach(periodsList, (path) => {
    const period = get(loanPolicy, path);
    if (!Period.isPeriodValid(period)) {
      unset(loanPolicy, path);
    }
  });

  return loanPolicy;
};

export const checkFixedProfile = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const profileId = get(loanPolicy, 'loansPolicy.profileId');

  if (profileId === loanProfileMap.FIXED) {
    unset(loanPolicy, 'loansPolicy.period');
  }

  return loanPolicy;
};

export const checkUnlimitedRenewals = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isUnlimited = get(loanPolicy, 'renewalsPolicy.unlimited');

  if (isUnlimited) {
    unset(loanPolicy, 'renewalsPolicy.numberAllowed');
  }

  return loanPolicy;
};

export const checkDifferentRenewalPeriod = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isDifferentPeriod = get(loanPolicy, 'renewalsPolicy.differentPeriod');

  if (!isDifferentPeriod) {
    unset(loanPolicy, 'renewalsPolicy.alternateFixedDueDateScheduleId');
    unset(loanPolicy, 'renewalsPolicy.period');
  }

  return loanPolicy;
};

export const checkOpeningTimeOffset = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const isFieldActive = new LoanPolicy(loanPolicy).isOpeningTimeOffsetActive();
  if (!isFieldActive) {
    unset(loanPolicy, 'loansPolicy.openingTimeOffset');
  }

  return loanPolicy;
};

export const checkLoanable = (policy) => {
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

export const checkRenewable = (policy) => {
  const loanPolicy = cloneDeep(policy);

  if (!loanPolicy.renewable) {
    unset(loanPolicy, 'renewalsPolicy');
  }

  return loanPolicy;
};

export const checkRequestManagementSection = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const sections = ['recalls', 'holds'];
  const isAllowedRecalls = get(loanPolicy, 'requestManagement.recalls.allowRecallsToExtendOverdueLoans');
  const isAllowedRenewal = get(loanPolicy, 'requestManagement.holds.renewItemsWithRequest');

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

  if (!isAllowedRecalls) {
    unset(loanPolicy, 'requestManagement.recalls.alternateRecallReturnInterval');
  }

  if (!isAllowedRenewal) {
    unset(loanPolicy, 'requestManagement.holds.alternateRenewalLoanPeriod');
  }

  return loanPolicy;
};

export const checkRenewFrom = (policy) => {
  const loanPolicy = cloneDeep(policy);
  const profileId = get(loanPolicy, 'loansPolicy.profileId');
  const isProfileFixed = profileId === loanProfileMap.FIXED;

  if (isProfileFixed) {
    unset(loanPolicy, 'renewalsPolicy.renewFromId');
    unset(loanPolicy, 'renewalsPolicy.period');
  }

  return loanPolicy;
};

export const checkSchedules = (policy) => {
  const loanPolicy = cloneDeep(policy);

  const schedulesList = [
    'loansPolicy.fixedDueDateScheduleId',
    'renewalsPolicy.alternateFixedDueDateScheduleId',
  ];

  forEach(schedulesList, (path) => {
    const scheduleId = get(loanPolicy, path);

    if (isEmpty(scheduleId)) {
      unset(loanPolicy, path);
    }
  });

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
    checkRenewFrom,
    checkDifferentRenewalPeriod,
    checkRenewable,
    checkLoanable,
    checkInvalidPeriods,
    checkRequestManagementSection,
    checkSchedules,
  ];

  return filter(entity, ...callbacks);
};
