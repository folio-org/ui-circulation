import Period from './Period';
import {
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers/utils';

describe('Period', () => {
  const testData = {
    duration: 'testDuration',
    intervalId: 'testIntervalId',
  };

  commonClassCheckForEachProp(Period, testData);

  commonClassCheckForAllProps(Period, testData);

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
