import {
  Factory,
  faker,
} from '@bigtest/mirage';

import { // eslint-disable-line import/no-extraneous-dependencies
  intervalPeriodsLower,
} from '@folio/circulation/src/constants'; // eslint-disable-line  import/no-unresolved

export const getPeriod = {
  duration: () => faker.random.number(),
  intervalId: () => faker.random.arrayElement(intervalPeriodsLower).value,
};

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.hacker.noun() + faker.random.uuid(),
  description: () => faker.company.catchPhrase(),
  itemAgedLostOverdue: getPeriod,
  patronBilledAfterAgedLost: getPeriod,
  chargeAmountItem: {
    chargeType:  () => faker.random.arrayElement(['actualCost', 'anotherCost']),
    amount: () => faker.random.number(),
  },
  lostItemProcessingFee: () => faker.random.number(),
  chargeAmountItemPatron: () => faker.random.boolean(),
  chargeAmountItemSystem: () => faker.random.boolean(),
  lostItemChargeFeeFine: getPeriod,
  returnedLostItemProcessingFee: () => faker.random.boolean(),
  replacedLostItemProcessingFee: () => faker.random.boolean(),
  replacementProcessingFee: () => faker.random.number(),
  replacementAllowed: () => faker.random.boolean(),
  lostItemReturned: {
    name: () => faker.random.arrayElement(['Charge', 'Remove']),
  },
  feesFinesShallRefunded: getPeriod,
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  }
});
