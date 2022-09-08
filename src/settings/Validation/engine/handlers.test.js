import {
  isNotEmpty,
  isNotEmptyWithoutSpace,
  isIntegerGreaterThanZero,
  isIntegerGreaterThanOrEqualToZero,
  isFloatGreaterThanZero,
  isFloatGreaterThanOrEqualToZero,
  isPositiveNumber,
  isInInterval,
  isInIntervalOrNull,
  isNotEmptyEditor,
  isSelected,
  isGreaterOrEqualThanPassedField,
  isMaximumFineValueValid,
  hasNoChargeLostItemProcessingFee,
  hasLostItemProcessingFeeValue,
  hasPositiveReplacementAllowed,
  hasReplacementAllowedAndPositiveLostItemPolicyFee,
  hasReplacementAllowedAndNegativeLostItemPolicyFee,
  hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee,
  hasPatronBilledAfterAgedToLostValue,
  hasChargeAmountItemSystemSelected,
  isToBeforeFrom,
  isDueAfterTo,
  isRquiredLostItemCharge,
  hasPositiveItemsAgedToLostAfterOverdueAmount,
  hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue,
  hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue,
  hasPatronBilledAfterRecalledAgedToLostValue,
} from './handlers';
import LostItemFeePolicy from '../../Models/LostItemFeePolicy';

jest.mock('../../Models/LostItemFeePolicy', () => jest.fn(() => {}));

