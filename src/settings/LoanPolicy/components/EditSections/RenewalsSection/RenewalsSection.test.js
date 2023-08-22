import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  Checkbox,
  Select,
  TextField,
} from '@folio/stripes/components';
import Period from '../../../../components/Period';
import {
  intervalPeriods,
  renewFromOptions,
} from '../../../../../constants';
import RenewalsSection from './RenewalsSection';

jest.mock('../../../../components/Period', () => jest.fn(() => null));
jest.mock('../../../../utils/options-generator', () => jest.fn((func, options, id) => ({
  id,
  options,
})));

describe('RenewalsSection', () => {
  const labelIds = {
    altFDDSDueDateLimit: 'ui-circulation.settings.loanPolicy.altFDDSDueDateLimit',
    altFDDSforRenewals: 'ui-circulation.settings.loanPolicy.altFDDSforRenewals',
    renewals: 'ui-circulation.settings.loanPolicy.renewals',
    renewable: 'ui-circulation.settings.loanPolicy.renewable',
    unlimitedRenewals: 'ui-circulation.settings.loanPolicy.unlimitedRenewals',
    numRenewalsAllowed: 'ui-circulation.settings.loanPolicy.numRenewalsAllowed',
    renewFrom: 'ui-circulation.settings.loanPolicy.renewFrom',
    pleaseSelect: 'ui-circulation.settings.common.pleaseSelect',
    renewalPeriodDifferent: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent',
    alternateLoanPeriodRenewals: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals',
    selectInterval: 'ui-circulation.settings.loanPolicy.selectInterval',
  };
  const testIds = {
    renewals: 'renewals',
    renewable: 'renewable',
    unlimitedRenewals: 'unlimitedRenewals',
    numRenewalsAllowed: 'numRenewalsAllowed',
    renewFrom: 'renewFrom',
    renewalPeriodDifferent: 'renewalPeriodDifferent',
    alternateLoanPeriodRenewals: 'alternateLoanPeriodRenewals',
    altFDDS: 'altFDDS',
  };
  const fieldCallOrderByPlace = {
    renewable: 1,
    unlimitedRenewals: 2,
    numRenewalsAllowed: 3,
    renewFrom: 4,
    renewalPeriodDifferent: 5,
    altFDDS: 6,
  };
  const mockedPolicy = {
    isProfileRolling: () => true,
    isUnlimitedRenewals: () => false,
    isDifferentPeriod: () => true,
    isProfileFixed: () => true,
    isRenewable: () => true,
    isLoanable: () => true,
  };
  const mockedSchedules = [
    'firstTestShedule',
    'secondTestShedule',
  ];
  const mockedChange = jest.fn();
  const defaultProps = {
    policy: mockedPolicy,
    schedules: mockedSchedules,
    change: mockedChange,
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Field.mockClear();
  });

  describe('with props which allows render all sections', () => {
    beforeEach(() => {
      render(
        <RenewalsSection
          {...defaultProps}
        />
      );
    });

    it('should render main label', () => {
      expect(getById(testIds.renewals).getByText(labelIds.renewals)).toBeVisible();
    });

    it('should render "renewable" section correctly', () => {
      const expectedProps = {
        name:'renewable',
        component: Checkbox,
        type:'checkbox',
        id:'renewable',
      };

      expect(getById(testIds.renewable).getByText(labelIds.renewable)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.renewable, expect.objectContaining(expectedProps), {});
    });

    it('should render "unlimitedRenewals" section correctly', () => {
      const expectedProps = {
        name:'renewalsPolicy.unlimited',
        component: Checkbox,
        type:'checkbox',
        id:'renewalsPolicy.unlimited',
      };

      expect(getById(testIds.unlimitedRenewals).getByText(labelIds.unlimitedRenewals)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.unlimitedRenewals, expect.objectContaining(expectedProps), {});
    });

    it('should render "numRenewalsAllowed" section correctly', () => {
      const expectedProps = {
        name:'renewalsPolicy.numberAllowed',
        component: TextField,
        type:'number',
        id:'input_allowed_renewals',
        required: true,
        min: 0,
      };

      expect(getById(testIds.numRenewalsAllowed).getByText(labelIds.numRenewalsAllowed)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.numRenewalsAllowed, expect.objectContaining(expectedProps), {});
    });

    it('should render "renewFrom" section correctly', () => {
      const expectedProps = {
        name:'renewalsPolicy.renewFromId',
        component: Select,
        id:'select_renew_from',
        required: true,
        children: {
          id: labelIds.pleaseSelect,
          options: renewFromOptions,
        },
      };

      expect(getById(testIds.renewFrom).getByText(labelIds.renewFrom)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.renewFrom, expect.objectContaining(expectedProps), {});
    });

    it('should render "renewalPeriodDifferent" section correctly', () => {
      const expectedProps = {
        name:'renewalsPolicy.differentPeriod',
        component: Checkbox,
        id:'renewalsPolicy.differentPeriod',
        type: 'checkbox',
      };

      expect(getById(testIds.renewalPeriodDifferent).getByText(labelIds.renewalPeriodDifferent)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.renewalPeriodDifferent, expect.objectContaining(expectedProps), {});
    });

    it('should render "alternateLoanPeriodRenewals" section correctly', () => {
      const expectedProps = {
        fieldLabel: labelIds.alternateLoanPeriodRenewals,
        inputValuePath: 'renewalsPolicy.period.duration',
        selectValuePath: 'renewalsPolicy.period.intervalId',
        intervalPeriods: {
          id: labelIds.selectInterval,
          options: intervalPeriods,
        },
        changeFormValue: mockedChange,
        required: true,
      };

      expect(Period).toHaveBeenLastCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('should render "altFDDS" section correctly', () => {
      const expectedProps = {
        name:'renewalsPolicy.alternateFixedDueDateScheduleId',
        component: Select,
        required: true,
        children: mockedSchedules,
      };

      expect(getById(testIds.altFDDS).getByText(labelIds.altFDDSDueDateLimit)).toBeVisible();
      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.altFDDS, expect.objectContaining(expectedProps), {});
    });
  });

  describe('when "isProfileRolling" returns false', () => {
    beforeEach(() => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isProfileRolling: () => false,
          }}
        />
      );
    });

    it('should not render "renewFrom" section', () => {
      expect(screen.queryByTestId(testIds.renewFrom)).not.toBeInTheDocument();
    });

    it('should not render "alternateLoanPeriodRenewals" section', () => {
      expect(screen.queryByTestId(testIds.alternateLoanPeriodRenewals)).not.toBeInTheDocument();
    });

    it('should render "altFDDS" section correctly', () => {
      expect(getById(testIds.altFDDS).getByText(labelIds.altFDDSforRenewals)).toBeVisible();
    });
  });

  describe('when "isUnlimitedRenewals" return true', () => {
    it('should not render "numRenewalsAllowed" section', () => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isUnlimitedRenewals: () => true,
          }}
        />
      );

      expect(screen.queryByTestId(testIds.numRenewalsAllowed)).not.toBeInTheDocument();
    });
  });

  describe('when "isDifferentPeriod" return false', () => {
    beforeEach(() => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isDifferentPeriod: () => false,
          }}
        />
      );
    });

    it('should not render "alternateLoanPeriodRenewals" section', () => {
      expect(screen.queryByTestId(testIds.alternateLoanPeriodRenewals)).not.toBeInTheDocument();
    });

    it('should not render "altFDDS" section', () => {
      expect(screen.queryByTestId(testIds.altFDDS)).not.toBeInTheDocument();
    });
  });

  describe('when "isProfileFixed" return false', () => {
    it('should execute Field in "altFDDS" with "required: false" prop', () => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isProfileFixed: () => false,
          }}
        />
      );

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.altFDDS, expect.objectContaining({ required: false }), {});
    });
  });

  describe('when "isRenewable" return false', () => {
    beforeEach(() => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isRenewable: () => false,
          }}
        />
      );
    });

    it('should not render "unlimitedRenewals" section', () => {
      expect(screen.queryByTestId(testIds.unlimitedRenewals)).not.toBeInTheDocument();
    });

    it('should not render "numRenewalsAllowed" section', () => {
      expect(screen.queryByTestId(testIds.numRenewalsAllowed)).not.toBeInTheDocument();
    });

    it('should not render "renewFrom" section', () => {
      expect(screen.queryByTestId(testIds.renewFrom)).not.toBeInTheDocument();
    });

    it('should not render "renewalPeriodDifferent" section', () => {
      expect(screen.queryByTestId(testIds.renewalPeriodDifferent)).not.toBeInTheDocument();
    });

    it('should not render "alternateLoanPeriodRenewals" section', () => {
      expect(screen.queryByTestId(testIds.alternateLoanPeriodRenewals)).not.toBeInTheDocument();
    });

    it('should not render "altFDDS" section', () => {
      expect(screen.queryByTestId(testIds.altFDDS)).not.toBeInTheDocument();
    });
  });

  describe('when "isLoanable" return false', () => {
    it('should not redner anything', () => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isLoanable: () => false,
          }}
        />
      );

      expect(screen.queryByTestId(testIds.renewals)).not.toBeInTheDocument();
    });
  });
});
