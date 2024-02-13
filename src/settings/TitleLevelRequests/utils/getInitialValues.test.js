import getInitialValues from './getInitialValues';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  TITLE_LEVEL_REQUESTS,
} from '../../../constants';

describe('getInitialValues', () => {
  it('should return default config if nothing found in database', () => {
    expect(getInitialValues()).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });

  it('should return config with values from database', () => {
    const testData = [
      {
        value: {
          [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
        },
      },
    ];
    const expectedData = {
      ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
      [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
    };

    expect(getInitialValues(testData)).toEqual(expectedData);
  });
});
