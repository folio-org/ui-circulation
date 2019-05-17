import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  name: () => faker.company.catchPhrase(),
  description: () => faker.company.catchPhrase(),
  requiresAdditionalInformation: false,
});
