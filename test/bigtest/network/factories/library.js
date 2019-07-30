
import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.hacker.noun(),
  code: faker.hacker.abbreviation,
});