describe('handlers', () => {
  describe('isNotEmpty method', () => {
    describe('when passed value is positive number', () => {
      it('should return true', () => {
        expect(isNotEmpty(1)).toBe(true);
      });
    });

    describe('when passed value is negative number', () => {
      it('should return true', () => {
        expect(isNotEmpty(-1)).toBe(true);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return true', () => {
        expect(isNotEmpty(0)).toBe(true);
      });
    });

    describe('when passed value is not empty array', () => {
      it('should return true', () => {
        expect(isNotEmpty([1])).toBe(true);
      });
    });

    describe('when passed value is not empty object', () => {
      it('should return true', () => {
        expect(isNotEmpty({ a: 1 })).toBe(true);
      });
    });

    describe('when passed value is string number', () => {
      it('should return true', () => {
        expect(isNotEmpty('1')).toBe(true);
      });
    });

    describe('when passed value is string space', () => {
      it('should return true', () => {
        expect(isNotEmpty(' ')).toBe(true);
      });
    });

    describe('when passed value is empty array', () => {
      it('should return false', () => {
        expect(isNotEmpty([])).toBe(false);
      });
    });

    describe('when passed value is empty object', () => {
      it('should return false', () => {
        expect(isNotEmpty({})).toBe(false);
      });
    });

    describe('when passed value is empty string', () => {
      it('should return false', () => {
        expect(isNotEmpty('')).toBe(false);
      });
    });
  });

  describe('isNotEmptyWithoutSpace method', () => {
    describe('when passed value is string with some character and without space', () => {
      it('should return true', () => {
        expect(isNotEmptyWithoutSpace('1')).toBe(true);
      });
    });

    describe('when passed value is string with some character and with spaces', () => {
      it('should return true', () => {
        expect(isNotEmptyWithoutSpace(' 1 ')).toBe(true);
      });
    });

    describe('when passed value is empty string', () => {
      it('should return false', () => {
        expect(isNotEmptyWithoutSpace('')).toBe(false);
      });
    });

    describe('when passed value is string with space', () => {
      it('should return false', () => {
        expect(isNotEmptyWithoutSpace(' ')).toBe(false);
      });
    });

    describe('when passed value is positive number', () => {
      it('should return false', () => {
        expect(isNotEmptyWithoutSpace(1)).toBe(false);
      });
    });

    describe('when passed value is negative number', () => {
      it('should return false', () => {
        expect(isNotEmptyWithoutSpace(-1)).toBe(false);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return false', () => {
        expect(isNotEmptyWithoutSpace(0)).toBe(false);
      });
    });
  });

  describe('isIntegerGreaterThanZero method', () => {
    describe('when passed value is positive number', () => {
      it('should return true', () => {
        expect(isIntegerGreaterThanZero(1)).toBe(true);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return false', () => {
        expect(isIntegerGreaterThanZero(0)).toBe(false);
      });
    });

    describe('when passed value is negative number', () => {
      it('should return false', () => {
        expect(isIntegerGreaterThanZero(-1)).toBe(false);
      });
    });

    describe('when passed value is string positive number', () => {
      it('should return false', () => {
        expect(isIntegerGreaterThanZero('1')).toBe(false);
      });
    });
  });

  describe('isIntegerGreaterThanOrEqualToZero method', () => {
    describe('when passed value is positive number', () => {
      it('should return true', () => {
        expect(isIntegerGreaterThanOrEqualToZero(1)).toBe(true);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return true', () => {
        expect(isIntegerGreaterThanOrEqualToZero(0)).toBe(true);
      });
    });

    describe('when passed value is negative number', () => {
      it('should return false', () => {
        expect(isIntegerGreaterThanOrEqualToZero(-1)).toBe(false);
      });
    });

    describe('when passed value is string positive number', () => {
      it('should return false', () => {
        expect(isIntegerGreaterThanOrEqualToZero('1')).toBe(false);
      });
    });
  });

  describe('isFloatGreaterThanZero method', () => {
    describe('when passed value is positive float number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanZero(1.10)).toBe(true);
      });
    });

    describe('when passed value is string positive float number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanZero('1.10')).toBe(true);
      });
    });

    describe('when passed value is negative float number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanZero(-1.10)).toBe(false);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanZero(0)).toBe(false);
      });
    });

    describe('when passed value is string negative float number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanZero('-1.10')).toBe(false);
      });
    });

    describe('when passed value is string zero number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanZero('0')).toBe(false);
      });
    });

    describe('when passed value is not number string', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanZero('not number string')).toBe(false);
      });
    });
  });

  describe('isFloatGreaterThanOrEqualToZero method', () => {
    describe('when passed value is positive float number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanOrEqualToZero(1.10)).toBe(true);
      });
    });

    describe('when passed value is string positive float number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanOrEqualToZero('1.10')).toBe(true);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanOrEqualToZero(0)).toBe(true);
      });
    });

    describe('when passed value is string zero number', () => {
      it('should return true', () => {
        expect(isFloatGreaterThanOrEqualToZero('0')).toBe(true);
      });
    });

    describe('when passed value is negative float number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanOrEqualToZero(-1.10)).toBe(false);
      });
    });

    describe('when passed value is string negative float number', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanOrEqualToZero('-1.10')).toBe(false);
      });
    });

    describe('when passed value is not number string', () => {
      it('should return false', () => {
        expect(isFloatGreaterThanOrEqualToZero('not number string')).toBe(false);
      });
    });
  });

  describe('isPositiveNumber method', () => {
    describe('when passed value is positive integer number', () => {
      it('should return true', () => {
        expect(isPositiveNumber(1)).toBe(true);
      });
    });

    describe('when passed value is zero number', () => {
      it('should return true', () => {
        expect(isPositiveNumber(0)).toBe(true);
      });
    });

    describe('when passed value is negative integer number', () => {
      it('should return false', () => {
        expect(isPositiveNumber(-1)).toBe(false);
      });
    });

    describe('when passed value is string positive integer number', () => {
      it('should return false', () => {
        expect(isPositiveNumber('1')).toBe(false);
      });
    });

    describe('when passed value is string negative integer number', () => {
      it('should return false', () => {
        expect(isPositiveNumber('-1')).toBe(false);
      });
    });

    describe('when passed value is string zero number', () => {
      it('should return false', () => {
        expect(isPositiveNumber('0')).toBe(false);
      });
    });

    describe('when passed value is not number string', () => {
      it('should return false', () => {
        expect(isPositiveNumber('not number string')).toBe(false);
      });
    });
  });

  describe('isInInterval method', () => {
    describe('when passed value is in interval', () => {
      it('should return true', () => {
        expect(isInInterval(5, 10, 7)).toBe(true);
      });
    });

    describe('when passed value is more than max value', () => {
      it('should return false', () => {
        expect(isInInterval(5, 10, 11)).toBe(false);
      });
    });

    describe('when passed value is less than min value', () => {
      it('should return false', () => {
        expect(isInInterval(5, 10, 4)).toBe(false);
      });
    });
  });

  describe('isInIntervalOrNull method', () => {
    describe('when passed value is in interval', () => {
      it('should return true', () => {
        expect(isInIntervalOrNull(5, 10, 7)).toBe(true);
      });
    });

    describe('when passed value is null', () => {
      it('should return true', () => {
        expect(isInIntervalOrNull(5, 10, null)).toBe(true);
      });
    });

    describe('when passed value is more than max value', () => {
      it('should return false', () => {
        expect(isInIntervalOrNull(5, 10, 11)).toBe(false);
      });
    });

    describe('when passed value is less than min value', () => {
      it('should return false', () => {
        expect(isInIntervalOrNull(5, 10, 4)).toBe(false);
      });
    });
  });

  describe('isNotEmptyEditor method', () => {
    describe('when passed value has content after removing tags', () => {
      it('should return true', () => {
        expect(isNotEmptyEditor('<h1>hello</h1><b>world</b>')).toBe(true);
      });
    });

    describe('when passed value has space after removing tags', () => {
      it('should return false', () => {
        expect(isNotEmptyEditor(' <h1></h1><b></b>')).toBe(false);
      });
    });

    describe('when passed value has no content after removing tags', () => {
      it('should return false', () => {
        expect(isNotEmptyEditor('<h1></h1><b></b>')).toBe(false);
      });
    });

    describe('when value is not passed', () => {
      it('should return false', () => {
        expect(isNotEmptyEditor()).toBe(false);
      });
    });
  });

  describe('isSelected method', () => {
    describe('when passed value is true', () => {
      it('should return true', () => {
        expect(isSelected(true)).toBe(true);
      });
    });

    describe('when passed value is false', () => {
      it('should return true', () => {
        expect(isSelected(false)).toBe(true);
      });
    });

    describe('when value is not passed', () => {
      it('should return false', () => {
        expect(isSelected()).toBe(false);
      });
    });
  });

  describe('isGreaterOrEqualThanPassedField method', () => {
    const fieldToCompare = 'testProperty';
    describe('when passed value is greater than passed field', () => {
      const model = {
        [fieldToCompare]: 10,
      };

      it('should return true', () => {
        expect(isGreaterOrEqualThanPassedField(fieldToCompare, 20, model)).toBe(true);
      });
    });

    describe('when passed value is equal to passed field', () => {
      const model = {
        [fieldToCompare]: 10,
      };

      it('should return true', () => {
        expect(isGreaterOrEqualThanPassedField(fieldToCompare, 10, model)).toBe(true);
      });
    });

    describe('when passed value is less than passed field', () => {
      const model = {
        [fieldToCompare]: 10,
      };

      it('should return false', () => {
        expect(isGreaterOrEqualThanPassedField(fieldToCompare, 9, model)).toBe(false);
      });
    });
  });

  describe('isMaximumFineValueValid method', () => {
    const fieldToCompare = 'testProperty';
    describe('when passed value is more than zero and valueToCompare is more than zero', () => {
      const model = {
        [fieldToCompare]: 10,
      };

      it('should return true', () => {
        expect(isMaximumFineValueValid(fieldToCompare, 20, model)).toBe(true);
      });
    });

    describe('when passed value is more than zero and valueToCompare is less than zero', () => {
      const model = {
        [fieldToCompare]: -1,
      };

      it('should return false', () => {
        expect(isMaximumFineValueValid(fieldToCompare, 20, model)).toBe(false);
      });
    });

    describe('when passed value is less than zero and valueToCompare is more than zero', () => {
      const model = {
        [fieldToCompare]: 10,
      };

      it('should return false', () => {
        expect(isMaximumFineValueValid(fieldToCompare, -1, model)).toBe(false);
      });
    });

    describe('when passed value is less than zero and valueToCompare is less than zero', () => {
      const model = {
        [fieldToCompare]: -1,
      };

      it('should return false', () => {
        expect(isMaximumFineValueValid(fieldToCompare, -1, model)).toBe(false);
      });
    });
  });

  describe('hasNoChargeLostItemProcessingFee method', () => {
    describe('when chargeAmountItemPatron is true and chargeAmountItemSystem is true', () => {
      const model = {
        chargeAmountItemPatron: true,
        chargeAmountItemSystem: true,
      };

      it('should return true', () => {
        expect(hasNoChargeLostItemProcessingFee(null, model)).toBe(true);
      });
    });

    describe('when chargeAmountItemPatron is true and chargeAmountItemSystem is false', () => {
      const model = {
        chargeAmountItemPatron: true,
        chargeAmountItemSystem: false,
      };

      it('should return true', () => {
        expect(hasNoChargeLostItemProcessingFee(null, model)).toBe(true);
      });
    });

    describe('when chargeAmountItemPatron is false and chargeAmountItemSystem is true', () => {
      const model = {
        chargeAmountItemPatron: false,
        chargeAmountItemSystem: true,
      };

      it('should return true', () => {
        expect(hasNoChargeLostItemProcessingFee(null, model)).toBe(true);
      });
    });

    describe('when chargeAmountItemPatron is false and chargeAmountItemSystem is false', () => {
      const model = {
        chargeAmountItemPatron: false,
        chargeAmountItemSystem: false,
      };

      it('should return false', () => {
        expect(hasNoChargeLostItemProcessingFee(null, model)).toBe(false);
      });
    });
  });

  describe('hasLostItemProcessingFeeValue method', () => {
    describe('when lostItemProcessingFee is positive number', () => {
      const model = {
        lostItemProcessingFee: 1,
      };

      it('should return true', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(true);
      });
    });

    describe('when lostItemProcessingFee is string positive number', () => {
      const model = {
        lostItemProcessingFee: '1',
      };

      it('should return true', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(true);
      });
    });

    describe('when lostItemProcessingFee is zero number', () => {
      const model = {
        lostItemProcessingFee: 0,
      };

      it('should return false', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(false);
      });
    });

    describe('when lostItemProcessingFee is string zero number', () => {
      const model = {
        lostItemProcessingFee: '0',
      };

      it('should return false', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(false);
      });
    });

    describe('when lostItemProcessingFee is negative number', () => {
      const model = {
        lostItemProcessingFee: -1,
      };

      it('should return false', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(false);
      });
    });

    describe('when lostItemProcessingFee is string negative number', () => {
      const model = {
        lostItemProcessingFee: '-1',
      };

      it('should return false', () => {
        expect(hasLostItemProcessingFeeValue(null, model)).toBe(false);
      });
    });
  });

  describe('hasPositiveReplacementAllowed method', () => {
    describe('when replacementAllowed is true', () => {
      const model = {
        replacementAllowed: true,
      };

      it('should return true', () => {
        expect(hasPositiveReplacementAllowed(null, model)).toBe(true);
      });
    });

    describe('when replacementAllowed is false', () => {
      const model = {
        replacementAllowed: false,
      };

      it('should return false', () => {
        expect(hasPositiveReplacementAllowed(null, model)).toBe(false);
      });
    });
  });

  describe('isDueAfterTo method', () => {
    const pathToSection = 'pathToSection';
    describe('when due date is same as to date', () => {
      const due = new Date();
      const model = {
        [pathToSection]: {
          to: due,
        },
      };

      it('should return true', () => {
        expect(isDueAfterTo(due, model, { pathToSection })).toBe(true);
      });
    });

    describe('when due date is after to date', () => {
      const due = new Date();
      const model = {
        [pathToSection]: {
          to: new Date(due.getTime()).setDate(due.getDate() - 1),
        },
      };

      it('should return true', () => {
        expect(isDueAfterTo(due, model, { pathToSection })).toBe(true);
      });
    });

    describe('when due date is before to date', () => {
      const due = new Date();
      const model = {
        [pathToSection]: {
          to: new Date(due.getTime()).setDate(due.getDate() + 1),
        },
      };

      it('should return false', () => {
        expect(isDueAfterTo(due, model, { pathToSection })).toBe(false);
      });
    });
  });

  describe('isToBeforeFrom method', () => {
    const pathToSection = 'pathToSection';
    describe('when to date is after from date', () => {
      const to = new Date();
      const model = {
        [pathToSection]: {
          from: new Date(to.getTime()).setDate(to.getDate() - 1),
        },
      };

      it('should return true', () => {
        expect(isToBeforeFrom(to, model, { pathToSection })).toBe(true);
      });
    });

    describe('when to date is before from date', () => {
      const to = new Date();
      const model = {
        [pathToSection]: {
          from: new Date(to.getTime()).setDate(to.getDate() + 1),
        },
      };

      it('should return false', () => {
        expect(isToBeforeFrom(to, model, { pathToSection })).toBe(false);
      });
    });

    describe('when to date is same as from date', () => {
      const to = new Date();
      const model = {
        [pathToSection]: {
          from: to,
        },
      };

      it('should return false', () => {
        expect(isToBeforeFrom(to, model, { pathToSection })).toBe(false);
      });
    });
  });

  describe('hasChargeAmountItemSystemSelected method', () => {
    describe('when chargeAmountItemSystem is false', () => {
      const model = {
        chargeAmountItemSystem: false,
        itemAgedLostOverdue: {
          duration: '',
        },
        recalledItemAgedLostOverdue: {
          duration: '',
        },
      };

      it('should return true', () => {
        expect(hasChargeAmountItemSystemSelected(null, model)).toBe(true);
      });
    });

    describe('when itemAgedLostOverdue duration has value', () => {
      const model = {
        chargeAmountItemSystem: true,
        itemAgedLostOverdue: {
          duration: '1',
        },
        recalledItemAgedLostOverdue: {
          duration: '',
        },
      };

      it('should return true', () => {
        expect(hasChargeAmountItemSystemSelected(null, model)).toBe(true);
      });
    });

    describe('when recalledItemAgedLostOverdue duration has value', () => {
      const model = {
        chargeAmountItemSystem: true,
        itemAgedLostOverdue: {
          duration: '',
        },
        recalledItemAgedLostOverdue: {
          duration: '1',
        },
      };

      it('should return true', () => {
        expect(hasChargeAmountItemSystemSelected(null, model)).toBe(true);
      });
    });

    describe(`
      when chargeAmountItemSystem is true
      and itemAgedLostOverdue duration has no value
      and recalledItemAgedLostOverdue duration has no value
    `, () => {
      const model = {
        chargeAmountItemSystem: true,
        itemAgedLostOverdue: {
          duration: '',
        },
        recalledItemAgedLostOverdue: {
          duration: '',
        },
      };

      it('should return false', () => {
        expect(hasChargeAmountItemSystemSelected(null, model)).toBe(false);
      });
    });
  });

  describe('hasPatronBilledAfterAgedToLostValue method', () => {
    describe('when value is not empty and patronBilledAfterAgedLost duration is not empty', () => {
      const value = '1';
      const model = {
        patronBilledAfterAgedLost: {
          duration: '1',
        },
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterAgedToLostValue(value, model)).toBe(true);
      });
    });

    describe('when value is not empty and patronBilledAfterAgedLost duration is empty', () => {
      const value = '1';
      const model = {
        patronBilledAfterAgedLost: {
          duration: '',
        },
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterAgedToLostValue(value, model)).toBe(true);
      });
    });

    describe('when value is empty and patronBilledAfterAgedLost duration is not empty', () => {
      const value = '';
      const model = {
        patronBilledAfterAgedLost: {
          duration: '1',
        },
      };

      it('should return false', () => {
        expect(hasPatronBilledAfterAgedToLostValue(value, model)).toBe(false);
      });
    });
  });

  describe('isRquiredLostItemCharge method', () => {
    describe('when isRquiredLostItemCharge method return false and value is empty', () => {
      // eslint-disable-next-line func-names
      LostItemFeePolicy.mockImplementationOnce(function () {
        this.isRquiredLostItemCharge = () => false;
      });

      const value = '';
      const model = {};

      it('should return true', () => {
        expect(isRquiredLostItemCharge(value, model)).toBe(true);
      });
    });

    describe('when isRquiredLostItemCharge method return true and value is not empty', () => {
      // eslint-disable-next-line func-names
      LostItemFeePolicy.mockImplementationOnce(function () {
        this.isRquiredLostItemCharge = () => true;
      });

      const value = '1';
      const model = {};

      it('should return true', () => {
        expect(isRquiredLostItemCharge(value, model)).toBe(true);
      });
    });

    describe('when isRquiredLostItemCharge method return true and value is empty', () => {
      // eslint-disable-next-line func-names
      LostItemFeePolicy.mockImplementationOnce(function () {
        this.isRquiredLostItemCharge = () => true;
      });

      const value = '';
      const model = {};

      it('should return false', () => {
        expect(isRquiredLostItemCharge(value, model)).toBe(false);
      });
    });
  });

  describe('hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee method', () => {
    describe('when value is true and lostItemProcessingFee is more than zero', () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '1',
      };

      it('should return true', () => {
        expect(hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe('when value is false and lostItemProcessingFee is more than zero', () => {
      const value = false;
      const model = {
        lostItemProcessingFee: '1',
      };

      it('should return false', () => {
        expect(hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe('when value is true and lostItemProcessingFee is equal to zero', () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '0',
      };

      it('should return false', () => {
        expect(hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe('when value is true and lostItemProcessingFee is less than zero', () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '-1',
      };

      it('should return false', () => {
        expect(hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });
  });

  describe('hasPatronBilledAfterRecalledAgedToLostValue method', () => {
    describe('when patronBilledAfterRecalledItemAgedLost duration is undefined', () => {
      const model = {
        recalledItemAgedLostOverdue: {
          duration: '0',
        },
        patronBilledAfterRecalledItemAgedLost: {},
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterRecalledAgedToLostValue(null, model)).toBe(true);
      });
    });

    describe('when patronBilledAfterRecalledItemAgedLost duration is empty string', () => {
      const model = {
        recalledItemAgedLostOverdue: {
          duration: '0',
        },
        patronBilledAfterRecalledItemAgedLost: {
          duration: '',
        },
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterRecalledAgedToLostValue(null, model)).toBe(true);
      });
    });

    describe(`
      when recalledItemAgedLostOverdue duration has value
      and patronBilledAfterRecalledItemAgedLost duration is more than zero
    `, () => {
      const model = {
        recalledItemAgedLostOverdue: {
          duration: '0',
        },
        patronBilledAfterRecalledItemAgedLost: {
          duration: '1',
        },
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterRecalledAgedToLostValue(null, model)).toBe(true);
      });
    });

    describe(`
      when recalledItemAgedLostOverdue duration has value
      and patronBilledAfterRecalledItemAgedLost duration is equal to zero
    `, () => {
      const model = {
        recalledItemAgedLostOverdue: {
          duration: '0',
        },
        patronBilledAfterRecalledItemAgedLost: {
          duration: '0',
        },
      };

      it('should return true', () => {
        expect(hasPatronBilledAfterRecalledAgedToLostValue(null, model)).toBe(true);
      });
    });

    describe(`
      when recalledItemAgedLostOverdue duration has value
      and patronBilledAfterRecalledItemAgedLost duration is less than zero
    `, () => {
      const model = {
        recalledItemAgedLostOverdue: {
          duration: '0',
        },
        patronBilledAfterRecalledItemAgedLost: {
          duration: '-1',
        },
      };

      it('should return false', () => {
        expect(hasPatronBilledAfterRecalledAgedToLostValue(null, model)).toBe(false);
      });
    });
  });

  describe('hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue method', () => {
    describe(`
      when value is true
      and lostItemProcessingFee is less than zero
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '-10.10',
        itemAgedLostOverdue: {
          duration: '10.10',
        },
      };

      it('should return true', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(true);
      });
    });

    describe(`
      when value is false
      and lostItemProcessingFee is less than zero
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = false;
      const model = {
        lostItemProcessingFee: '-10.10',
        itemAgedLostOverdue: {
          duration: '10.10',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and lostItemProcessingFee is equal to zero
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '0',
        itemAgedLostOverdue: {
          duration: '10.10',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and lostItemProcessingFee is more than zero
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '10.10',
        itemAgedLostOverdue: {
          duration: '10.10',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and lostItemProcessingFee is less than zero
      and itemAgedLostOverdue duration is equal to zero
    `, () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '-10.10',
        itemAgedLostOverdue: {
          duration: '0',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and lostItemProcessingFee is less than zero
      and itemAgedLostOverdue duration is less than zero
    `, () => {
      const value = true;
      const model = {
        lostItemProcessingFee: '-10.10',
        itemAgedLostOverdue: {
          duration: '-10.10',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });
  });

  describe('hasPositiveItemsAgedToLostAfterOverdueAmount method', () => {
    describe(`
      when value is equal to zero
      and chargeType is anotherCost
      and chargeAmountItemSystem is true
    `, () => {
      const value = '0';
      const model = {
        chargeAmountItem: {
          chargeType: 'anotherCost',
        },
        chargeAmountItemSystem: true,
      };

      it('should return true', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(true);
      });
    });

    describe(`
      when value is more than zero
      and chargeType is anotherCost
      and chargeAmountItemSystem is false
    `, () => {
      const value = '10';
      const model = {
        chargeAmountItem: {
          chargeType: 'anotherCost',
        },
        chargeAmountItemSystem: false,
      };

      it('should return true', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(true);
      });
    });

    describe(`
      when value is more than zero
      and chargeType is not anotherCost
      and chargeAmountItemSystem is false
    `, () => {
      const value = '10';
      const model = {
        chargeAmountItem: {
          chargeType: 'notAnotherCost',
        },
        chargeAmountItemSystem: false,
      };

      it('should return false', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(false);
      });
    });

    describe(`
      when value is equal to zero
      and chargeType is not anotherCost
      and chargeAmountItemSystem is true
    `, () => {
      const value = '10';
      const model = {
        chargeAmountItem: {
          chargeType: 'notAnotherCost',
        },
        chargeAmountItemSystem: true,
      };

      it('should return false', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(false);
      });
    });

    describe(`
      when value is less than zero
      and chargeType is anotherCost
      and chargeAmountItemSystem is false
    `, () => {
      const value = '-10';
      const model = {
        chargeAmountItem: {
          chargeType: 'anotherCost',
        },
        chargeAmountItemSystem: false,
      };

      it('should return false', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(false);
      });
    });

    describe(`
      when value is undefined
      and chargeType is anotherCost
      and chargeAmountItemSystem is false
    `, () => {
      const value = undefined;
      const model = {
        chargeAmountItem: {
          chargeType: 'anotherCost',
        },
        chargeAmountItemSystem: false,
      };

      it('should return false', () => {
        expect(hasPositiveItemsAgedToLostAfterOverdueAmount(value, model)).toBe(false);
      });
    });
  });

  describe('hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue method', () => {
    describe(`
      when value is true
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = true;
      const model = {
        itemAgedLostOverdue: {
          duration: '10',
        },
      };

      it('should return true', () => {
        expect(hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue(value, model)).toBe(true);
      });
    });

    describe(`
      when value is false
      and itemAgedLostOverdue duration is more than zero
    `, () => {
      const value = false;
      const model = {
        itemAgedLostOverdue: {
          duration: '10',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and itemAgedLostOverdue duration is equal to zero
    `, () => {
      const value = true;
      const model = {
        itemAgedLostOverdue: {
          duration: '0',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and itemAgedLostOverdue duration is less than zero
    `, () => {
      const value = true;
      const model = {
        itemAgedLostOverdue: {
          duration: '-1',
        },
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and itemAgedLostOverdue duration is undefined
    `, () => {
      const value = true;
      const model = {
        itemAgedLostOverdue: {},
      };

      it('should return false', () => {
        expect(hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue(value, model)).toBe(false);
      });
    });
  });

  describe('hasReplacementAllowedAndPositiveLostItemPolicyFee method', () => {
    describe(`
      when value is true
      and replacementAllowed is false
      and lostItemProcessingFee is more than zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: false,
        lostItemProcessingFee: '10.10',
      };

      it('should return true', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is true
      and lostItemProcessingFee is equal to zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '0',
      };

      it('should return true', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is true
      and lostItemProcessingFee is less than zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '-1',
      };

      it('should return true', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe(`
      when value is false
      and replacementAllowed is true
      and lostItemProcessingFee is less than zero
    `, () => {
      const value = false;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '-1',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is false
      and lostItemProcessingFee is equal to zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: false,
        lostItemProcessingFee: '0',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is false
      and lostItemProcessingFee is less than zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: false,
        lostItemProcessingFee: '-1',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndPositiveLostItemPolicyFee(value, model)).toBe(false);
      });
    });
  });

  describe('hasReplacementAllowedAndNegativeLostItemPolicyFee method', () => {
    describe(`
      when value is true
      and replacementAllowed is true
      and lostItemProcessingFee is more than zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '10.10',
      };

      it('should return true', () => {
        expect(hasReplacementAllowedAndNegativeLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is true
      and lostItemProcessingFee is equal to zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '0',
      };

      it('should return true', () => {
        expect(hasReplacementAllowedAndNegativeLostItemPolicyFee(value, model)).toBe(true);
      });
    });

    describe(`
      when value is false
      and replacementAllowed is true
      and lostItemProcessingFee is equal to zero
    `, () => {
      const value = false;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '0',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndNegativeLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is false
      and lostItemProcessingFee is equal to zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: false,
        lostItemProcessingFee: '0',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndNegativeLostItemPolicyFee(value, model)).toBe(false);
      });
    });

    describe(`
      when value is true
      and replacementAllowed is true
      and lostItemProcessingFee is less than zero
    `, () => {
      const value = true;
      const model = {
        replacementAllowed: true,
        lostItemProcessingFee: '-1',
      };

      it('should return false', () => {
        expect(hasReplacementAllowedAndNegativeLostItemPolicyFee(value, model)).toBe(false);
      });
    });
  });
});
