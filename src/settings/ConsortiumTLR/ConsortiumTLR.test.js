import React from 'react';

import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';
import { TitleManager } from '@folio/stripes/core';

import ConsortiumTLR from './ConsortiumTLR';
import ConsortiumTLRForm from './ConsortiumTLRForm';

const basicProps = {
  intl: {
    formatMessage: jest.fn(),
  },
  mutator: {
    consortiumTlr: {
      PUT: jest.fn().mockResolvedValue({}),
      GET: jest.fn(),
    },
  },
  resources: {
    settings: {},
    consortiumTlr: {
      records: [
        {
          ecsTlrFeatureEnabled: false,
        }
      ],
    },
  },
  stripes: {
    hasPerm: jest.fn(() => true),
  },
};
const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  consortiumTLRTitle: 'ui-circulation.settings.title.consortiumTLR',
};
const testIds = {
  tlrForm: 'tlrForm',
};

jest.mock('./hooks', () => ({
  useCurrentTenants: jest.fn(() => ({
    tenants: [
      { id: 'tenant1', name: 'Tenant 1' },
    ],
    isLoading: false,
  })),
}));
jest.mock('./ConsortiumTLRForm', () => jest.fn(({
  onSubmit,
}) => (
  <form
    data-testid={testIds.tlrForm}
    onSubmit={onSubmit}
  />
)));

describe('ConsortiumTLR', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      sendCallout: jest.fn(),
    });

    render(
      <ConsortiumTLR
        {...basicProps}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.consortiumTLRTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it('should trigger ConsortiumTLRForm with correct props', () => {
    const expectedProps = {
      onSubmit: expect.any(Function),
      initialValues: {
        ecsTlrFeatureEnabled: false,
        excludeFromEcsRequestLendingTenantSearch: [],
      },
      isEditEnabled: true,
      tlrSettings: basicProps.resources.settings,
    };

    expect(ConsortiumTLRForm).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it('should handle data submitting', () => {
    const tlrForm = screen.getByTestId(testIds.tlrForm);

    fireEvent.submit(tlrForm);

    expect(basicProps.mutator.consortiumTlr.PUT).toHaveBeenCalled();
  });

  it('should fetch new settings after data submitting', () => {
    const tlrForm = screen.getByTestId(testIds.tlrForm);

    fireEvent.submit(tlrForm);

    expect(basicProps.mutator.consortiumTlr.GET).toHaveBeenCalled();
  });
});
