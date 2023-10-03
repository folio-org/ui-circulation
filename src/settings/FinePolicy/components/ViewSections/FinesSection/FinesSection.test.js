import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { FormattedMessage } from 'react-intl';

import FinesSection, {
  getQuantityValue,
  getFormatedValue,
} from './FinesSection';

const testIds = {
  viewFineSectionTestId: 'viewFineSectionTestId',
  sectionOverdue: 'sectionOverdue',
  sectionCountClosed: 'sectionCountClosed',
  sectionMaxOverdue: 'sectionMaxOverdue',
  sectionForgiveOverdue: 'sectionForgiveOverdue',
  sectionOverdueRecall: 'sectionOverdueRecall',
  sectionGracePeriod: 'sectionGracePeriod',
  sectionMaxOverdueRecall: 'sectionMaxOverdueRecall',
};
const labelIds = {
  overdueFineIdTitle: 'ui-circulation.settings.finePolicy.overdueFineTitle',
  overdueFineId: 'ui-circulation.settings.finePolicy.overdueFine',
  countClosedDHMId: 'ui-circulation.settings.finePolicy.countClosedDHM',
  maximumOverdueFineId: 'ui-circulation.settings.finePolicy.maximumOverdueFine',
  forgiveOverdueFineId: 'ui-circulation.settings.finePolicy.forgiveOverdueFine',
  overdueRecallFineId: 'ui-circulation.settings.finePolicy.overdueRecallFine',
  ignoreGracePeriodsRecallsId: 'ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls',
  maximumRecallOverdueFineId: 'ui-circulation.settings.finePolicy.maximumRecallOverdueFine',
  perPeriodId: 'ui-circulation.settings.finePolicy.perPeriod',
};

describe('FinesSection', () => {
  const getElementByTestId = (id) => within(screen.getByTestId(id));
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
      expect(screen.getByText(labelIds.overdueFineIdTitle)).toBeVisible();
    });

    it('should pass "fineSectionOpen" correctly', () => {
      expect(screen.getByTestId(testIds.viewFineSectionTestId)).toHaveAttribute('open');
    });

    it('should execute "getCheckboxValue" functions 3 times', () => {
      expect(mockedGetCheckboxValue).toHaveBeenCalledTimes(3);
    });

    it('should render "overdue" section correctly', () => {
      const expectedResult = overdueFine.quantity >= 0 ? labelIds.perPeriodId : '-';

      expect(getElementByTestId(testIds.sectionOverdue).getByText(labelIds.overdueFineId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionOverdue).getByText(expectedResult)).toBeVisible();
    });

    it('should render "count closed" section correctly', () => {
      expect(getElementByTestId(testIds.sectionCountClosed).getByText(labelIds.countClosedDHMId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionCountClosed).getByText(mockedPolicy.countClosed)).toBeVisible();
    });

    it('should render "max overdue" section correctly', () => {
      const expectedResult = parseFloat(mockedPolicy.maxOverdueFine || 0.00).toFixed(2);

      expect(getElementByTestId(testIds.sectionMaxOverdue).getByText(labelIds.maximumOverdueFineId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionMaxOverdue).getByText(expectedResult)).toBeVisible();
    });

    it('should render "forgive overdue" section correctly', () => {
      expect(getElementByTestId(testIds.sectionForgiveOverdue).getByText(labelIds.forgiveOverdueFineId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionForgiveOverdue).getByText(mockedPolicy.forgiveOverdueFine)).toBeVisible();
    });

    it('should render "overdue recall" section correctly', () => {
      const expectedResult = overdueRecallFine.quantity >= 0 ? labelIds.perPeriodId : '-';

      expect(getElementByTestId(testIds.sectionOverdueRecall).getByText(labelIds.overdueRecallFineId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionOverdueRecall).getByText(expectedResult)).toBeVisible();
    });

    it('should render "grace period" section correctly', () => {
      expect(getElementByTestId(testIds.sectionGracePeriod).getByText(labelIds.ignoreGracePeriodsRecallsId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionGracePeriod).getByText(mockedPolicy.gracePeriodRecall)).toBeVisible();
    });

    it('should render "max overdue recall" section correctly', () => {
      const expectedResult = parseFloat(mockedPolicy.maxOverdueRecallFine || 0.00).toFixed(2);

      expect(getElementByTestId(testIds.sectionMaxOverdueRecall).getByText(labelIds.maximumRecallOverdueFineId)).toBeVisible();
      expect(getElementByTestId(testIds.sectionMaxOverdueRecall).getByText(expectedResult)).toBeVisible();
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
      expect(screen.getByTestId(testIds.viewFineSectionTestId)).not.toHaveAttribute('open');
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
        id: labelIds.perPeriodId,
        values: {
          number: parseFloat(mockedFine.quantity).toFixed(2),
          period: mockedFine.intervalId,
        },
      };

      render(getQuantityValue(mockedFine));

      expect(screen.getByText(labelIds.perPeriodId)).toBeVisible();
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
