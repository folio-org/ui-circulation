import initFoldRules from './initFoldRules';

describe('initFoldRules', () => {
  let result;
  const mockedLinesData = [
    'firstTestLine',
    '#secondTestLine',
    'thirdTestLine',
    'fourthTestLine',
    '#fifthTestLine',
    '#sixthTestLine',
  ];
  const cm = {
    getLine: (lineNumber) => mockedLinesData[lineNumber],
    lastLine: () => mockedLinesData.length - 1,
  };
  const CodeMirror = (start) => ({
    registerHelper: (fold, rules, calback) => { result = calback(cm, start); },
    Pos: (position, lineLength) => ({ position, lineLength }),
  });

  describe('when text do not starts from "#" symbol', () => {
    it('should return undefined', () => {
      initFoldRules(CodeMirror({ line: 0 }));

      expect(result).toBeUndefined();
    });
  });

  describe('when text starts from "#"', () => {
    describe('when data contatins few more lines without # after passed line', () => {
      it('should correctly process passed data', () => {
        const line = 1;
        const expectedResult = {
          from: {
            position: line,
            lineLength: mockedLinesData[line].length,
          },
          to: {
            position: 3,
            lineLength: mockedLinesData[3].length,
          },
        };

        initFoldRules(CodeMirror({ line }));

        expect(result).toEqual(expectedResult);
      });
    });

    describe('when the next string after passed one starts from #', () => {
      it('should return undefined', () => {
        initFoldRules(CodeMirror({ line: 4 }));

        expect(result).toBeUndefined();
      });
    });
  });
});
