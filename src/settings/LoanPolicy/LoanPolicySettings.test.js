import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import { normalize } from './utils/normalize';
import LoanPolicySettings from './LoanPolicySettings';

const mockDefaultLoanPolicyReturnValue = 'mockDefaultLoanPolicyReturnValue';

jest.mock('./LoanPolicyDetail', () => jest.fn(() => null));
jest.mock('./LoanPolicyForm', () => jest.fn(() => null));
jest.mock('../Models/LoanPolicy', () => ({
  defaultLoanPolicy: jest.fn(() => mockDefaultLoanPolicyReturnValue),
}));
jest.mock('./utils/normalize', () => jest.fn(() => null));
jest.mock('../wrappers/withPreventDelete', () => jest.fn((component) => component));
jest.mock('../../constants', () => ({
  MAX_UNPAGED_RESOURCE_COUNT: 1,
}));

describe('LoanPolicySettings', () => {
  const labelIds = {
    paneTitle: 'ui-circulation.settings.loanPolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.loanPolicy.entryLabel',
  };
  const testMutator = {
    loanPolicies: {
      POST: jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
    fixedDueDateSchedules: {
      POST: jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const testResources = {
    loanPolicies: {
      records: [{
        name: 'Pasha',
      }, {
        name: 'Zelda',
      }, {
        name: 'Alex',
      }],
    },
    fixedDueDateSchedules: {},
  };
  const testCheckPolicy = jest.fn();
  const testCloseText = 'testCloseText';
  const testLabelText = 'testLabelText';
  const testMessageText = 'testMessageText';
  const testDefaultProps = {
    checkPolicy: testCheckPolicy,
    closeText: testCloseText,
    labelText: testLabelText,
    messageText: testMessageText,
    resources: testResources,
    mutator: testMutator,
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  describe('with default props', () => {
    it('should render "EntryManager" component', () => {
      render(
        <LoanPolicySettings {...testDefaultProps} />
      );

      const expectedEntryList = [{
        name: 'Alex',
      }, {
        name: 'Pasha',
      }, {
        name: 'Zelda',
      }];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        nameKey: 'name',
        resourceKey: 'loanPolicies',
        entryList: expectedEntryList,
        isEntryInUse: testCheckPolicy,
        parentMutator: testMutator,
        permissions: {
          put: 'ui-circulation.settings.loan-policies',
          post: 'ui-circulation.settings.loan-policies',
          delete: 'ui-circulation.settings.loan-policies',
        },
        parentResources: testResources,
        prohibitItemDelete: {
          close: testCloseText,
          label: testLabelText,
          message: testMessageText,
        },
        detailComponent: LoanPolicyDetail,
        enableDetailsActionMenu: true,
        entryFormComponent: LoanPolicyForm,
        paneTitle: labelIds.paneTitle,
        entryLabel: labelIds.entryLabel,
        defaultEntry: mockDefaultLoanPolicyReturnValue,
        onBeforeSave: normalize,
      }), {});
    });

    it('should render "EntryManager" component when loanPolicies resource is not passed', () => {
      const { loanPolicies, ...restResources } = testResources;
      render(
        <LoanPolicySettings
          {...testDefaultProps}
          resources={restResources}
        />
      );

      const expectedEntryList = [];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: expectedEntryList,
      }), {});
    });

    it('should render "EntryManager" component when loanPolicies resource has no records', () => {
      render(
        <LoanPolicySettings
          {...testDefaultProps}
          resources={{
            ...testResources,
            loanPolicies: {},
          }}
        />
      );

      const expectedEntryList = [];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: expectedEntryList,
      }), {});
    });
  });
});
