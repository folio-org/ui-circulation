import getInitialValues from './getInitialValues';
import {
  PRINT_HOLD_REQUESTS,
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

describe('getInitialValues', () => {
  it('should returns default values when input is empty', () => {
    expect(getInitialValues()).toEqual(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues([])).toEqual(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues({})).toEqual(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
  });

  it('should merges provided values with defaults', () => {
    const customValues = {
      [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true,
      anotherField: 'test',
    };
    const expected = {
      ...PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
      ...customValues,
    };

    expect(getInitialValues(customValues)).toEqual(expected);
  });
});
