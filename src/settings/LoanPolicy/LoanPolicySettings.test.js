import { sortBy } from 'lodash';
import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import { normalize } from './utils/normalize';
import LoanPolicySettings from './LoanPolicySettings';
import { getRecordName } from '../utils/utils';

const mockDefaultLoanPolicyReturnValue = 'mockDefaultLoanPolicyReturnValue';
const recordName = 'recordName';

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
jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

describe('LoanPolicySettings', () => {
  const labelIds = {
    paneTitle: 'ui-circulation.settings.loanPolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.loanPolicy.entryLabel',
    pageTitle: 'ui-circulation.settings.title.general',
    optionNameId: 'ui-circulation.settings.title.loanPolicies',
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
    location: {
      pathname: 'pathname',
    },
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
      const { loanPolicies, ...restResources } = testResources; // eslint-disable-line no-unused-vars
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

  it('should trigger TitleManager with correct props', () => {
    render(
      <LoanPolicySettings
        {...testDefaultProps}
      />
    );

    const expectedProps = {
      page: labelIds.pageTitle,
      record: recordName,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it('should get record name', () => {
    render(
      <LoanPolicySettings
        {...testDefaultProps}
      />
    );

    const expectedArg = {
      entryList: sortBy(testResources.loanPolicies.records, 'name'),
      location: testDefaultProps.location,
      formatMessage: expect.any(Function),
      optionNameId: labelIds.optionNameId,
    };

    expect(getRecordName).toHaveBeenCalledWith(expectedArg);
  });
});
