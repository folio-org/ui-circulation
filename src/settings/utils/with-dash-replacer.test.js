import replacer from './with-dash-replacer';

describe('settings utils', () => {
  describe('replacer', () => {
    it('should remove any not a word character at start of the line', () => {
      expect(replacer('  ^&;\ntest')).toBe('test');
    });

    it('should remove any not a word character at the end of the line', () => {
      expect(replacer('test  ^&;\n')).toBe('test');
    });

    it('should replace any not a word characters in the middle of the string to "-"', () => {
      expect(replacer('test  &&^^::\ntest')).toBe('test-test');
    });
  });
});
