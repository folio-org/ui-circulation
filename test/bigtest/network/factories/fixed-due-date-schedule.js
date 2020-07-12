import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  name: () => faker.company.catchPhrase(),
  schedules: [{
    from: '2019-05-13T00:00:00.000+0000',
    to: '2019-05-18T00:00:00.000+0000',
    due: '2019-05-24T00:00:00.000+0000'
  }],
});
