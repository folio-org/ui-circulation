import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import withPreventDelete from '../wrappers/withPreventDelete';
import FinePolicyDetail from './FinePolicyDetail';
import FinePolicyForm from './FinePolicyForm';
import ReminderFeesPolicy from '../Models/ReminderFeesPolicy/ReminderFeesPolicy';
import FinePolicySettings, {
  parseInitialValues,
} from './FinePolicySettings';

import normalize from './utils/normalize';
import { getRecordName } from '../utils/utils';

const mockDefaultFinePolicyReturnValue = 'testReturnValue';
const defaultReminderFeesPolicy = {
  reminderFeesPolicy: {
    ...ReminderFeesPolicy.defaultReminderFeesFields()
  },
};
const recordName = 'recordName';

jest.mock('../wrappers/withPreventDelete', () => jest.fn((component) => component));
jest.mock('../Models/FinePolicy', () => ({
  defaultFinePolicy: jest.fn(() => mockDefaultFinePolicyReturnValue),
}));
jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

describe('FinePolicySettings', () => {
  const labelIds = {
    paneTitle: 'ui-circulation.settings.finePolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.finePolicy.entryLabel',
    overdueFinesPolicies: 'ui-circulation.settings.overdue-fines-policies',
    generalTitle: 'ui-circulation.settings.title.general',
    optionNameId: 'ui-circulation.settings.title.overdueFinePolicies',
  };
  const testMutator = {
    finePolicies: {
      POST: jest.fn(),
      DELETE: jest.fn(),
      GET: jest.fn(),
    },
  };
  const testResources = {
    finePolicies: {},
    fixedDueDateSchedules: {},
    templates: {}
  };
  const testDefaultProps = {
    mutator: testMutator,
    resources: testResources,
    location: {
      pathname: 'pathname',
    },
  };
  afterEach(() => {
    withPreventDelete.mockClear();
    EntryManager.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <FinePolicySettings {...testDefaultProps} />
      );
    });

    it('should render "EntryManager" component', () => {
      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining(
        {
          defaultEntry: 'testReturnValue',
          detailComponent: FinePolicyDetail,
          enableDetailsActionMenu: true,
          entryFormComponent: FinePolicyForm,
          entryLabel: labelIds.entryLabel,
          entryList: [],
          mutator: testMutator,
          nameKey: 'name',
          onBeforeSave: normalize,
          parentMutator: testMutator,
          parentResources: {
            finePolicies: {},
            fixedDueDateSchedules: {},
            templates: {},
          },
          parseInitialValues,
          permissions: {
            delete: labelIds.overdueFinesPolicies,
            post: labelIds.overdueFinesPolicies,
            put: labelIds.overdueFinesPolicies,
          },
          resourceKey: 'finePolicies',
          resources: {
            finePolicies: {},
            fixedDueDateSchedules: {},
            templates: {},
          },
        }
      ), {});
    });

    it('should trigger TitleManager with correct props', () => {
      const expectedProps = {
        page: labelIds.generalTitle,
        record: recordName,
      };

      expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('should get record name', () => {
      const expectedArg = {
        entryList: [],
        location: testDefaultProps.location,
        formatMessage: expect.any(Function),
        optionNameId: labelIds.optionNameId,
      };

      expect(getRecordName).toHaveBeenCalledWith(expectedArg);
    });
  });

  describe('with passed policy', () => {
    it('should render "EntryManager" component', () => {
      render(
        <FinePolicySettings
          {...testDefaultProps}
          resources={{
            ...testDefaultProps.resources,
            finePolicies: {
              records: [{
                test1: 'test1',
              }, {
                test2: 'test2',
              }],
            },
          }}
        />
      );

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: [{
          test1: 'test1',
        }, {
          test2: 'test2',
        }],
      }), {});
    });
  });

  describe('normalize method', () => {
    it('should normalize data without any passed data', () => {
      const testSchedules = {
        data: 'otherData',
      };
      const expectedResult = {
        data: 'otherData',
      };

      expect(normalize(testSchedules)).toEqual(expectedResult);
    });

    it('should normalize data with passed empty data', () => {
      const testSchedules = {
        data: 'data',
        maxOverdueFine: 0,
        maxOverdueRecallFine: 0,
      };
      const expectedResult = {
        data: 'data',
        maxOverdueFine: '0.00',
        maxOverdueRecallFine: '0.00',
        overdueFine: {
          quantity: '0.00',
        },
        overdueRecallFine: {
          quantity: '0.00',
        },
        ...defaultReminderFeesPolicy
      };

      expect(parseInitialValues(testSchedules)).toEqual(expectedResult);
    });

    it('should normalize data with passed data', () => {
      const testSchedules = {
        data: 'data',
        maxOverdueFine: 10,
        maxOverdueRecallFine: 10,
        overdueFine: {
          quantity: 10,
        },
        overdueRecallFine: {
          quantity: 10,
        },
      };
      const expectedResult = {
        data: 'data',
        maxOverdueFine: '10.00',
        maxOverdueRecallFine: '10.00',
        overdueFine: {
          quantity: '10.00',
        },
        overdueRecallFine: {
          quantity: '10.00',
        },
        ...defaultReminderFeesPolicy
      };

      expect(parseInitialValues(testSchedules)).toEqual(expectedResult);
    });
  });

  describe('parseInitialValues', () => {
    it('should correctly parse initial values', () => {
      const initialValues = {
        maxOverdueFine: '100.1234',
        maxOverdueRecallFine: '200.1234',
        overdueFine: {
          quantity: '300.1234'
        },
        overdueRecallFine: {
          quantity: '400.1234'
        },
        anotherKey: 'anotherValue',
      };

      const result = parseInitialValues(initialValues);

      expect(result).toEqual({
        maxOverdueFine: '100.12',
        maxOverdueRecallFine: '200.12',
        overdueFine: {
          quantity: '300.12'
        },
        overdueRecallFine: {
          quantity: '400.12'
        },
        anotherKey: 'anotherValue',
        ...defaultReminderFeesPolicy
      });
    });
  });
});
