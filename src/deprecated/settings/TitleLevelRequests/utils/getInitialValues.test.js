import getInitialValues from './getInitialValues';
import {
  TITLE_LEVEL_REQUESTS,
} from '../../../../constants';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
} from '../constants';

describe('deprecated getInitialValues', () => {
  it('should return default config if nothing found in database', () => {
    expect(getInitialValues()).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });

  it('should return config with values from database', () => {
    const testData = [
      {
        value: JSON.stringify({
          [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
          [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: 'testId',
          [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: null,
          [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: null,
        }),
      },
    ];
    const expectedData = {
      ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
      [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
      [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: 'testId',
    };

    expect(getInitialValues(testData)).toEqual(expectedData);
  });
});
