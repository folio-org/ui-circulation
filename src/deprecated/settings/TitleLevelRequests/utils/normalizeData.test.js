import normalizeData from './normalizeData';
import {
  TITLE_LEVEL_REQUESTS,
  NOT_SELECTED,
} from '../../../../constants';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
} from '../constants';

describe('deprecated normalizeData', () => {
  const testId = 'testId';

  it('should return modified passed config if "TLR" is allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: true,
      someData: 'test',
      [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: NOT_SELECTED,
      [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: NOT_SELECTED,
      [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: testId,
    };

    const expectedResult = {
      titleLevelRequestsFeatureEnabled: true,
      someData: 'test',
      [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: null,
      [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: null,
      [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: testId,
    };

    expect(normalizeData(testData)).toEqual(expectedResult);
  });

  it('should return modified default config if "TLR" is not allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: false,
      someData: 'test',
    };

    expect(normalizeData(testData)).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });
});
