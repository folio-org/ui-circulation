import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.hacker.noun(),
  description: () => faker.company.catchPhrase(),
  action: () => faker.random.boolean(),
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  },
  loanNotices: [],
  requestNotices: [],
  feeFineNotices: [],
});
