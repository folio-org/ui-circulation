import React from 'react';
import { render } from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  Checkbox,
  Select,
  TextField,
} from '@folio/stripes/components';

import Period from '../../../../components/Period';
import LoansSection from './LoansSection';
import {
  longTermLoansOptions,
  shortTermLoansOptions,
  intervalPeriods,
} from '../../../../../constants';

jest.mock('../../../../components/Period', () => jest.fn(() => null));
jest.mock('../../../../utils/options-generator', () => jest.fn((func, options, id) => ({
  id,
  options,
})));

const messageIds = {
  header: 'ui-circulation.settings.loanPolicy.loans',
  loanable: 'ui-circulation.settings.loanPolicy.loanable',
  loanProfile: 'ui-circulation.settings.loanPolicy.loanProfile',
  dueDate: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt',
  itemLimit: 'ui-circulation.settings.loanPolicy.itemLimit',
  gracePeriod: 'ui-circulation.settings.loanPolicy.gracePeriod',
  loanPeriod: 'ui-circulation.settings.loanPolicy.loanPeriod',
  fDDSLimit: 'ui-circulation.settings.loanPolicy.fDDSlimit',
  fDDS: 'ui-circulation.settings.loanPolicy.fDDS',
  openingTimeOffset: 'ui-circulation.settings.loanPolicy.openingTimeOffset',
  pleaseSelect: 'ui-circulation.settings.common.pleaseSelect',
  selectInterval: 'ui-circulation.settings.loanPolicy.selectInterval',
};

const mockedSchedules = [
  'firstTestSchedule',
  'secondTestSchedule',
];

const mockedPolicy = {
  isProfileRolling: jest.fn(() => false),
  isShortTermLoan: jest.fn(() => false),
  isLoanable: jest.fn(() => false),
  isProfileFixed: jest.fn(() => false),
  isOpeningTimeOffsetActive: jest.fn(() => false),
  loansPolicy: {
    closedLibraryDueDateManagementId: 'test_id',
  },
};

const initialProps = {
  policy: mockedPolicy,
  schedules: mockedSchedules,
  change: jest.fn(),
};

const renderLoansSection = (props = initialProps) => {
  return render(
    <LoansSection
      {...props}
    />
  );
};

