import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.hacker.noun() + faker.random.uuid(),
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
