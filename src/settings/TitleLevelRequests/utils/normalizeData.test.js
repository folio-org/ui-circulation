import normalizeData from './normalizeData';
import { TITLE_LEVEL_REQUESTS_DEFAULT_VALUES } from '../../../constants';

describe('normalizeData', () => {
  it('should return modified passed config if "TLR" is allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: true,
    };
    const expectedResult = {
      titleLevelRequestsFeatureEnabled: true,
    };

    expect(normalizeData(testData)).toEqual(expectedResult);
  });

  it('should return default config if "TLR" is not allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: false,
      someData: 'test',
    };

    expect(normalizeData(testData)).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });
});
