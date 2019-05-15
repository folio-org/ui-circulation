import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  name: () => 'Hold',
  description: () => faker.company.catchPhrase(),
  active: true,
  template: '<p>{{Item barcode}}</p>',
});
