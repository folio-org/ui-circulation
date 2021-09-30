import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { FormattedMessage } from 'react-intl';

import FinesSection, {
  getQuantityValue,
  getFormatedValue,
} from './FinesSection';

describe('FinesSection', () => {
  const getElementByTestId = (id) => within(screen.getByTestId(id));
  const overdueFineIdTitle = 'ui-circulation.settings.finePolicy.overdueFineTitle';
  const overdueFineId = 'ui-circulation.settings.finePolicy.overdueFine';
  const countClosedDHMId = 'ui-circulation.settings.finePolicy.countClosedDHM';
  const maximumOverdueFineId = 'ui-circulation.settings.finePolicy.maximumOverdueFine';
  const forgiveOverdueFineId = 'ui-circulation.settings.finePolicy.forgiveOverdueFine';
  const overdueRecallFineId = 'ui-circulation.settings.finePolicy.overdueRecallFine';
  const ignoreGracePeriodsRecallsId = 'ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls';
  const maximumRecallOverdueFineId = 'ui-circulation.settings.finePolicy.maximumRecallOverdueFine';
  const perPeriodId = 'ui-circulation.settings.finePolicy.perPeriod';
  const mockedGetCheckboxValue = jest.fn(value => value);

  describe('should render correctly with valid values', () => {
    const overdueFine = {
      quantity: 10,
      intervalId: 11,
    };
    const overdueRecallFine = {
      quantity: -1,
    };
    const mockedPolicy = {
      overdueFine,
      overdueRecallFine,
      countClosed: 1,
      maxOverdueFine: 2,
      forgiveOverdueFine: 3,
      gracePeriodRecall: 4,
      maxOverdueRecallFine: 5,
    };

    beforeEach(() => {
      render(
        <FinesSection
          policy={mockedPolicy}
          getCheckboxValue={mockedGetCheckboxValue}
          fineSectionOpen
        />
      );
    });

    afterEach(() => {
      mockedGetCheckboxValue.mockClear();
    });

    it('should render component header', () => {
      expect(screen.getByText(overdueFineIdTitle)).toBeVisible();
    });

    it('should pass "fineSectionOpen" correctly', () => {
      expect(screen.getByTestId('viewFineSectionTestId')).toHaveAttribute('open');
    });

    it('should execute "getCheckboxValue" functions 3 times', () => {
      expect(mockedGetCheckboxValue).toHaveBeenCalledTimes(3);
    });

    it('should render "overdue" section correctly', () => {
      const expectedResult = overdueFine.quantity >= 0 ? perPeriodId : '-';

      expect(getElementByTestId('sectionOverdue').getByText(overdueFineId)).toBeVisible();
      expect(getElementByTestId('sectionOverdue').getByText(expectedResult)).toBeVisible();
    });

    it('should render "count closed" section correctly', () => {
      expect(getElementByTestId('sectionCountClosed').getByText(countClosedDHMId)).toBeVisible();
      expect(getElementByTestId('sectionCountClosed').getByText(mockedPolicy.countClosed)).toBeVisible();
    });

    it('should render "max overdue" section correctly', () => {
      const expectedResult = parseFloat(mockedPolicy.maxOverdueFine || 0.00).toFixed(2);

      expect(getElementByTestId('sectionMaxOverdue').getByText(maximumOverdueFineId)).toBeVisible();
      expect(getElementByTestId('sectionMaxOverdue').getByText(expectedResult)).toBeVisible();
    });

    it('should render "forgive overdue" section correctly', () => {
      expect(getElementByTestId('sectionForgiveOverdue').getByText(forgiveOverdueFineId)).toBeVisible();
      expect(getElementByTestId('sectionForgiveOverdue').getByText(mockedPolicy.forgiveOverdueFine)).toBeVisible();
    });

    it('should render "overdue recall" section correctly', () => {
      const expectedResult = overdueRecallFine.quantity >= 0 ? perPeriodId : '-';

      expect(getElementByTestId('sectionOverdueRecall').getByText(overdueRecallFineId)).toBeVisible();
      expect(getElementByTestId('sectionOverdueRecall').getByText(expectedResult)).toBeVisible();
    });

    it('should render "grace period" section correctly', () => {
      expect(getElementByTestId('sectionGracePeriod').getByText(ignoreGracePeriodsRecallsId)).toBeVisible();
      expect(getElementByTestId('sectionGracePeriod').getByText(mockedPolicy.gracePeriodRecall)).toBeVisible();
    });

    it('should render "max overdue recall" section correctly', () => {
      const expectedResult = parseFloat(mockedPolicy.maxOverdueRecallFine || 0.00).toFixed(2);

      expect(getElementByTestId('sectionMaxOverdueRecall').getByText(maximumRecallOverdueFineId)).toBeVisible();
      expect(getElementByTestId('sectionMaxOverdueRecall').getByText(expectedResult)).toBeVisible();
    });
  });

  describe('should render correctly with invalid values', () => {
    const mockedPolicy = {
      overdueFine: {
        quantity: -1,
      },
      overdueRecallFine: {
        quantity: -1,
      },
      countClosed: 111,
      forgiveOverdueFine: 321,
      gracePeriodRecall: 404,
    };

    beforeEach(() => {
      render(
        <FinesSection
          policy={mockedPolicy}
          getCheckboxValue={mockedGetCheckboxValue}
          fineSectionOpen={false}
        />
      );
    });

    it('should pass "fineSectionOpen" correctly', () => {
      expect(screen.getByTestId('viewFineSectionTestId')).not.toHaveAttribute('open');
    });
  });

  describe('getQuantityValue', () => {
    afterEach(() => {
      FormattedMessage.mockClear();
    });

    it('should return string with period values', () => {
      const mockedFine = {
        quantity: 0,
        intervalId: 100,
      };
      const expectedResult = {
        id: perPeriodId,
        values: {
          number: parseFloat(mockedFine.quantity).toFixed(2),
          period: mockedFine.intervalId,
        },
      };

      render(getQuantityValue(mockedFine));

      expect(screen.getByText(perPeriodId)).toBeVisible();
      expect(FormattedMessage).toHaveBeenLastCalledWith(expectedResult, {});
    });

    it('should return "-" if value is incorrect', () => {
      const mockedFine = {
        quantity: -1,
      };

      render(getQuantityValue(mockedFine));

      expect(screen.getByText('-')).toBeVisible();
    });
  });

  describe('getFormatedValue', () => {
    it('should return 0.00 if value not passed', () => {
      expect(getFormatedValue()).toBe('0.00');
    });

    it('should return value without changes', () => {
      expect(getFormatedValue(5.55)).toBe('5.55');
    });

    it('should return formated value', () => {
      expect(getFormatedValue(5.5555)).toBe('5.56');
    });
  });
});
