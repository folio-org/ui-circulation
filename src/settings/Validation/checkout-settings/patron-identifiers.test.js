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

  it('should have no error if "identifiers" have at least one default identifier and useCustomFieldsAsIdentifiers is false', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: [],
        oneOfTheDefaultIdentifiers: true,
      },
      useCustomFieldsAsIdentifiers: false,
    }, {});

    expect(result.identifiers).toBeUndefined();
  });

  it('should have error if useCustomFieldsAsIdentifiers is true but no custom identifiers selected, even if default identifiers are checked', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: [],
        oneOfTheDefaultIdentifiers: true,
      },
      useCustomFieldsAsIdentifiers: true,
    }, {});

    render(result.identifiers);

    expect(screen.getByText(labelIds.selectContinue)).toBeInTheDocument();
  });

  it('should have no error if useCustomFieldsAsIdentifiers is true and custom identifiers selected along with default identifiers', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: ['myCustomIdentifier'],
        oneOfTheDefaultIdentifiers: true,
      },
      useCustomFieldsAsIdentifiers: true,
    }, {});

    expect(result.identifiers).toBeUndefined();
  });

  it('should have no error if "identifiers" have at least one custom identifier and useCustomFieldsAsIdentifiers is true', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: ['myCustomIdentifier'],
      },
      useCustomFieldsAsIdentifiers: true,
    }, {});

    expect(result.identifiers).toBeUndefined();
  });

  it('should have error if "identifiers" have custom identifiers but useCustomFieldsAsIdentifiers is false', () => {
    const result = patronIdentifierValidator({
      identifiers: {
        custom: ['myCustomIdentifier'],
      },
      useCustomFieldsAsIdentifiers: false,
    }, {});

    render(result.identifiers);

    expect(screen.getByText(labelIds.selectContinue)).toBeInTheDocument();
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
