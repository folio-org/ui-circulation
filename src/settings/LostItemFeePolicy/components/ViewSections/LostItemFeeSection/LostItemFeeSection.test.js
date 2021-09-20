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
    expect(screen.getByTestId(testId)).toBeVisible();
    expect(within(screen.getByTestId(testId)).getByText(expectedValue)).toBeVisible();
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
        chargeType: 'actualCost'
      },
      chargeAmountItemPatron: true,
      chargeAmountItemSystem: true,
      description: 'Test lost item fee policy',
      feesFinesShallRefunded: {
        duration: undefined,
        intervalId: noop
      },
      id: 'policyId',
      itemAgedLostOverdue: {
        duration: noop,
        intervalId: noop
      },
      lostItemChargeFeeFine: {
        duration: 2,
        intervalId: 'Days'
      },
      lostItemProcessingFee: 0,
      lostItemReturned: 'Charge',
      metadata: {
        createdByUserId: 'userId',
        createdDate: '2021-09-01'
      },
      name: 'Lost item fee policy',
      patronBilledAfterAgedLost: {
        duration: noop,
        intervalId: noop
      },
      patronBilledAfterRecalledItemAgedLost: {
        duration: noop,
        intervalId: noop
      },
      recalledItemAgedLostOverdue: {
        duration: noop,
        intervalId: noop
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
        chargeType: 'otherCost'
      },
      chargeAmountItemPatron: false,
      chargeAmountItemSystem: false,
      feesFinesShallRefunded: {
        duration: 1,
        intervalId: 1
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
      expect(screen.getByTestId('viewLostItemFeeSectionTestId')).toBeVisible();
    });

    it('should render open accordion with label', () => {
      expect(screen.getByTestId('viewLostItemFeeSectionAccordionTestId')).toBeVisible();
      expect(screen.getByTestId('viewLostItemFeeSectionAccordionTestId')).toHaveAttribute('open');
      expect(within(screen.getByTestId('viewLostItemFeeSectionAccordionTestId')).getByText(lostItemSectionAccordionLabel)).toBeVisible();
    });

    testSectionKeyValues('charge amount', 'chargeAmountTestId', actualCost);
    testSectionKeyValues('fees/fines shall refunded', 'displayFeesFinesShallRefundedTestId', dash);
    testSectionKeyValues('lost by system', 'chargeAmountItemSystemTestId', displayYes);
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFeeTestId', displayYes);
    testSectionKeyValues('replacement allowed', 'replacementAllowedTestId', displayYes);
    testSectionKeyValues('if lost item returned', 'lostItemReturnedTestId', lostItemReturnedCharged);
  });

  describe('with lostItemFeeSectionAlternativeProps', () => {
    beforeEach(() => {
      render(<LostItemFeeSection {...lostItemFeeSectionAlternativeProps} />);
    });

    it('should render charge amount with other cost', () => {
      expect(screen.getByTestId('chargeAmountTestId')).toBeVisible();
    });

    testSectionKeyValues('lost by system', 'chargeAmountItemSystemTestId', displayNo);
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFeeTestId', displayNo);
    testSectionKeyValues('returned lost item processing fee', 'returnedLostItemProcessingFeeTestId', displayNo);
    testSectionKeyValues('replacement allowed', 'replacementAllowedTestId', displayNo);
    testSectionKeyValues('if lost item returned', 'lostItemReturnedTestId', lostItemReturnedRemove);
  });
});
