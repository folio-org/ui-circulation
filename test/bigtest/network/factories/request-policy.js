import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  name: () => faker.hacker.noun() + faker.random.uuid(),
  description: () => faker.company.catchPhrase(),
  requestTypes: () => ['Hold'],
});
