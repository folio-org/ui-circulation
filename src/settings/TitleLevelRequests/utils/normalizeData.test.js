import normalizeData from './normalizeData';
import { TITLE_LEVEL_REQUESTS_DEFAULT_VALUES } from '../../../constants';

describe('normalizeData', () => {
  it('should return modified passed config if "TLR" is allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: true,
      someData: 'test',
    };

    expect(normalizeData(testData)).toBe(JSON.stringify(testData));
  });

  it('should return modified default config if "TLR" is not allowed', () => {
    const testData = {
      titleLevelRequestsFeatureEnabled: false,
      someData: 'test',
    };

    expect(normalizeData(testData)).toBe(JSON.stringify(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES));
  });
});
