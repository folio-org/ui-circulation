import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import LostItemFeePolicySettings, {
  parseInitialValues,
} from './LostItemFeePolicySettings';
import LostItemFeePolicyDetail from './LostItemFeePolicyDetail';
import LostItemFeePolicyForm from './LostItemFeePolicyForm';
import LostItemFeePolicy from '../Models/LostItemFeePolicy';

import normalize from './utils/normalize';

jest.mock('../wrappers/withPreventDelete', () => jest.fn(component => component));

describe('LostItemFeePolicySettings', () => {
  const labelIds = {
    paneTitle: 'ui-circulation.settings.lostItemFee.paneTitle',
    entryLabel: 'ui-circulation.settings.lostItemFee.entryLabel',
  };
  const mockedCheckPolicy = jest.fn();
  const mockedCloseText = 'closeText';
  const mockedLabelText = 'labelText';
  const mockedMessageText = 'messageText';
  const mockedLostItemFeePolicies = {
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
  const mockedMutator = {
    lostItemFeePolicies: {
      POST:jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const defaultProps = {
    checkPolicy: mockedCheckPolicy,
    closeText: mockedCloseText,
    labelText: mockedLabelText,
    messageText: mockedMessageText,
    resources: {
      lostItemFeePolicies: mockedLostItemFeePolicies,
    },
    mutator: mockedMutator,
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  it('should execute "EntryManager" with passed props', () => {
    const expectedNameOrder = [
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
      <LostItemFeePolicySettings
        {...defaultProps}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      nameKey: 'name',
      resourceKey: 'lostItemFeePolicies',
      entryList: expectedNameOrder,
      isEntryInUse: mockedCheckPolicy,
      parentMutator: mockedMutator,
      permissions: {
        put: 'ui-circulation.settings.lost-item-fees-policies',
        post: 'ui-circulation.settings.lost-item-fees-policies',
        delete: 'ui-circulation.settings.lost-item-fees-policies',
      },
      parseInitialValues,
      parentResources: defaultProps.resources,
      prohibitItemDelete: {
        close: mockedCloseText,
        label: mockedLabelText,
        message: mockedMessageText,
      },
      detailComponent: LostItemFeePolicyDetail,
      enableDetailsActionMenu: true,
      entryFormComponent: LostItemFeePolicyForm,
      paneTitle: labelIds.paneTitle,
      entryLabel: labelIds.entryLabel,
      defaultEntry: LostItemFeePolicy.defaultLostItemFeePolicy(),
      onBeforeSave: normalize,
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "records" in "lostItemFeePolicies"', () => {
    render(
      <LostItemFeePolicySettings
        {...defaultProps}
        resources={{
          lostItemFeePolicies: {},
        }}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "lostItemFeePolicies" in "resources"', () => {
    render(
      <LostItemFeePolicySettings
        {...defaultProps}
        resources={{}}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });
});

describe('parseInitialValues', () => {
  it('should correctly process boolean values in "policy"', () => {
    const testPolicy = {
      booleanKey: false,
      nonBooleanKey: null,
    };
    const expectedResult = {
      booleanKey: 'false',
      nonBooleanKey: null,
    };

    expect(parseInitialValues(testPolicy)).toEqual(expectedResult);
  });

  it('should correctly process "lostItemProcessingFee" key in "policy"', () => {
    const testNumber = 10;
    const testPolicy = {
      lostItemProcessingFee: testNumber,
    };
    const expectedResult = {
      lostItemProcessingFee: testNumber.toFixed(2),
    };

    expect(parseInitialValues(testPolicy)).toEqual(expectedResult);
  });

  it('should correctly process "replacementProcessingFee" key in "policy"', () => {
    const testNumber = 10;
    const testPolicy = {
      replacementProcessingFee: testNumber,
    };
    const expectedResult = {
      replacementProcessingFee: testNumber.toFixed(2),
    };

    expect(parseInitialValues(testPolicy)).toEqual(expectedResult);
  });

  it('should correctly process "chargeAmountItem" key in "policy" if "amount" and "chargeType" are present', () => {
    const testNumber = 10;
    const testType = 'testType';
    const testPolicy = {
      chargeAmountItem: {
        amount: testNumber,
        chargeType: testType,
      },
    };
    const expectedResult = {
      chargeAmountItem: {
        amount: testNumber.toFixed(2),
        chargeType: testType,
      },
    };

    expect(parseInitialValues(testPolicy)).toEqual(expectedResult);
  });

  it('should correctly process "chargeAmountItem" key in "policy" if "amount" and "chargeType" are absent', () => {
    const testPolicy = {
      chargeAmountItem: {},
    };
    const expectedResult = {
      chargeAmountItem: {
        amount: '0.00',
        chargeType: '',
      },
    };

    expect(parseInitialValues(testPolicy)).toEqual(expectedResult);
  });

  it('should correctly process if policy is not passed', () => {
    expect(parseInitialValues()).toEqual({});
  });
});
