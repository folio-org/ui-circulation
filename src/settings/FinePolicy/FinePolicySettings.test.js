import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import withPreventDelete from '../wrappers/withPreventDelete';
import FinePolicyDetail from './FinePolicyDetail';
import FinePolicyForm from './FinePolicyForm';
import FinePolicySettings, {
  parseInitialValues,
} from './FinePolicySettings';

import normalize from './utils/normalize';

const mockDefaultFinePolicyReturnValue = 'testReturnValue';

jest.mock('../wrappers/withPreventDelete', () => jest.fn((component) => component));
jest.mock('../Models/FinePolicy', () => ({
  defaultFinePolicy: jest.fn(() => mockDefaultFinePolicyReturnValue),
}));

describe('FinePolicySettings', () => {
  const labelIds = {
    paneTitle: 'ui-circulation.settings.finePolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.finePolicy.entryLabel',
    overdueFinesPolicies: 'ui-circulation.settings.overdue-fines-policies',
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
      };

      expect(parseInitialValues(testSchedules)).toEqual(expectedResult);
    });
  });
});
