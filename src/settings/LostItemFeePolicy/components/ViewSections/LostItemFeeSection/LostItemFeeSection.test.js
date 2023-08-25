import React from 'react';
import { noop } from 'lodash';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import LostItemFeeSection from './LostItemFeeSection';

const testSectionKeyValues = (testName, testId, expectedValue) => {
  it(`should render ${testName} with ${expectedValue} value`, () => {
    const testIdValue = screen.getByTestId(testId);

    expect(testIdValue).toBeVisible();
    expect(within(testIdValue).getByText(expectedValue)).toBeVisible();
    expect(within(testIdValue).getByText(`ui-circulation.settings.lostItemFee.${testId}`)).toBeVisible();
  });
};
const getFormattedValue = (value) => parseFloat(value).toFixed(2);

describe('View LostItemFeeSection', () => {
  const testIds = {
    chargeAmountItem: 'chargeAmountItem',
    viewLostItemFeeSection: 'viewLostItemFeeSection',
    viewLostItemFeeSectionAccordion: 'viewLostItemFeeSectionAccordion',
  };
  const labelIds = {
    lostItemSectionAccordionLabel: 'ui-circulation.settings.lostItemFee.lostItemSection',
    displayYes: 'ui-circulation.settings.lostItemFee.yes',
    displayNo: 'ui-circulation.settings.lostItemFee.no',
    actualCost: 'ui-circulation.settings.lostItemFee.actualCost',
    lostItemReturnedCharged: 'ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased',
    lostItemReturnedRemove: 'ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines',
  };
  const dash = '-';
  const lostItemFeeSectionProps = {
    formatMessage: jest.fn(() => dash),
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
    lostItemFeeSectionOpen: false,
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
      expect(screen.getByTestId(testIds.viewLostItemFeeSection)).toBeVisible();
    });

    it('should render open accordion with label', () => {
      const viewLostItemFeeSectionAccordionTestIdValue = screen.getByTestId(testIds.viewLostItemFeeSectionAccordion);

      expect(viewLostItemFeeSectionAccordionTestIdValue).toBeVisible();
      expect(viewLostItemFeeSectionAccordionTestIdValue).toHaveAttribute('open');
      expect(within(viewLostItemFeeSectionAccordionTestIdValue).getByText(labelIds.lostItemSectionAccordionLabel)).toBeVisible();
    });

    testSectionKeyValues('item aged', 'itemeAgedLostOverdue', 'itemAgedLostOverdue');
    testSectionKeyValues('patron billed after aged lost', 'patronBilledAfterAgedLost', 'patronBilledAfterAgedLost');
    testSectionKeyValues('item recalled aged', 'itemRecalledAgedLostOverdue', 'recalledItemAgedLostOverdue');
    testSectionKeyValues('patron billed recalled', 'patronBilledAfterRecalledAgedLost', 'patronBilledAfterRecalledItemAgedLost');
    testSectionKeyValues('lost item fee', 'lostItemProcessingFee', getFormattedValue(lostItemFeeSectionProps.policy.lostItemProcessingFee));
    testSectionKeyValues('charge amount', 'chargeAmountItem', labelIds.actualCost);
    testSectionKeyValues('fees/fines shall refunded', 'feesFinesShallRefunded', dash);
    testSectionKeyValues('lost by patron', 'chargeAmountItemPatron', labelIds.displayYes);
    testSectionKeyValues('lost by system', 'chargeAmountItemSystem', labelIds.displayYes);
    testSectionKeyValues('close loan after', 'lostItemNotChargeFeesFine', 'lostItemChargeFeeFine');
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFee', labelIds.displayYes);
    testSectionKeyValues('replacement fee', 'replacementProcessFee', getFormattedValue(lostItemFeeSectionProps.policy.replacementProcessingFee));
    testSectionKeyValues('replacement allowed', 'replacementAllowed', labelIds.displayYes);
    testSectionKeyValues('if lost item returned', 'lostItemReturned', labelIds.lostItemReturnedCharged);
  });

  describe('with lostItemFeeSectionAlternativeProps', () => {
    beforeEach(() => {
      render(<LostItemFeeSection {...lostItemFeeSectionAlternativeProps} />);
    });

    it('should render close accordion', () => {
      expect(screen.getByTestId(testIds.viewLostItemFeeSectionAccordion)).not.toHaveAttribute('open');
    });

    it('should render charge amount with other cost', () => {
      expect(screen.getByTestId(testIds.chargeAmountItem)).toBeVisible();
    });

    testSectionKeyValues('lost by patron', 'chargeAmountItemPatron', labelIds.displayNo);
    testSectionKeyValues('lost by system', 'chargeAmountItemSystem', labelIds.displayNo);
    testSectionKeyValues('replaced lost item processing fee', 'replacedLostItemProcessingFee', labelIds.displayNo);
    testSectionKeyValues('returned lost item processing fee', 'returnedLostItemProcessingFee', labelIds.displayNo);
    testSectionKeyValues('replacement allowed', 'replacementAllowed', labelIds.displayNo);
    testSectionKeyValues('if lost item returned', 'lostItemReturned', labelIds.lostItemReturnedRemove);
  });
});
