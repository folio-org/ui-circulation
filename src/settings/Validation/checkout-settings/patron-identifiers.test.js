import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import patronIdentifierValidator from './patron-identifiers';

describe('patronIdentifierValidator', () => {
  const labelIds = {
    selectContinue: 'ui-circulation.settings.checkout.validate.selectContinue',
  };

  it('should have the error if empty values were passed', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: [],
      },
    }, {});

    render(result.identifiers);

    expect(screen.getByText(labelIds.selectContinue)).toBeInTheDocument();
  });

  it('should have no error if "identifiers" have at least one default identifier', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: [],
        oneOfTheDefaultIdentifiers: true,
      },
    }, {});

    expect(result.identifiers).toBeUndefined();
  });

  it('should have no error if "identifiers" have at least one custom identifier', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: ['myCustomIdentifier'],
      },
    }, {});

    expect(result.identifiers).toBeUndefined();
  });

  it('should correctly process previous errors', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: [],
      },
    }, { oneOfThePreviousErrors: true });

    expect(result.oneOfThePreviousErrors).toBe(true);
  });
});
