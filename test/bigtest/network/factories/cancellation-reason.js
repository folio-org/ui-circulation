import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  name: () => faker.company.catchPhrase(),
  description: () => faker.company.catchPhrase(),
  requiresAdditionalInformation: false,
});
