import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.hacker.noun(),
  code: faker.hacker.abbreviation(),
});
