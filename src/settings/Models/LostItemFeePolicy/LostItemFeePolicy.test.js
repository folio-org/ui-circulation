/* eslint-disable max-classes-per-file */
import LostItemFeePolicy from './LostItemFeePolicy';
import {
  LostItem,
  Metadata,
  ChargeAmount,
} from '../common';

import { commonClassCheckWithoutProps } from '../../../../test/jest/helpers';

jest.mock('../common', () => ({
  LostItem: class {
    constructor(itemData) {
      this.itemData = itemData;
    }
  },
  Metadata: class {
    constructor(metadata) {
      this.metadata = metadata;
    }
  },
  ChargeAmount: class {
    constructor(data = {}) {
      this.chargeType = data.chargeType;
      this.amount = data.amount;
    }
  },
}));

const keysThatShouldBeAnLostItemInstance = [
  'itemAgedLostOverdue',
  'patronBilledAfterAgedLost',
  'recalledItemAgedLostOverdue',
  'patronBilledAfterRecalledItemAgedLost',
  'lostItemChargeFeeFine',
  'feesFinesShallRefunded',
];

describe('LostItemFeePolicy', () => {
  describe('defaultLostItemFeePolicy', () => {
    it('should return correct data', () => {
      expect(LostItemFeePolicy.defaultLostItemFeePolicy()).toEqual({
        chargeAmountItem: { chargeType: 'anotherCost' },
        lostItemProcessingFee: 0.00,
        chargeAmountItemPatron: false,
        chargeAmountItemSystem: false,
        returnedLostItemProcessingFee: false,
        replacedLostItemProcessingFee: false,
        replacementProcessingFee: 0.00,
        replacementAllowed: false,
        lostItemReturned: 'Charge',
      });
    });
  });

  describe('without any props', () => {
    commonClassCheckWithoutProps(LostItemFeePolicy, {
      itemAgedLostOverdue: { itemData: undefined },
      patronBilledAfterAgedLost: { itemData: undefined },
      recalledItemAgedLostOverdue: { itemData: undefined },
      patronBilledAfterRecalledItemAgedLost: { itemData: undefined },
      chargeAmountItem: {
        amount: undefined,
        chargeType: undefined,
      },
      lostItemChargeFeeFine: { itemData: undefined },
      feesFinesShallRefunded: { itemData: undefined },
      metadata: { metadata: undefined },
    });
  });

  describe('when props were passed', () => {
    const testData = {
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      itemAgedLostOverdue: 'testItemAgedLostOverdue',
      patronBilledAfterAgedLost: 'testPatronBilledAfterAgedLost',
      recalledItemAgedLostOverdue: 'testRecalledItemAgedLostOverdue',
      patronBilledAfterRecalledItemAgedLost: 'testPatronBilledAfterRecalledItemAgedLost',
      chargeAmountItem: {
        amount: 'testAmount',
        chargeType: 'testChargeType',
      },
      lostItemProcessingFee: 'testLostItemProcessingFee',
      chargeAmountItemPatron: 'testChargeAmountItemPatron',
      chargeAmountItemSystem: 'testChargeAmountItemSystem',
      lostItemChargeFeeFine: 'testLostItemChargeFeeFine',
      returnedLostItemProcessingFee: 'testReturnedLostItemProcessingFee',
      replacedLostItemProcessingFee: 'testReplacedLostItemProcessingFee',
      replacementProcessingFee: 'testReplacementProcessingFee',
      replacementAllowed: 'testReplacementAllowed',
      lostItemReturned: 'testLostItemReturned',
      feesFinesShallRefunded: 'testFeesFinesShallRefunded',
      metadata: 'testMetadata',
    };
    const lostItemFeePolicy = new LostItemFeePolicy(testData);

    it('should have correct values', () => {
      const expectedResult = {
        ...testData,
        itemAgedLostOverdue: { itemData: 'testItemAgedLostOverdue' },
        patronBilledAfterAgedLost: { itemData: 'testPatronBilledAfterAgedLost' },
        recalledItemAgedLostOverdue: { itemData: 'testRecalledItemAgedLostOverdue' },
        patronBilledAfterRecalledItemAgedLost: { itemData: 'testPatronBilledAfterRecalledItemAgedLost' },
        lostItemChargeFeeFine: { itemData: 'testLostItemChargeFeeFine' },
        feesFinesShallRefunded: { itemData: 'testFeesFinesShallRefunded' },
        metadata: { metadata: 'testMetadata' },
      };

      expect(lostItemFeePolicy).toEqual(expectedResult);
    });

    keysThatShouldBeAnLostItemInstance.forEach(key => {
      describe(`${key}`, () => {
        it('should be an instance of "LostItem"', () => {
          expect(lostItemFeePolicy[key]).toBeInstanceOf(LostItem);
        });
      });
    });

    describe('"chargeAmountItem"', () => {
      it('should be an instance of "ChargeAmount"', () => {
        expect(lostItemFeePolicy.chargeAmountItem).toBeInstanceOf(ChargeAmount);
      });
    });

    describe('"metadata"', () => {
      it('should be an instance of "Metadata"', () => {
        expect(lostItemFeePolicy.metadata).toBeInstanceOf(Metadata);
      });
    });
  });

  describe('hasValue', () => {
    const lostItemFeePolicy = new LostItemFeePolicy({
      lostItemProcessingFee: {
        numberValue: 0,
        nonNumberValue: '0',
      },
    });

    it('should return true if value by path is present and it have number type', () => {
      expect(lostItemFeePolicy.hasValue('lostItemProcessingFee.numberValue')).toBe(true);
    });

    it('should return false if value by path is present but it have non number type', () => {
      expect(lostItemFeePolicy.hasValue('lostItemProcessingFee.nonNumberValue')).toBe(false);
    });

    it('should return false if value by path is absent', () => {
      expect(lostItemFeePolicy.hasValue('lostItemProcessingFee.nonExistedPath')).toBe(false);
    });
  });

  describe('hasNonZeroValue', () => {
    const lostItemFeePolicy = new LostItemFeePolicy({
      lostItemProcessingFee: {
        nonZeroValue: '-10',
        zeroValue: '0',
        nonNumberValue: 'test',
      },
    });

    it('should return true if value by path is present and after parsing it have number type and value is not equal to 0', () => {
      expect(lostItemFeePolicy.hasNonZeroValue('lostItemProcessingFee.nonZeroValue')).toBe(true);
    });

    it('should return false if value by path is present but after parsing it equal to 0', () => {
      expect(lostItemFeePolicy.hasNonZeroValue('lostItemProcessingFee.zeroValue')).toBe(false);
    });

    it('should return false if value by path is present but after parsing it is non number value', () => {
      expect(lostItemFeePolicy.hasNonZeroValue('lostItemProcessingFee.nonNumberValue')).toBe(false);
    });

    it('should return false if value by path is absent', () => {
      expect(lostItemFeePolicy.hasNonZeroValue('lostItemProcessingFee.nonExistedPath')).toBe(false);
    });
  });

  describe('hasInterval', () => {
    const lostItemFeePolicy = new LostItemFeePolicy({
      lostItemProcessingFee: 'lostItemProcessingFee',
    });

    it('should return true if value by path is present', () => {
      expect(lostItemFeePolicy.hasInterval('lostItemProcessingFee')).toBe(true);
    });

    it('should return false if value by path is absent', () => {
      expect(lostItemFeePolicy.hasInterval('nonExistedPath')).toBe(false);
    });
  });

  describe('hasPassedValue', () => {
    const lostItemFeePolicy = new LostItemFeePolicy({
      lostItemProcessingFee: {
        testValue: 'testValue',
      },
    });

    it('should return true if value by path is present and match with expected result', () => {
      expect(lostItemFeePolicy.hasPassedValue('lostItemProcessingFee.testValue', 'testValue')).toBe(true);
    });

    it('should return false if value by path is present but do not match with expected result', () => {
      expect(lostItemFeePolicy.hasPassedValue('lostItemProcessingFee.testValue', 42)).toBe(false);
    });

    it('should return false if value by path is absent', () => {
      expect(lostItemFeePolicy.hasPassedValue('lostItemProcessingFee.invalidPath', 42)).toBe(false);
    });
  });

  describe('hasPositiveValue', () => {
    const lostItemFeePolicy = new LostItemFeePolicy({
      lostItemProcessingFee: {
        greaterThanZeroValue: '10',
        zeroValue: '0',
        lessThanZeroValue: '-10',
        nonNumberValue: 'test',
      },
    });

    it('should return true if value by path is present and after parsing it have number type and value is greater than 0', () => {
      expect(lostItemFeePolicy.hasPositiveValue('lostItemProcessingFee.greaterThanZeroValue')).toBe(true);
    });

    it('should return false if value by path is present but after parsing it equal to 0', () => {
      expect(lostItemFeePolicy.hasPositiveValue('lostItemProcessingFee.zeroValue')).toBe(false);
    });

    it('should return false if value by path is present but after parsing it less than 0', () => {
      expect(lostItemFeePolicy.hasPositiveValue('lostItemProcessingFee.lessThanZeroValue')).toBe(false);
    });

    it('should return false if value by path is present but after parsing it is non number value', () => {
      expect(lostItemFeePolicy.hasPositiveValue('lostItemProcessingFee.nonNumberValue')).toBe(false);
    });

    it('should return false if value by path is absent', () => {
      expect(lostItemFeePolicy.hasPositiveValue('lostItemProcessingFee.nonExistedPath')).toBe(false);
    });
  });

  describe('isRquiredLostItemCharge', () => {
    describe('when charge type is "actualCost"', () => {
      const chargeAmountItem = {
        chargeType: 'actualCost',
      };

      it('should return true if "chargeAmountItemPatron" is false', () => {
        const lostItemFeePolicy = new LostItemFeePolicy({
          chargeAmountItem,
          chargeAmountItemPatron: false,
          chargeAmountItemSystem: true,
        });

        expect(lostItemFeePolicy.isRquiredLostItemCharge()).toBe(true);
      });

      it('should return true if "chargeAmountItemSystem" is false', () => {
        const lostItemFeePolicy = new LostItemFeePolicy({
          chargeAmountItem,
          chargeAmountItemPatron: true,
          chargeAmountItemSystem: false,
        });

        expect(lostItemFeePolicy.isRquiredLostItemCharge()).toBe(true);
      });

      it('should return false if "chargeAmountItemPatron" and "chargeAmountItemSystem" is true', () => {
        const lostItemFeePolicy = new LostItemFeePolicy({
          chargeAmountItem,
          chargeAmountItemPatron: true,
          chargeAmountItemSystem: true,
        });

        expect(lostItemFeePolicy.isRquiredLostItemCharge()).toBe(false);
      });
    });

    describe('when charge type is "anotherCost"', () => {
      it('should return true if "amount" is "0.00" and "chargeAmountItemPatron" or "chargeAmountItemSystem" is false', () => {
        const lostItemFeePolicy = new LostItemFeePolicy({
          chargeAmountItem: {
            chargeType: 'anotherCost',
            amount: '0.00',
          },
          chargeAmountItemPatron: false,
          chargeAmountItemSystem: false,
        });

        expect(lostItemFeePolicy.isRquiredLostItemCharge()).toBe(true);
      });

      it('should return false if "amount" is not "0.00" and "chargeAmountItemPatron" or "chargeAmountItemSystem" is false', () => {
        const lostItemFeePolicy = new LostItemFeePolicy({
          chargeAmountItem: {
            chargeType: 'anotherCost',
            amount: '1.00',
          },
          chargeAmountItemPatron: false,
          chargeAmountItemSystem: false,
        });

        expect(lostItemFeePolicy.isRquiredLostItemCharge()).toBe(false);
      });
    });
  });
});
