import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  name: () => faker.hacker.noun() + faker.random.uuid(),
  description: () => faker.company.catchPhrase(),
  requestTypes: () => ['Hold'],
});
