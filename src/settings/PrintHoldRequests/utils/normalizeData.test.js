import normalizeData from './normalizeData';
import {
  PRINT_HOLD_REQUESTS,
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

describe('normalizeData', () => {
  it('should returns default values when no value or disabled', () => {
    expect(normalizeData()).toBe(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
    expect(normalizeData({})).toBe(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
    expect(normalizeData({ [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: false }))
      .toBe(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
  });

  it('should returns input value when enabled', () => {
    const enabledData = { [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true };

    expect(normalizeData(enabledData)).toBe(enabledData);
  });
});
