import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  name: () => 'Hold',
  description: () => faker.company.catchPhrase(),
  active: true,
  template: '<p>{{Item barcode}}</p>',
});
