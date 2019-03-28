/* import {
  intervalIdsMap,
  loanProfileMap,
  renewFromIds,
  END_OF_THE_NEXT_OPEN_DAY,
} from '../../../../constants'; */

export default {
  loanable: true,
  renewable: true,
  /* loansPolicy: {
    profileId: loanProfileMap.ROLLING,
    closedLibraryDueDateManagementId: END_OF_THE_NEXT_OPEN_DAY,
    period: { intervalId: intervalIdsMap.DAYS },
    openingTimeOffset: { intervalId: intervalIdsMap.HOURS },
    gracePeriod: { intervalId: intervalIdsMap.HOURS }
  },
  renewalsPolicy: {
    unlimited: false,
    differentPeriod: false,
    renewFromId: renewFromIds.SYSTEM_DATE,
    period: { intervalId: intervalIdsMap.DAYS }
  },
  requestManagement: {
    recalls: {
      recallReturnInterval: { intervalId: intervalIdsMap.DAYS },
      minimumGuaranteedLoanPeriod: { intervalId: intervalIdsMap.DAYS },
    },
    holds: {
      alternateCheckoutLoanPeriod: { intervalId: intervalIdsMap.DAYS },
      alternateRenewalLoanPeriod: { intervalId: intervalIdsMap.DAYS },
    },
  }, */
};
