import normalizeData from './normalizeData';

import {
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
  PRINT_HOLD_REQUESTS,
} from '../../../constants';

describe('normalizeData', () => {
  it('should return default values', () => {
    expect(normalizeData()).toBe(JSON.stringify(PRINT_HOLD_REQUESTS_DEFAULT_VALUES));
  });

  it('should return values', () => {
    const testData = {
      [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true,
    };
    const expectedResult = {
      [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true,
    };

    expect(normalizeData(testData)).toBe(JSON.stringify(expectedResult));
  });
});
