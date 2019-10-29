import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.hacker.noun() + faker.random.uuid(),
  description: () => faker.company.catchPhrase(),
  countClosed: () => faker.random.boolean(),
  forgiveOverdueFine: () => faker.random.boolean(),
  gracePeriodRecall: () => faker.random.boolean(),
  maxOverdueFine: () => faker.random.number(),
  maxOverdueRecallFine: () => faker.random.number(),
  overdueFine: {
    quantity: () => faker.random.number(),
    intervalId: () => faker.hacker.noun(),
  },
  overdueRecallFine: {
    quantity: () => faker.random.number(),
    intervalId: () => faker.hacker.noun(),
  },
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  }
});
