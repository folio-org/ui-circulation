import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';
import FixedDueDateScheduleManager, {
  onBeforeSave,
} from './FixedDueDateScheduleManager';
import { getRecordName } from '../utils/utils';

const mockDefaultFixedDueDateScheduleReturnValue = 'testReturnValue';
const recordName = 'recordName';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    uniqueId: jest.fn((prefix) => `${prefix}_uniqueId`),
  };
});
jest.mock('./FixedDueDateScheduleDetail', () => jest.fn(() => null));
jest.mock('./FixedDueDateScheduleForm', () => jest.fn(() => null));
jest.mock('../Models/FixedDueDateSchedule', () => ({
  defaultFixedDueDateSchedule: jest.fn(() => mockDefaultFixedDueDateScheduleReturnValue),
}));
jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

const testIds = {
  entryManager: 'entryManager',
  deleteDisabled: 'deleteDisabled',
};
const labelIds = {
  fDDSPaneTitle: 'ui-circulation.settings.fDDS.paneTitle',
  fDDSformEntryLabel: 'ui-circulation.settings.fDDSform.entryLabel',
  fDDSDeleteDisabled: 'ui-circulation.settings.fDDS.deleteDisabled',
  generalTitle: 'ui-circulation.settings.title.general',
  optionNameId: 'ui-circulation.settings.title.fixedDueDateSchedule',
};

describe('FixedDueDateScheduleManager', () => {
  const testMutator = {
    fixedDueDateSchedules: {
      POST: jest.fn(),
      DELETE: jest.fn(),
      GET: jest.fn(),
    },
    loanPolicies: {
      GET: jest.fn(),
    },
  };
  const testResources = {
    fixedDueDateSchedules: {},
  };
  const testDefaultProps = {
    mutator: testMutator,
    resources: testResources,
    location: {
      pathname: 'pathname',
    },
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    EntryManager.mockClear();
    FixedDueDateScheduleDetail.mockClear();
    FixedDueDateScheduleForm.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <FixedDueDateScheduleManager {...testDefaultProps} />
      );
    });

    it('should render EntryManager component', () => {
      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        defaultEntry: mockDefaultFixedDueDateScheduleReturnValue,
        detailComponent: FixedDueDateScheduleDetail,
        deleteDisabledMessage: labelIds.fDDSDeleteDisabled,
        entryLabel: labelIds.fDDSformEntryLabel,
        entryList: [],
        entryFormComponent: FixedDueDateScheduleForm,
        nameKey: 'name',
        paneTitle: labelIds.fDDSPaneTitle,
        parentMutator: testMutator,
        permissions: {
          put: 'ui-circulation.settings.fixed-due-date-schedules',
          post: 'ui-circulation.settings.fixed-due-date-schedules',
          delete: 'ui-circulation.settings.fixed-due-date-schedules',
        },
        resourceKey: 'fixedDueDateSchedules',
        onBeforeSave,
      }), {});
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
        location: testDefaultProps.location,
        entryList: [],
        formatMessage: expect.any(Function),
        optionNameId: labelIds.optionNameId,
      };

      expect(getRecordName).toHaveBeenCalledWith(expectedArg);
    });
  });

  describe('when there are fixedDueDateSchedules records', () => {
    it('should render EntryManager component', () => {
      render(
        <FixedDueDateScheduleManager
          {...testDefaultProps}
          resources={{
            ...testDefaultProps.resources,
            fixedDueDateSchedules: {
              records: [{
                name: 'ccc',
              }, {
                name: 'aaa',
              }, {
                name: 'bbb',
              }],
            },
          }}
        />
      );

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: [{
          name: 'aaa',
        }, {
          name: 'bbb',
        }, {
          name: 'ccc',
        }],
      }), {});
    });
  });

  describe('deleteDisabled method', () => {
    const createDeleteDisabledMockImplementation = (schedule) => {
      EntryManager.mockImplementationOnce(({
        deleteDisabled,
      }) => (
        <div data-testid="entryManager">
          {deleteDisabled(schedule) && <div data-testid="deleteDisabled" />}
        </div>
      ));
    };

    it('should disabled delete when schedule has id which matches some loans policy id', () => {
      createDeleteDisabledMockImplementation({
        id: 10,
      });

      render(
        <FixedDueDateScheduleManager
          {...testDefaultProps}
          resources={{
            ...testDefaultProps.resources,
            loanPolicies: {
              records: [{
                loansPolicy: {
                  fixedDueDateSchedule: 10,
                },
              }],
            },
          }}
        />
      );

      expect(getById(testIds.entryManager).getByTestId(testIds.deleteDisabled)).toBeVisible();
    });

    it('should not disabled delete when schedule has id which does not match some loans policy id', () => {
      createDeleteDisabledMockImplementation({
        id: '10',
      });

      render(
        <FixedDueDateScheduleManager
          {...testDefaultProps}
          resources={{
            ...testDefaultProps.resources,
            loanPolicies: {
              records: [{
                loansPolicy: {
                  fixedDueDateSchedule: '11',
                },
              }],
            },
          }}
        />
      );

      expect(getById(testIds.entryManager).queryByTestId(testIds.deleteDisabled)).not.toBeInTheDocument();
    });

    it('should not disabled delete when loans policies are not passed', () => {
      createDeleteDisabledMockImplementation({
        id: '10',
      });

      render(
        <FixedDueDateScheduleManager
          {...testDefaultProps}
        />
      );

      expect(getById(testIds.entryManager).queryByTestId(testIds.deleteDisabled)).not.toBeInTheDocument();
    });

    it('should not disabled delete when schedule has no id', () => {
      createDeleteDisabledMockImplementation({});

      render(
        <FixedDueDateScheduleManager
          {...testDefaultProps}
          resources={{
            ...testDefaultProps.resources,
            loanPolicies: {
              records: [{
                loansPolicy: {
                  fixedDueDateSchedule: '11',
                },
              }],
            },
          }}
        />
      );

      expect(getById(testIds.entryManager).queryByTestId(testIds.deleteDisabled)).not.toBeInTheDocument();
    });
  });

  describe('onBeforeSave method', () => {
    it('should make cleanup before save', () => {
      const testSchedules = {
        schedules: [{
          key: 'testKey1',
        }, {
          key: 'testKey2',
        }],
      };
      const expectedResult = {
        schedules: [{}, {}],
      };

      expect(onBeforeSave(testSchedules)).toEqual(expectedResult);
    });
  });
});
