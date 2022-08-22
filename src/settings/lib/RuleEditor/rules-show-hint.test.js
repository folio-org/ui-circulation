import CodeMirror from 'codemirror';
import { noop } from 'lodash';

import rulesShowHint from './rules-show-hint';
import * as utils from './utils';

jest.mock('codemirror', () => ({
  hint: {
    auto: {
      resolve: jest.fn(),
    },
    fromList: jest.fn(),
    anyword: null,
  },
  registerHelper: jest.fn(),
  defineExtension: jest.fn(),
  defineOption: jest.fn(),
  signal: jest.fn(),
  Pos: jest.fn(),
  commands: {},
}));
jest.mock('./utils', () => ({
  showHint: jest.fn(),
  getText: jest.fn(),
  addIndentToEditorRules: jest.fn(),
  fetchHints: jest.fn(),
  isChildTextInputField: jest.fn(),
  createContainer: jest.fn(),
  createHeader: jest.fn(),
  isAnyItem: jest.fn(),
  getApplicableHelpers: jest.fn(),
}));

describe('rulesShowHint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showHintValue', () => {
    const initialOptions = {
      hint: {},
    };
    const commonCodeMirrorMocks = {
      getCursor: () => {},
      listSelections: () => [],
      on: () => {},
      getLine: () => 1,
      getSelection: () => [],
      showHintValue: rulesShowHint.showHintValue,
      options: {
        hintOptions: {},
      },
      startPos: {
        line: 1,
      },
    };

    describe('when "selections.length" more than 1', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [1, 2],
        };

        expect(fakeCodeMirror.showHintValue(initialOptions)).toBeUndefined();
      });
    });

    describe('when there is no "supportsSelection"', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          somethingSelected: () => true,
        };

        expect(fakeCodeMirror.showHintValue(initialOptions)).toBeUndefined();
      });
    });

    describe('when "supportsSelection" exists', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [
            {
              head: {
                line: 'test',
              },
              anchor: {
                line: 'test_2',
              },
            }
          ],
          somethingSelected: () => true,
        };
        const options = {
          hint: {
            supportsSelection: true,
          },
        };

        expect(fakeCodeMirror.showHintValue(options)).toBeUndefined();
      });

      it('should trigger "close"', () => {
        const line = 'test';
        const close = jest.fn();
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [
            {
              head: {
                line,
              },
              anchor: {
                line,
              },
            }
          ],
          getCursor: () => ({ line }),
          somethingSelected: () => true,
          state: {
            completionActive: {
              close,
            },
          },
        };
        const options = {
          hint: {
            supportsSelection: true,
          },
        };

        fakeCodeMirror.showHintValue(options);

        expect(close).toHaveBeenCalled();
      });
    });

    describe('when there is no "hint" and "somethingSelected" returns false', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          getCursor: () => ({ line: 'test' }),
          somethingSelected: () => false,
          state: {},
        };

        expect(fakeCodeMirror.showHintValue(rulesShowHint.defaultOptions)).toBeUndefined();
      });
    });
  });

  describe('parseOptions', () => {
    const hintOptions = {
      test: 'test',
    };
    const options = {
      test_2: 'test_2',
    };
    const cm = {
      options: {
        hintOptions,
      },
    };
    const pos = {};

    describe('when "parsedOptions.hint.resolve" exists', () => {
      it('should trigger "resolve" with correct arguments', () => {
        const resolve = jest.fn();

        CodeMirror.hint.auto.resolve.mockImplementationOnce(resolve);
        rulesShowHint.parseOptions(cm, pos, options);

        expect(resolve).toHaveBeenCalledWith(cm, pos);
      });

      it('should return options', () => {
        const resolveResult = 'test_result';
        const expectedResult = {
          ...hintOptions,
          ...options,
          ...rulesShowHint.defaultOptions,
          hint: resolveResult,
        };

        CodeMirror.hint.auto.resolve.mockImplementationOnce(() => resolveResult);

        expect(rulesShowHint.parseOptions(cm, pos, options)).toEqual(expectedResult);
      });
    });
  });

  describe('resolveAutoHints', () => {
    describe('when "getHelpers" returns array with data', () => {
      const helpers = ['helper'];
      const applicableHelpers = [];
      const cm = {
        getHelpers: () => helpers,
      };
      const options = {};
      const codeMirror = {};
      const returnedFunction = rulesShowHint.resolveAutoHints(cm);

      it('should return function which has additional properties', () => {
        const expectedProperties = {
          async: true,
          supportsSelection: true,
        };

        expect(returnedFunction).toEqual(expect.objectContaining(expectedProperties));
      });

      it('should trigger "getApplicableHelpers" from returned function', () => {
        const getApplicableHelpersSpy = jest.spyOn(utils, 'getApplicableHelpers')
          .mockReturnValueOnce(applicableHelpers);

        returnedFunction(codeMirror, () => {}, options);

        expect(getApplicableHelpersSpy).toHaveBeenCalledWith(codeMirror, helpers);
      });

      it('should trigger "callback" with null', () => {
        const callback = jest.fn();

        utils.getApplicableHelpers.mockReturnValueOnce(applicableHelpers);
        returnedFunction(codeMirror, callback, options);

        expect(callback).toHaveBeenCalledWith(null);
      });

      it('should trigger "fetchHints"', () => {
        const fetchHintsSpy = jest.spyOn(utils, 'fetchHints').mockImplementationOnce((helper, codeM, opt, callback) => callback());
        const appHelper = [{}];
        const helperIndex = 0;

        utils.getApplicableHelpers.mockReturnValueOnce(appHelper);
        returnedFunction(codeMirror, () => {}, options);

        expect(fetchHintsSpy).toHaveBeenCalledWith(appHelper[helperIndex], codeMirror, options, expect.any(Function));
      });
    });

    describe('when "getHelpers" returns empty array', () => {
      const cm = {
        getHelpers: () => [],
        getCursor: () => [],
      };

      it('should return noop', () => {
        const getHelper = jest.fn(() => '');

        expect(rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        })).toBe(noop);
      });

      it('should trigger "fromList" from returned function', () => {
        const fromListSpy = jest.spyOn(CodeMirror.hint, 'fromList');
        const words = 'test';
        const getHelper = jest.fn(() => words);
        const codeMirror = {};
        const returnedFunction = rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        });

        returnedFunction(codeMirror);

        expect(fromListSpy).toHaveBeenCalledWith(codeMirror, { words });
      });

      it('should trigger "anyword" from returned function', () => {
        const anyword = jest.fn();
        const getHelper = jest.fn(() => '');
        const codeMirror = {};
        const options = {};

        CodeMirror.hint.anyword = anyword;

        const returnedFunction = rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        });

        returnedFunction(codeMirror, options);

        expect(anyword).toHaveBeenCalledWith(codeMirror, options);
      });
    });
  });

  describe('getFromList', () => {
    const line = 1;
    const to = 5;
    const from = 8;
    const string = 'string';
    const commonCm = {
      getCursor: () => ({
        line,
      }),
      getTokenAt: () => ({
        end: 1,
        start: 2,
        string,
      }),
    };
    const options = {
      words: [],
    };

    describe('when there are founded words', () => {
      it('should use "CodeMirror.Pos" data for returned object', () => {
        const words = [string];
        const expectedResult = {
          list: words,
          from,
          to,
        };

        CodeMirror.Pos
          .mockReturnValueOnce(to)
          .mockReturnValueOnce(from);

        expect(rulesShowHint.getFromList(commonCm, { words })).toEqual(expectedResult);
      });

      it('should return "from" and "to" properties which are equal', () => {
        const words = [''];
        const cm = {
          ...commonCm,
          getTokenAt: () => ({
            end: 1,
            start: 2,
          }),
        };
        const expectedResult = {
          list: words,
          from: to,
          to,
        };

        CodeMirror.Pos
          .mockReturnValueOnce(to);

        expect(rulesShowHint.getFromList(cm, { words })).toEqual(expectedResult);
      });
    });

    describe('when there are no founded words', () => {
      it('should return undefined', () => {
        expect(rulesShowHint.getFromList(commonCm, options)).toBeUndefined();
      });
    });
  });
});
