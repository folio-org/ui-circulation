import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import LoansSection from './LoansSection';
import {
  loanProfileTypes,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../../../../../constants';

describe('LoansSection', () => {
  const labelIds = {
    loansLabelId: 'ui-circulation.settings.loanPolicy.loans',
    loanableLabelId: 'ui-circulation.settings.loanPolicy.loanable',
    loanProfileLabelId: 'ui-circulation.settings.loanPolicy.loanProfile',
    periodLabelId: 'ui-circulation.settings.loanPolicy.loanPeriod',
    closedDueDateLabelId: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt',
    openingTimeOffsetLabelId: 'ui-circulation.settings.loanPolicy.openingTimeOffset',
    gracePeriodLabelId: 'ui-circulation.settings.loanPolicy.gracePeriod',
    itemLimitLabelId: 'ui-circulation.settings.loanPolicy.itemLimit',
    fDDSlimitLabelId: 'ui-circulation.settings.loanPolicy.fDDSlimit',
    fDDSLabelId: 'ui-circulation.settings.loanPolicy.fDDS',
  };

  const mockedFunction = jest.fn((id) => `${id}-processed`);
  const mockedGetDropdownValue = jest.fn((id) => id);

  const getById = (id) => within(screen.getByTestId(id));
  const sectionTest = (section, loansPolicy = true) => {
    it(`should render "${section}" section correctly`, () => {
      expect(getById(`${section}TestId`).getByText(labelIds[`${section}LabelId`])).toBeVisible();
      expect(getById(`${section}TestId`).getByText(loansPolicy ? `loansPolicy.${section}-processed` : `${section}-processed`)).toBeVisible();
    });
  };

  const defaultMockedProps = {
    policy: {},
    getPeriodValue: mockedFunction,
    getDropdownValue: mockedGetDropdownValue,
    getScheduleValue: mockedFunction,
    getCheckboxValue: mockedFunction,
    getValue: mockedFunction,
  };

  const defaultMockedPolicy = {
    loanable: true,
    isProfileRolling: jest.fn(() => false),
    isProfileFixed: jest.fn(() => false),
    isOpeningTimeOffsetActive: jest.fn(() => false),
  };

  describe('when "policy.loanable" is absent', () => {
    beforeEach(() => {
      render(
        <LoansSection
          {...defaultMockedProps}
        />
      );
    });

    it('should render "loans" section correctly', () => {
      expect(getById('loansTestId').getByText(labelIds.loansLabelId)).toBeVisible();
    });

    sectionTest('loanable', false);
  });

  describe('when "policy.loanable" is present', () => {
    describe('when functions in props returns truthy values', () => {
      const mockedPolicy = {
        ...defaultMockedPolicy,
        isProfileRolling: jest.fn(() => true),
        isOpeningTimeOffsetActive: jest.fn(() => true),
      };

      beforeEach(() => {
        render(
          <LoansSection
            {...defaultMockedProps}
            policy={mockedPolicy}
          />
        );
      });

      it('should render "loans" section correctly', () => {
        expect(getById('loansTestId').getByText(labelIds.loansLabelId)).toBeVisible();
      });

      it('should render "profile" section correctly', () => {
        const labelId = 'loansPolicy.profileId';

        expect(getById('loanProfileTestId').getByText(labelIds.loanProfileLabelId)).toBeVisible();
        expect(getById('loanProfileTestId').getByText(labelId)).toBeVisible();
        expect(mockedGetDropdownValue).toHaveBeenNthCalledWith(1, labelId, loanProfileTypes);
      });

      sectionTest('period');

      it('should render "schedule" section correctly', () => {
        expect(getById('scheduleTestId').getByText(labelIds.fDDSlimitLabelId)).toBeVisible();
        expect(getById('scheduleTestId').getByText('loansPolicy.fixedDueDateScheduleId-processed')).toBeVisible();
      });

      it('should render "closed due date" section correctly', () => {
        const expectedResult = [
          ...shortTermLoansOptions,
          ...longTermLoansOptions,
        ];
        const labelId = 'loansPolicy.closedLibraryDueDateManagementId';

        expect(getById('closedDueDateTestId').getByText(labelIds.closedDueDateLabelId)).toBeVisible();
        expect(getById('closedDueDateTestId').getByText(labelId)).toBeVisible();
        expect(mockedGetDropdownValue).toHaveBeenNthCalledWith(2, labelId, expectedResult);
      });

      sectionTest('openingTimeOffset');

      sectionTest('gracePeriod');

      sectionTest('itemLimit');
    });

    describe('when functions in props returns falsy values', () => {
      const sectionIsNotRenderedTest = (section) => {
        it(`should not render "${section}" section`, () => {
          expect(screen.queryByTestId(`${section}TestId`)).not.toBeInTheDocument();
        });
      };

      beforeEach(() => {
        render(
          <LoansSection
            {...defaultMockedProps}
            policy={defaultMockedPolicy}
            getValue={jest.fn()}
          />
        );
      });

      sectionIsNotRenderedTest('period');

      sectionIsNotRenderedTest('schedule');

      sectionIsNotRenderedTest('openingTimeOffset');

      it('should render "item limit" section correctly', () => {
        expect(getById('itemLimitTestId').getByText(labelIds.itemLimitLabelId)).toBeVisible();
        expect(getById('itemLimitTestId').getByText('-')).toBeVisible();
      });
    });

    describe('when "isProfileFixed" is true and "isProfileRolling" is false', () => {
      const mockedPolicy = {
        ...defaultMockedPolicy,
        isProfileFixed: jest.fn(() => true),
      };

      beforeEach(() => {
        render(
          <LoansSection
            {...defaultMockedProps}
            policy={mockedPolicy}
          />
        );
      });

      it('should render "schedule" section correctly', () => {
        expect(getById('scheduleTestId').getByText(labelIds.fDDSLabelId)).toBeVisible();
        expect(getById('scheduleTestId').getByText('loansPolicy.fixedDueDateScheduleId-processed')).toBeVisible();
      });
    });
  });
});
