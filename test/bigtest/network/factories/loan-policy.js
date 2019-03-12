import {
  Factory,
  faker,
} from '@bigtest/mirage';

import { // eslint-disable-line import/no-extraneous-dependencies
  intervalIdsMap,
  loanProfileMap,
  renewFromOptions,
  longTermLoansOptions,
} from '@folio/circulation/src/constants'; // eslint-disable-line  import/no-unresolved


export const getPeriod = {
  duration: () => faker.random.number(),
  intervalId: () => faker.random.arrayElement(Object.values(intervalIdsMap)),
};

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.company.catchPhrase(),
  description: () => faker.company.catchPhrase(),
  loanable: () => faker.random.boolean(),
  loansPolicy: {
    profileId: () => faker.random.arrayElement(Object.values(loanProfileMap)),
    period: getPeriod,
    closedLibraryDueDateManagementId: () => faker.random.arrayElement(
      longTermLoansOptions.map((element) => element.id)
    ),
    gracePeriod: getPeriod,
    openingTimeOffset: getPeriod,
  },
  renewable: () => faker.random.boolean(),
  renewalsPolicy: {
    unlimited: () => faker.random.boolean(),
    numberAllowed: () => faker.random.number(),
    renewFromId: () => faker.random.arrayElement(
      renewFromOptions.map((element) => element.value)
    ),
    differentPeriod: () => faker.random.boolean(),
    period: getPeriod,
  },
  requestManagement: {
    recalls: {
      recallReturnInterval: getPeriod,
      minimumGuaranteedLoanPeriod: getPeriod,
    },
    holds: {
      alternateCheckoutLoanPeriod: getPeriod,
      renewItemsWithRequest: () => faker.random.boolean(),
      alternateRenewalLoanPeriod: getPeriod,
    },
  },
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  }
});