describe('LoansSection', () => {
  afterEach(() => {
    Field.mockClear();
  });

  describe('Initial render with default properties', () => {
    let container;

    beforeEach(() => {
      container = renderLoansSection();
    });

    it('Should be rendered with correct header', () => {
      expect(container.getByText(messageIds.header)).toBeInTheDocument();
    });

    it('Should render loanable checkbox correctly', () => {
      const expectedProps = {
        component: Checkbox,
        id: 'loanable',
        name: 'loanable',
        type: 'checkbox',
      };

      expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.loanable)).toBeInTheDocument();
    });
  });

  describe('Render when "isLoanable" returns true', () => {
    let container;
    const fieldComponentOrderCalls = {
      loanProfile: 2,
      closedDueDate: 3,
      gracePeriod: 4,
    };

    beforeEach(() => {
      container = renderLoansSection({
        ...initialProps,
        policy: {
          ...mockedPolicy,
          isLoanable: jest.fn(() => true),
        }
      });
    });

    it('Should render loan profile dropdown correctly', () => {
      const expectedProps = {
        component: Select,
        id: 'input_loan_profile',
        name: 'loansPolicy.profileId',
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.loanProfile, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.loanProfile)).toBeInTheDocument();
    });

    it('Should render due date dropdown correctly', () => {
      const expectedProps = {
        component: Select,
        name: 'loansPolicy.closedLibraryDueDateManagementId',
        children: {
          options: longTermLoansOptions,
          id: messageIds.pleaseSelect,
        }
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.closedDueDate, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.dueDate)).toBeInTheDocument();
    });

    it('Should render item limit input correctly', () => {
      const expectedProps = {
        component: TextField,
        name: 'loansPolicy.itemLimit',
        id: 'input_item_limit',
        type: 'number',
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.gracePeriod, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.itemLimit)).toBeInTheDocument();
    });

    it('"Period" component should get correct properties under "Grace period" section', () => {
      const expectedProps = {
        fieldLabel: messageIds.gracePeriod,
        inputValuePath: 'loansPolicy.gracePeriod.duration',
        selectValuePath: 'loansPolicy.gracePeriod.intervalId',
        changeFormValue: initialProps.change,
        intervalPeriods: {
          id: messageIds.selectInterval,
          options: intervalPeriods,
        },
      };

      expect(Period).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });
  });

  describe('Render when "isProfileRolling" returns true', () => {
    let container;
    const fieldComponentOrderCalls = {
      dueDateSchedule: 2,
    };

    beforeEach(() => {
      container = renderLoansSection({
        ...initialProps,
        policy: {
          ...mockedPolicy,
          isProfileRolling: jest.fn(() => true),
        },
      });
    });

    it('"Period" component should get correct properties under "Loan period" section', () => {
      const expectedProps = {
        fieldLabel: messageIds.loanPeriod,
        inputValuePath: 'loansPolicy.period.duration',
        selectValuePath: 'loansPolicy.period.intervalId',
        changeFormValue: initialProps.change,
        intervalPeriods: {
          id: messageIds.selectInterval,
          options: intervalPeriods,
        },
      };

      expect(Period).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('Should render due date schedule dropdown correctly', () => {
      const expectedProps = {
        component: Select,
        name: 'loansPolicy.fixedDueDateScheduleId',
        id: 'input_loansPolicy_fixedDueDateSchedule',
        required: false,
        children: mockedSchedules,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.dueDateSchedule, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.fDDSLimit)).toBeInTheDocument();
    });
  });

  describe('Render when "isProfileFixed" returns true', () => {
    let container;
    const fieldComponentOrderCalls = {
      dueDateSchedule: 2,
    };

    beforeEach(() => {
      container = renderLoansSection({
        ...initialProps,
        policy: {
          ...mockedPolicy,
          isProfileFixed: jest.fn(() => true),
        }
      });
    });

    it('Should render due date schedule dropdown correctly', () => {
      const expectedProps = {
        component: Select,
        name: 'loansPolicy.fixedDueDateScheduleId',
        id: 'input_loansPolicy_fixedDueDateSchedule',
        required: true,
        children: mockedSchedules,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.dueDateSchedule, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.fDDS)).toBeInTheDocument();
    });
  });

  describe('Render when "isShortTermLoan" and "isLoanable" return true', () => {
    let container;
    const fieldComponentOrderCalls = {
      closedDueDate: 3,
    };

    beforeEach(() => {
      container = renderLoansSection({
        ...initialProps,
        policy: {
          ...mockedPolicy,
          isShortTermLoan: jest.fn(() => true),
          isLoanable: jest.fn(() => true),
        }
      });
    });

    it('Should render due date dropdown correctly', () => {
      const expectedProps = {
        component: Select,
        name: 'loansPolicy.closedLibraryDueDateManagementId',
        children: {
          options: shortTermLoansOptions,
          id: messageIds.pleaseSelect,
        }
      };

      expect(Field).toHaveBeenNthCalledWith(fieldComponentOrderCalls.closedDueDate, expect.objectContaining(expectedProps), {});
      expect(container.getByText(messageIds.dueDate)).toBeInTheDocument();
    });
  });

  describe('Render when "isOpeningTimeOffsetActive" returns true', () => {
    beforeEach(() => {
      renderLoansSection({
        ...initialProps,
        policy: {
          ...mockedPolicy,
          isOpeningTimeOffsetActive: jest.fn(() => true),
        }
      });
    });

    it('"Period" component should get correct properties for opening time offset field', () => {
      const expectedProps = {
        fieldLabel: messageIds.openingTimeOffset,
        inputValuePath: 'loansPolicy.openingTimeOffset.duration',
        selectValuePath: 'loansPolicy.openingTimeOffset.intervalId',
        changeFormValue: initialProps.change,
        intervalPeriods: {
          id: messageIds.selectInterval,
          options: intervalPeriods.slice(0, 2).reverse(),
        },
      };

      expect(Period).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });
  });

  describe('Updating of component', () => {
    let container;

    beforeEach(() => {
      container = renderLoansSection();
    });

    it('Should not trigger "change" property after component properties updating', () => {
      container.rerender(<LoansSection {...initialProps} schedules={[]} />);
      expect(initialProps.change).not.toBeCalled();
    });

    it('Should trigger "change" property if closedLibraryDueDateManagementId is different', () => {
      const modifiedProps = {
        ...initialProps,
        policy: {
          ...mockedPolicy,
          loansPolicy: {
            closedLibraryDueDateManagementId: '1',
          },
        }
      };
      container.rerender(<LoansSection {...modifiedProps} />);
      expect(initialProps.change).toBeCalled();
    });
  });
});
