import { Factory, faker } from '@bigtest/mirage';

import { patronNoticeCategories } from '../../../../src/constants';

const categoriesIds = patronNoticeCategories.map(({ id }) => id);

export default Factory.extend({
  id: () => faker.random.uuid(),
  description: () => faker.company.catchPhrase(),
  outputFormats: () => faker.random.arrayElement(['html']),
  templateResolver: 'mustache',
  localizedTemplates: {
    en: {
      body: '<p>Example notice template</p>'
    }
  },
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  },
  subject: faker.company.catchPhrase(),
  name: faker.company.catchPhrase(),
  active:  () => faker.random.boolean(),
  category: () => faker.random.arrayElement(categoriesIds),
});
