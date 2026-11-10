import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  KeyValue,
} from '@folio/stripes/components';
import RenewalsSection from './RenewalsSection';

import { renewFromOptions } from '../../../../../constants';

KeyValue.mockImplementation(jest.fn(() => null));

describe('RenewalsSection', () => {
  const labelIds = {
    altFDDSDueDateLimit: 'ui-circulation.settings.loanPolicy.altFDDSDueDateLimit',
    altFDDSforRenewals: 'ui-circulation.settings.loanPolicy.altFDDSforRenewals',
    renewals: 'ui-circulation.settings.loanPolicy.renewals',
    renewable: 'ui-circulation.settings.loanPolicy.renewable',
    unlimitedRenewals: 'ui-circulation.settings.loanPolicy.unlimitedRenewals',
    numRenewalsAllowed: 'ui-circulation.settings.loanPolicy.numRenewalsAllowed',
    renewFrom: 'ui-circulation.settings.loanPolicy.renewFrom',
    renewalPeriodDifferent: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent',
    alternateLoanPeriodRenewals: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals',
    automaticRenewals: 'ui-circulation.settings.loanPolicy.automaticRenewals',
    attemptFirstRenewal: 'ui-circulation.settings.loanPolicy.attemptFirstRenewal',
    attemptAdditionalRetries: 'ui-circulation.settings.loanPolicy.attemptAdditionalRetries',
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
    automaticRenewal: 'automaticRenewal',
    attemptFirstRenewal: 'attemptFirstRenewal',
    attemptAdditionalRetries: 'attemptAdditionalRetries',
  };
  const orderOfKeyValueCall = {
    renewable: 1,
    unlimitedRenewals: 2,
    numRenewalsAllowed: 3,
    renewFrom: 4,
    renewalPeriodDifferent: 5,
    alternateLoanPeriodRenewals: 6,
    altFDDS: 7,
    automaticRenewal: 8,
  };
  const mockedPolicy = {
    isProfileRolling: () => true,
    isUnlimitedRenewals: () => false,
    isDifferentPeriod: () => true,
    isRenewable: () => true,
    isAutomaticRenewals: () => false,
    isDaysBeforeSelected: () => false,
  };
  const mockedGetCheckbox = jest.fn((id) => ({ id, func: 'getCheckboxValue' }));
  const mockedGetDropdown = jest.fn((id, options) => ({ id, options }));
  const mockedGetPeriod = jest.fn((id) => ({ id, func: 'getPeriodValue' }));
  const mockedGetSchedule = jest.fn((id) => ({ id, func: 'getScheduleValue' }));
  const mockedGetValue = jest.fn((id) => ({ id, func: 'getValue' }));
  const defaultProps = {
    isVisible: true,
    policy: mockedPolicy,
    getCheckboxValue: mockedGetCheckbox,
    getDropdownValue: mockedGetDropdown,
    getPeriodValue: mockedGetPeriod,
    getScheduleValue: mockedGetSchedule,
    getValue: mockedGetValue,
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    KeyValue.mockClear();
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
        label: labelIds.renewable,
        value: {
          id: 'renewable',
          func: 'getCheckboxValue',
        },
      };

      expect(screen.getByTestId(testIds.renewable)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.renewable, expectedProps, {});
    });

    it('should render "unlimitedRenewals" section correctly', () => {
      const expectedProps = {
        label: labelIds.unlimitedRenewals,
        value: {
          id: 'renewalsPolicy.unlimited',
          func: 'getCheckboxValue',
        },
      };

      expect(screen.getByTestId(testIds.unlimitedRenewals)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.unlimitedRenewals, expectedProps, {});
    });

    it('should render "numRenewalsAllowed" section correctly', () => {
      const expectedProps = {
        label: labelIds.numRenewalsAllowed,
        value: {
          id: 'renewalsPolicy.numberAllowed',
          func: 'getValue',
        },
      };

      expect(screen.getByTestId(testIds.numRenewalsAllowed)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.numRenewalsAllowed, expectedProps, {});
    });

    it('should render "renewFrom" section correctly', () => {
      const expectedProps = {
        label: labelIds.renewFrom,
        value: {
          id: 'renewalsPolicy.renewFromId',
          options: renewFromOptions,
        },
      };

      expect(screen.getByTestId(testIds.renewFrom)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.renewFrom, expectedProps, {});
    });

    it('should render "renewalPeriodDifferent" section correctly', () => {
      const expectedProps = {
        label: labelIds.renewalPeriodDifferent,
        value: {
          id: 'renewalsPolicy.differentPeriod',
          func: 'getCheckboxValue',
        },
      };

      expect(screen.getByTestId(testIds.renewalPeriodDifferent)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.renewalPeriodDifferent, expectedProps, {});
    });

    it('should render "alternateLoanPeriodRenewals" section correctly', () => {
      const expectedProps = {
        label: labelIds.alternateLoanPeriodRenewals,
        value: {
          id: 'renewalsPolicy.period',
          func: 'getPeriodValue',
        },
      };

      expect(screen.getByTestId(testIds.alternateLoanPeriodRenewals)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.alternateLoanPeriodRenewals, expectedProps, {});
    });

    it('should render "altFDDS" section correctly', () => {
      const expectedProps = {
        label: labelIds.altFDDSDueDateLimit,
        value: {
          id: 'renewalsPolicy.alternateFixedDueDateScheduleId',
          func: 'getScheduleValue',
        },
      };

      expect(screen.getByTestId(testIds.altFDDS)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.altFDDS, expectedProps, {});
    });

    it('should render "automaticRenewal" section correctly', () => {
      const expectedProps = {
        label: labelIds.automaticRenewals,
        value: {
          id: 'renewalsPolicy.automaticRenewal',
          func: 'getCheckboxValue',
        },
      };

      expect(screen.getByTestId(testIds.automaticRenewal)).toBeVisible();
      expect(KeyValue).toHaveBeenNthCalledWith(orderOfKeyValueCall.automaticRenewal, expectedProps, {});
    });

    it('should not render "attemptFirstRenewal" section when automatic renewals is disabled', () => {
      expect(screen.queryByTestId(testIds.attemptFirstRenewal)).not.toBeInTheDocument();
    });

    it('should not render "attemptAdditionalRetries" section when automatic renewals is disabled', () => {
      expect(screen.queryByTestId(testIds.attemptAdditionalRetries)).not.toBeInTheDocument();
    });
  });

  describe('when "isAutomaticRenewals" returns true and "isDaysBeforeSelected" returns false', () => {
    beforeEach(() => {
      render(
        <RenewalsSection
          {...defaultProps}
          policy={{
            ...mockedPolicy,
            isAutomaticRenewals: () => true,
            isDaysBeforeSelected: () => false,
          }}
        />
      );
    });

    it('should render "attemptFirstRenewal" with "On due date" value', () => {
      expect(screen.getByTestId(testIds.attemptFirstRenewal)).toBeVisible();
      expect(KeyValue).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.attemptFirstRenewal,
        value: 'ui-circulation.settings.loanPolicy.attemptFirstRenewal.onDueDate',
      }), {});
    });

    it('should render "attemptAdditionalRetries" section', () => {
      expect(screen.getByTestId(testIds.attemptAdditionalRetries)).toBeVisible();
    });
  });

  describe('when "isAutomaticRenewals" returns true and "isDaysBeforeSelected" returns true', () => {
    beforeEach(() => {
      mockedGetValue.mockImplementation((id) => {
        if (id === 'renewalsPolicy.automaticRenewalRetryPeriodInDays') return 5;
        return { id, func: 'getValue' };
      });

      render(
        <RenewalsSection
          {...defaultProps}
          getValue={mockedGetValue}
          policy={{
            ...mockedPolicy,
            isAutomaticRenewals: () => true,
            isDaysBeforeSelected: () => true,
            renewalsPolicy: {
              daysBefore: 3,
            },
          }}
        />
      );
    });

    afterEach(() => {
      mockedGetValue.mockImplementation((id) => ({ id, func: 'getValue' }));
    });

    it('should render "attemptFirstRenewal" with days before due date value', () => {
      expect(screen.getByTestId(testIds.attemptFirstRenewal)).toBeVisible();
      expect(KeyValue).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.attemptFirstRenewal,
        value: '3 ui-circulation.settings.loanPolicy.attemptFirstRenewal.daysBefore',
      }), {});
    });

    it('should render "attemptAdditionalRetries" with days value', () => {
      expect(screen.getByTestId(testIds.attemptAdditionalRetries)).toBeVisible();
      expect(KeyValue).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.attemptAdditionalRetries,
        value: '5 ui-circulation.settings.loanPolicy.days',
      }), {});
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

    it('should not render "alternateLoanPeriodRenewals" section', () => {
      expect(screen.queryByTestId(testIds.alternateLoanPeriodRenewals)).not.toBeInTheDocument();
    });

    it('should render "altFDDS" section correctly', () => {
      expect(KeyValue).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.altFDDSforRenewals,
      }), {});
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

    it('should not render "automaticRenewal" section', () => {
      expect(screen.queryByTestId(testIds.automaticRenewal)).not.toBeInTheDocument();
    });
  });

  describe('when "isVisible" is false', () => {
    it('should not redner anything', () => {
      render(
        <RenewalsSection
          {...defaultProps}
          isVisible={false}
        />
      );

      expect(screen.queryByTestId(testIds.renewals)).not.toBeInTheDocument();
    });
  });
});
