import getInitialValues from './getInitialValues';

import {
  PRINT_HOLD_REQUESTS,
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

describe('getInitialValues', () => {
  it('should return default config if nothing found in database', () => {
    expect(getInitialValues()).toEqual(PRINT_HOLD_REQUESTS_DEFAULT_VALUES);
  });

  it('should return default config with values from database', () => {
    const testData = [
      {
        value: JSON.stringify({
          [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true,
        }),
      },
    ];
    const expectedData = {
      ...PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
      [PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]: true,
    };

    expect(getInitialValues(testData)).toEqual(expectedData);
  });
});
