import OverdueFine from './OverdueFine';
import { commonClassCheck } from '../../../../test/jest/helpers/utils';

const testOverdueFine = commonClassCheck.bind(null, OverdueFine);

describe('OverdueFine', () => {
  testOverdueFine();

  testOverdueFine({ quantity: 'testQuantity' });

  testOverdueFine({ intervalId: 'testQuantity' });

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
