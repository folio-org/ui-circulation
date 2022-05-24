import LostItem from './LostItem';
import { commonClassCheck } from '../../../../test/jest/helpers/utils';

const testLostItem = commonClassCheck.bind(null, LostItem);

describe('LostItem', () => {
  testLostItem();

  testLostItem({ duration: 'testDuration' });

  testLostItem({ intervalId: 'testIntervalId' });

  describe('isPeriodValid', () => {
    it('should return true if valid combination is passed', () => {
      expect(LostItem.isPeriodValid({
        duration: 99,
        intervalId: 'testIntervalId',
      })).toBe(true);
    });

    it('should return false if "duration" is not a number', () => {
      expect(LostItem.isPeriodValid({
        duration: '99',
        intervalId: 'testIntervalId',
      })).toBe(false);
    });

    it('should return false if "duration" less or equal to 0', () => {
      expect(LostItem.isPeriodValid({
        duration: 0,
        intervalId: 'testIntervalId',
      })).toBe(false);
    });

    it('should return false if "intervalId" is not passed', () => {
      expect(LostItem.isPeriodValid({ duration: 99 })).toBe(false);
    });

    it('should return false if nothing passed', () => {
      expect(LostItem.isPeriodValid()).toBe(false);
    });
  });
});
