import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import CheckoutSettingsForm, {
  getCustomFieldPatronIdentifiers,
} from './CheckoutSettingsForm';

describe('CheckoutSettingsForm', () => {
  const testIds = {
    barcode: 'barcode',
    externalSystemId: 'externalSystemId',
    identifiersId: 'id',
    username: 'username',
    userCustomFields: 'useCustomFields',
    timeout: 'timeout',
    timeoutDuration: 'timeoutDuration',
    audioAlerts: 'audioAlerts',
    audioTheme: 'audioTheme',
    wildcardLookup: 'wildcardLookup',
    otherSettingsFormSubmit: 'otherSettingsFormSubmit',
  };
  const labelIds = {
    patronIds: 'ui-circulation.settings.checkout.patronIds',
    barcode: 'ui-circulation.settings.checkout.identifiers.barcode',
    externalSystemId: 'ui-circulation.settings.checkout.identifiers.externalSystemId',
    identifiersId: 'ui-circulation.settings.checkout.identifiers.id',
    username: 'ui-circulation.settings.checkout.identifiers.username',
    userCustomFields: 'ui-circulation.settings.checkout.userCustomFields',
    timeout: 'ui-circulation.settings.checkout.checkin.timeout',
    audioAlerts: 'ui-circulation.settings.checkout.audioAlerts',
    audioTheme: 'ui-circulation.settings.checkout.audioTheme',
    wildcardLookup: 'ui-circulation.settings.checkout.wildcardLookup',
    otherSettingsFormSubmit: 'ui-circulation.settings.checkout.save',
  };
  const mockedInitialValues = {
    checkoutValues: {
      audioAlertsEnabled: false,
      audioTheme: 'classic',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 3,
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: false,
      identifiers: {
        custom: [],
        meta: {},
      },
    },
  };
  const mockedForm = {
    getState: jest.fn(() => ({ values: mockedInitialValues })),
  };
  const mockedStripes = {
    connect: jest.fn(),
  };
  const mockedHandleSubmit = jest.fn();
  const defaultProps = {
    form: mockedForm,
    handleSubmit: mockedHandleSubmit,
    pristine: true,
    submitting: false,
    stripes: mockedStripes,
  };

  beforeEach(() => {
    render(
      <CheckoutSettingsForm
        {...defaultProps}
      />
    );
  });

  afterEach(() => {
    mockedHandleSubmit.mockClear();
  });

  it('Should not return identifiers', () => {
    expect(getCustomFieldPatronIdentifiers([])).toEqual([]);
  });

  it('Should return identifiers', () => {
    const expected = [{
      entityType: 'user',
      type:'TEXTBOX_LONG',
      name: 'name',
      refId: 'refId',
    }];
    const received = [{
      label: 'name',
      value: 'customFields.refId',
    }];

    expect(getCustomFieldPatronIdentifiers(expected)).toEqual(received);
  });

  it('should have label for "patronIds" in the document', () => {
    expect(screen.getByText(labelIds.patronIds)).toBeInTheDocument();
  });

  describe('Barcode', () => {
    it('should have "barcode" in the document', () => {
      expect(screen.getByTestId(testIds.barcode)).toBeInTheDocument();
    });
    it('should have label for "barcode" in the document', () => {
      expect(screen.getByText(labelIds.barcode)).toBeInTheDocument();
    });
  });

  describe('ExternalSystemId', () => {
    it('should have "externalSystemId" in the document', () => {
      expect(screen.getByTestId(testIds.externalSystemId)).toBeInTheDocument();
    });
    it('should have label for "externalSystemId" in the document', () => {
      expect(screen.getByText(labelIds.externalSystemId)).toBeInTheDocument();
    });
  });

  describe('IdentifiersId', () => {
    it('should have "identifiersId" in the document', () => {
      expect(screen.getByTestId(testIds.identifiersId)).toBeInTheDocument();
    });
    it('should have label for "identifiersId" in the document', () => {
      expect(screen.getByText(labelIds.identifiersId)).toBeInTheDocument();
    });
  });

  describe('User name', () => {
    it('should have "username" in the document', () => {
      expect(screen.getByTestId(testIds.username)).toBeInTheDocument();
    });
    it('should have label for "username" in the document', () => {
      expect(screen.getByText(labelIds.username)).toBeInTheDocument();
    });
  });

  describe('User custom fields', () => {
    it('should have "userCustomFields" in the document', () => {
      expect(screen.getByTestId(testIds.userCustomFields)).toBeInTheDocument();
    });
    it('should have label for "userCustomFields" in the document', () => {
      expect(screen.getByText(labelIds.userCustomFields)).toBeInTheDocument();
    });
  });

  describe('Timeouts', () => {
    it('should have "timeout" in the document', () => {
      expect(screen.getByTestId(testIds.timeout)).toBeInTheDocument();
    });
    it('should have label for "timeout" in the document', () => {
      expect(screen.getByText(labelIds.timeout)).toBeInTheDocument();
    });
  });

  describe('Timeouts duration', () => {
    it('should have "timeoutDuration" in the document', () => {
      expect(screen.queryByTestId(testIds.timeoutDuration)).not.toBeInTheDocument();
    });
  });

  describe('Audio alerts', () => {
    it('should have "audioAlerts" in the document', () => {
      expect(screen.getByTestId(testIds.audioAlerts)).toBeInTheDocument();
    });
    it('should have label for "audioAlerts" in the document', () => {
      expect(screen.getByText(labelIds.audioAlerts)).toBeInTheDocument();
    });
  });

  describe('Audio theme', () => {
    it('should have "audioTheme" in the document', () => {
      expect(screen.getByTestId(testIds.audioTheme)).toBeInTheDocument();
    });
    it('should have label for "audioTheme" in the document', () => {
      expect(screen.getByText(labelIds.audioTheme)).toBeInTheDocument();
    });
  });

  describe('Wildcard lookup', () => {
    it('should have "wildcardLookup" in the document', () => {
      expect(screen.getByTestId(testIds.wildcardLookup)).toBeInTheDocument();
    });
    it('should have label for "wildcardLookup" in the document', () => {
      expect(screen.getByText(labelIds.wildcardLookup)).toBeInTheDocument();
    });
  });

  describe('Other settings form submit', () => {
    it('should have "otherSettingsFormSubmit" in the document', () => {
      expect(screen.getByTestId(testIds.otherSettingsFormSubmit)).toBeInTheDocument();
    });
    it('should have label for "otherSettingsFormSubmit" in the document', () => {
      expect(screen.getByText(labelIds.otherSettingsFormSubmit)).toBeInTheDocument();
    });
  });
});
