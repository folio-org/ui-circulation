import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  name: () => faker.company.catchPhrase(),
  schedules: [{
    from: '2019-05-13T04:00:00.000+00:00',
    to: '2019-05-18T03:59:59.000+00:00',
    due: '2019-05-24T03:59:59.000+00:00'
  }],
});
