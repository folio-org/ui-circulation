import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';

import { Select } from '@folio/stripes/components';
import NoticeTemplates from './NoticeTemplates';
import {
  TITLE_LEVEL_REQUESTS,
  NOT_SELECTED,
} from '../../../constants';

describe('NoticeTemplates', () => {
  const mockedTemplates = [
    { id: 'firstTestId', name: 'First test name' },
    { id: 'secondTestId', name: 'Second test name' },
  ];
  const testIds = {
    header: 'header',
    desription: 'desription',
  };
  const labelIds = {
    header: 'ui-circulation.settings.titleLevelRequests.noticeTemplates',
    desription: 'ui-circulation.settings.titleLevelRequests.desription',
    confirmation: 'ui-circulation.settings.titleLevelRequests.confirmationNotice',
    cancellation: 'ui-circulation.settings.titleLevelRequests.cancellationNotice',
    expiration: 'ui-circulation.settings.titleLevelRequests.expirationNotice',
    defaultTemplate: 'ui-circulation.settings.titleLevelRequests.defaultTemplateValue',
  };
  const fieldTypesByOrder = [
    'confirmation',
    'cancellation',
    'expiration',
  ];

  const expectedTemplatesResult = [
    { value: NOT_SELECTED, label: labelIds.defaultTemplate },
    ...mockedTemplates.map(template => ({ value: template.id, label: template.name })),
  ];

  const getById = (id) => within(screen.getByTestId(id));
  const fieldTest = (type, index) => {
    const number = index + 1;

    it(`should execute "Field" associated with "${type}" with passed props`, () => {
      const expectedResult = {
        name: TITLE_LEVEL_REQUESTS[`${type.toUpperCase()}_TEMPLATE`],
        label: labelIds[`${type}`],
        dataOptions: expectedTemplatesResult,
        component: Select,
      };

      expect(Field).toHaveBeenNthCalledWith(number, expectedResult, {});
    });
  };

  beforeEach(() => {
    render(
      <NoticeTemplates
        templates={mockedTemplates}
      />
    );
  });

  afterEach(() => {
    Field.mockClear();
  });

  it('should render component header', () => {
    expect(getById(testIds.header).getByText(labelIds.header)).toBeVisible();
  });

  it('should render component description', () => {
    expect(getById(testIds.desription).getByText(labelIds.desription)).toBeVisible();
  });

  fieldTypesByOrder.forEach(fieldTest);
});
