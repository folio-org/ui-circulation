import getRealTimeLabels, {
  REAL_TIME_NOTICES_TRANSLATION_KEYS,
} from './get-real-time-labels';

describe('getRealTimeLabels', () => {
  it('should return feeFineNotices keys', () => {
    expect(getRealTimeLabels(true)).toEqual(REAL_TIME_NOTICES_TRANSLATION_KEYS.feeFineNotices);
  });

  it('should return loanNotices keys', () => {
    expect(getRealTimeLabels(false)).toEqual(REAL_TIME_NOTICES_TRANSLATION_KEYS.loanNotices);
  });
});
