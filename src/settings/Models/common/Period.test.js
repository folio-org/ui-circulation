import Period from './Period';
import { commonClassCheck } from '../../../../test/jest/helpers/utils';

const testPeriod = commonClassCheck.bind(null, Period);

describe('Period', () => {
  testPeriod();

  testPeriod({ duration: 'testDuration' });

  testPeriod({ intervalId: 'testIntervalId' });

  describe('isPeriodValid', () => {
    it('should return true if valid combination is passed', () => {
      expect(Period.isPeriodValid({
        duration: -99,
        intervalId: 'testIntervalId',
      })).toBe(true);
    });

    it('should return false if "duration" is not a number', () => {
      expect(Period.isPeriodValid({
        duration: '-99',
        intervalId: 'testIntervalId',
      })).toBe(false);
    });

    it('should return false if "intervalId" is not passed', () => {
      expect(Period.isPeriodValid({ duration: -99 })).toBe(false);
    });

    it('should return false if nothing passed', () => {
      expect(Period.isPeriodValid()).toBe(false);
    });
  });
});
