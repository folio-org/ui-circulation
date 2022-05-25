import OverdueFine from './OverdueFine';
import {
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers/utils';

describe('OverdueFine', () => {
  const testData = {
    quantity: 'testQuantity',
    intervalId: 'testIntervalId',
  };

  commonClassCheckForEachProp(OverdueFine, testData);

  commonClassCheckForAllProps(OverdueFine, testData);

  describe('isPeriodValid', () => {
    it('should return true if valid combination is passed', () => {
      expect(OverdueFine.isPeriodValid({
        quantity: -99,
        intervalId: 'testIntervalId',
      })).toBe(true);
    });

    it('should return false if "quantity" is not a number', () => {
      expect(OverdueFine.isPeriodValid({
        quantity: '-99',
        intervalId: 'testIntervalId',
      })).toBe(false);
    });

    it('should return false if "intervalId" is not passed', () => {
      expect(OverdueFine.isPeriodValid({ quantity: -99 })).toBe(false);
    });

    it('should return false if nothing passed', () => {
      expect(OverdueFine.isPeriodValid()).toBe(false);
    });
  });
});
