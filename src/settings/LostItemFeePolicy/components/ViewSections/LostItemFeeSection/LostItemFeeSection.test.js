import React from 'react';
import { noop } from 'lodash';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import LostItemFeeSection from './LostItemFeeSection';

const testSectionKeyValues = (testName, testId, expectedValue) => {
  it(`should render ${testName} with ${expectedValue} value`, () => {
    const testIdValue = screen.getByTestId(testId);

    expect(testIdValue).toBeVisible();
    expect(within(testIdValue).getByText(expectedValue)).toBeVisible();
  });
};

describe('View LostItemFeeSection', () => {
  const dash = '-';
  const lostItemSectionAccordionLabel = 'ui-circulation.settings.lostItemFee.lostItemSection';
  const displayYes = 'ui-circulation.settings.lostItemFee.yes';
  const displayNo = 'ui-circulation.settings.lostItemFee.no';
  const actualCost = 'ui-circulation.settings.lostItemFee.actualCost';
  const lostItemReturnedCharged = 'ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased';
  const lostItemReturnedRemove = 'ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines';
  const lostItemFeeSectionProps = {
    formatMessage: jest.fn(() => null),
    getPeriodValue: jest.fn((value) => value || dash),
    lostItemFeeSectionOpen: true,
    policy: {
      chargeAmountItem: {
        amount: 0,
        chargeType: 'actualCost',
      },
      chargeAmountItemPatron: true,
      chargeAmountItemSystem: true,
      description: 'Test lost item fee policy',
      feesFinesShallRefunded: {
        duration: undefined,
        intervalId: noop,
      },
      id: 'policyId',
      itemAgedLostOverdue: {
        duration: noop,
        intervalId: noop,
      },
      lostItemChargeFeeFine: {
        duration: 2,
        intervalId: 'Days',
      },
      lostItemProcessingFee: 0,
      lostItemReturned: 'Charge',
      metadata: {
        createdByUserId: 'userId',
        createdDate: '2021-09-01',
      },
      name: 'Lost item fee policy',
      patronBilledAfterAgedLost: {
        duration: noop,
        intervalId: noop,
      },
      patronBilledAfterRecalledItemAgedLost: {
        duration: noop,
        intervalId: noop,
      },
      recalledItemAgedLostOverdue: {
        duration: noop,
        intervalId: noop,
      },
      returnedLostItemProcessingFee: true,
      replacedLostItemProcessingFee: true,
      replacementProcessingFee: 0,
      replacementAllowed: true,
    },
    viewLostItemFeeSection: true,
  };
  const lostItemFeeSectionAlternativeProps = {
    ...lostItemFeeSectionProps,
    policy: {
      ...lostItemFeeSectionProps.policy,
      chargeAmountItem: {
        amount: 25,
        chargeType: 'otherCost',
      },
      chargeAmountItemPatron: false,
      chargeAmountItemSystem: false,
      feesFinesShallRefunded: {
        duration: 1,
        intervalId: 1,
      },
      lostItemReturned: 'Remove',
      returnedLostItemProcessingFee: false,
      replacedLostItemProcessingFee: false,
      replacementAllowed: false,
    }
  };

  describe('with lostItemFeeSectionProps', () => {
    beforeEach(() => {
      render(<LostItemFeeSection {...lostItemFeeSectionProps} />);
    });

    it('should render LostItemFeeSection component', () => {
      expect(screen.getByTestId('viewLostItemFeeSection')).toBeVisible();
    });

    it('should render open accordion with label', () => {
      const viewLostItemFeeSectionAccordionTestIdValue = screen.getByTestId('viewLostItemFeeSectionAccordion');

      expect(viewLostItemFeeSectionAccordionTestIdValue).toBeVisible();
      expect(viewLostItemFeeSectionAccordionTestIdValue).toHaveAttribute('open');
      expect(within(viewLostItemFeeSectionAccordionTestIdValue).getByText(lostItemSectionAccordionLabel)).toBeVisible();
    });

    testSectionKeyValues('charge amount', 'chargeAmount', actualCost);
    testSectionKeyValues('fees/fines shall refunded', 'displayFeesFinesShallRefunded', dash);
    testSectionKeyValues('lost by patron', 'chargeAmountItemPatron', displayYes);
    testSectionKeyValues('lost by system', 'chargeAmountItemSystem', displayYes);
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFee', displayYes);
    testSectionKeyValues('replacement allowed', 'replacementAllowed', displayYes);
    testSectionKeyValues('if lost item returned', 'lostItemReturned', lostItemReturnedCharged);
  });

  describe('with lostItemFeeSectionAlternativeProps', () => {
    beforeEach(() => {
      render(<LostItemFeeSection {...lostItemFeeSectionAlternativeProps} />);
    });

    it('should render charge amount with other cost', () => {
      expect(screen.getByTestId('chargeAmount')).toBeVisible();
    });

    testSectionKeyValues('lost by patron', 'chargeAmountItemPatron', displayNo);
    testSectionKeyValues('lost by system', 'chargeAmountItemSystem', displayNo);
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFee', displayNo);
    testSectionKeyValues('returned lost item processing fee', 'returnedLostItemProcessingFee', displayNo);
    testSectionKeyValues('replacement allowed', 'replacementAllowed', displayNo);
    testSectionKeyValues('if lost item returned', 'lostItemReturned', lostItemReturnedRemove);
  });
});
