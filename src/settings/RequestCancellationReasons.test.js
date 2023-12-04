import { render } from '@folio/jest-config-stripes/testing-library/react';

import { ControlledVocab } from '@folio/stripes/smart-components';

import RequestCancellationReasons from './RequestCancellationReasons';

describe('RequestCancellationReasons', () => {
  const props = {
    resources: {},
  };

  beforeEach(() => {
    render(<RequestCancellationReasons {...props} />);
  });

  it('should pass correct props', () => {
    const expectedResult = {
      ...props,
      baseUrl: 'cancellation-reason-storage/cancellation-reasons',
      records: 'cancellationReasons',
      label: expect.any(Object),
      translations: {
        cannotDeleteTermHeader: 'ui-circulation.settings.cancelReasons.cannotDeleteTermHeader',
        cannotDeleteTermMessage: 'ui-circulation.settings.cancelReasons.cannotDeleteTermMessage',
        deleteEntry: 'ui-circulation.settings.cancelReasons.deleteEntry',
        termDeleted: 'ui-circulation.settings.cancelReasons.termDeleted',
        termWillBeDeleted: 'ui-circulation.settings.cancelReasons.termWillBeDeleted',
      },
      objectLabel: '',
      visibleFields: ['name', 'description', 'publicDescription'],
      hiddenFields: ['lastUpdated', 'numberOfObjects'],
      columnMapping: expect.any(Object),
      actionSuppressor: expect.any(Object),
      nameKey: 'name',
      id: 'request-cancellation-reasons',
      sortby: 'name',
    };

    expect(ControlledVocab).toHaveBeenCalledWith(expect.objectContaining(expectedResult), {});
  });
});
