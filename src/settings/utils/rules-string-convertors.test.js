import {
  isPriorityLine,
  isCommentSymbol,
  isWordsSeparatingSymbol,
  convertNamesToIds,
  convertIdsToNames,
  convertNamesToIdsInLine,
} from './rules-string-convertors';
import {
  EDITOR_SPECIAL_SYMBOL,
  WHITE_SPACE,
} from '../../constants';

describe('settings utils', () => {
  describe('isPriorityLine', () => {
    it('should return true if line is priority', () => {
      const mockedLineContent = 'test data with priority';

      expect(isPriorityLine(mockedLineContent)).toBe(true);
    });

    it('should return false if line is not priority', () => {
      const mockedLineContent = 'test data';

      expect(isPriorityLine(mockedLineContent)).toBe(false);
    });
  });

  describe('isCommentSymbol', () => {
    const { HASH, SLASH } = EDITOR_SPECIAL_SYMBOL;

    it(`should return true if symbol is "${HASH}"`, () => {
      expect(isCommentSymbol(HASH)).toBe(true);
    });

    it(`should return true if symbol is "${SLASH}"`, () => {
      expect(isCommentSymbol(SLASH)).toBe(true);
    });

    it(`should return false if symbol is not "${HASH}" or "${SLASH}"`, () => {
      Object.values(EDITOR_SPECIAL_SYMBOL).forEach(item => {
        if (item !== HASH && item !== SLASH) {
          expect(isCommentSymbol(item)).toBe(false);
        }
      });
    });
  });

  describe('isWordsSeparatingSymbol', () => {
    const { PLUS, COLON } = EDITOR_SPECIAL_SYMBOL;

    it(`should return true if symbol is "${PLUS}"`, () => {
      expect(isWordsSeparatingSymbol(PLUS)).toBe(true);
    });

    it(`should return true if symbol is "${COLON}"`, () => {
      expect(isWordsSeparatingSymbol(COLON)).toBe(true);
    });

    it('should return true if symbol is "white space"', () => {
      expect(isWordsSeparatingSymbol(WHITE_SPACE)).toBe(true);
    });

    it(`should return false if symbol is not "${PLUS}", "${COLON}" or "white space"`, () => {
      Object.values(EDITOR_SPECIAL_SYMBOL).forEach(item => {
        if (item !== PLUS && item !== COLON) {
          expect(isWordsSeparatingSymbol(item)).toBe(false);
        }
      });
    });
  });

  describe('convertNamesToIds', () => {
    it('should replace name with corresponding id correctly', () => {
      const mockedLineContent = 'fallback-policy: l firstTestName \nl secondTestName';
      const mockedRecords = {
        l: {
          'firstTestName': 'firstTestData',
          'secondTestName': 'secondTestData',
        },
      };
      const expectedResult = 'fallback-policy: l firstTestData \nl secondTestData';

      expect(convertNamesToIds(mockedLineContent, mockedRecords)).toBe(expectedResult);
    });
  });

  describe('convertIdsToNames', () => {
    it('should replace id with corresponding name correctly', () => {
      const mockedLineContent = 'key testData';
      const mockedRecords = {
        key: {
          'expected-name': 'testData',
        },
      };
      const expectedResult = 'key expected-name';

      expect(convertIdsToNames(mockedLineContent, mockedRecords)).toBe(expectedResult);
    });
  });

  describe('convertNamesToIdsInLine', () => {
    const mockedRecords = {
      l: {
        'example-loan-policy': 'testData',
      },
    };
    const mockedItemsTypes = ['l'];

    it('should return unchanged data if line is priority', () => {
      const mockedLineContent = 'test priority test';

      expect(convertNamesToIdsInLine(mockedLineContent)).toBe(mockedLineContent);
    });

    it('should not change data if invalid type is passed', () => {
      const mockedLineContent = 'fallback-policy: r example-loan-policy';

      expect(convertNamesToIdsInLine(mockedLineContent, mockedRecords, mockedItemsTypes)).toBe(mockedLineContent);
    });

    it('should not change data if have no correct key in rule record', () => {
      const mockedLineContent = 'fallback-policy: l something';

      expect(convertNamesToIdsInLine(mockedLineContent, mockedRecords, mockedItemsTypes)).toBe(mockedLineContent);
    });

    it('should not transform comment part in passed string', () => {
      const mockedLineContent = 'fallback-policy: !l example-loan-policy /l example-loan-policy';
      const expectedResult = 'fallback-policy: !l testData /l example-loan-policy';

      expect(convertNamesToIdsInLine(mockedLineContent, mockedRecords, mockedItemsTypes)).toBe(expectedResult);
    });
  });
});
