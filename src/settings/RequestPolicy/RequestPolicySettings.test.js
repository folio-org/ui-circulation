import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import RequestPolicySettings, {
  parseInitialValues,
} from './RequestPolicySettings';
import RequestPolicyDetail from './RequestPolicyDetail';
import RequestPolicyForm from './RequestPolicyForm';
import RequestPolicy from '../Models/RequestPolicy';
import normalize from './utils/normalize';

import {
  requestPolicyTypes,
} from '../../constants';

describe('RequestPolicySettings', () => {
  const testIds = {
    isPolicyInUse: 'isPolicyInUse',
  };
  const labelIds = {
    paneTitle: 'ui-circulation.settings.requestPolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.requestPolicy.entryLabel',
    close: 'ui-circulation.settings.common.close',
    label: 'ui-circulation.settings.requestPolicy.cannotDelete.label',
    message: 'ui-circulation.settings.requestPolicy.cannotDelete.message',
  };
  const mockedRequestPolicies = {
    records: [
      {
        name: 'Zak',
      },
      {
        name: 'John',
      },
      {
        name: 'Alex',
      },
    ],
  };
  const mockedCirculationRules = {
    records: [{
      rulesAsText: testIds.isPolicyInUse,
    }],
  };
  const mockedMutator = {
    requestPolicies: {
      POST:jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const defaultProps = {
    resources: {
      requestPolicies: mockedRequestPolicies,
      circulationRules: mockedCirculationRules,
    },
    mutator: mockedMutator,
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  it('should execute "EntryManager" with passed props', () => {
    const sortedEntyList = [
      {
        name: 'Alex',
      },
      {
        name: 'John',
      },
      {
        name: 'Zak',
      },
    ];

    render(
      <RequestPolicySettings
        {...defaultProps}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      parentMutator: mockedMutator,
      parseInitialValues,
      parentResources: defaultProps.resources,
      entryList: sortedEntyList,
      resourceKey: 'requestPolicies',
      detailComponent: RequestPolicyDetail,
      entryFormComponent: RequestPolicyForm,
      paneTitle: labelIds.paneTitle,
      entryLabel: labelIds.entryLabel,
      nameKey: 'name',
      enableDetailsActionMenu: true,
      permissions: {
        put: 'ui-circulation.settings.request-policies',
        post: 'ui-circulation.settings.request-policies',
        delete: 'ui-circulation.settings.request-policies',
      },
      onBeforeSave: normalize,
      defaultEntry: RequestPolicy.defaultPolicy(),
      prohibitItemDelete: {
        close: labelIds.close,
        label: labelIds.label,
        message: labelIds.message,
      },
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "records" in "requestPolicies"', () => {
    render(
      <RequestPolicySettings
        {...defaultProps}
        resources={{
          ...defaultProps.resources,
          requestPolicies: {},
        }}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "requestPolicies" in "resources"', () => {
    render(
      <RequestPolicySettings
        {...defaultProps}
        resources={{
          circulationRules: mockedCirculationRules,
        }}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  describe('isPolicyInUse', () => {
    beforeEach(() => {
      EntryManager.mockImplementationOnce(({ isEntryInUse }) => {
        return isEntryInUse(testIds.isPolicyInUse)
          ? <div data-testid="isPolicyInUse" />
          : null;
      });
    });

    it('should correctly process "isPolicyInUse" method when policy is included', () => {
      render(
        <RequestPolicySettings
          {...defaultProps}
        />
      );

      expect(screen.getByTestId(testIds.isPolicyInUse)).toBeInTheDocument();
    });

    it('should correctly process "isPolicyInUse" method when policy is not included', () => {
      render(
        <RequestPolicySettings
          {...defaultProps}
          resources={{
            circulationRules: {},
          }}
        />
      );

      expect(screen.queryByTestId(testIds.isPolicyInUse)).not.toBeInTheDocument();
    });
  });
});

describe('parseInitialValues', () => {
  it('should correctly process if "values" was not passed', () => {
    const expectedResult = {
      requestTypes: [
        false,
        false,
        false,
      ],
    };

    expect(parseInitialValues()).toEqual(expectedResult);
  });

  it('should correctly process passed "values" with "requestTypes"', () => {
    const mockedValues = {
      requestTypes: [requestPolicyTypes[0], requestPolicyTypes[2]],
    };
    const expectedResult = {
      ...mockedValues,
      requestTypes: [
        true,
        false,
        true,
      ],
    };

    expect(parseInitialValues(mockedValues)).toEqual(expectedResult);
  });
});
