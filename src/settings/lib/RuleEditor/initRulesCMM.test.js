import {
  EDITOR_KEYWORD,
  EDITOR_SPECIAL_SYMBOL,
  RULES_TYPE,
} from '../../../constants';
import initRulesCMM, {
  hooks,
  processToken,
  defineRulesCMM,
} from './initRulesCMM';

describe('initRulesCMM', () => {
  describe('hooks', () => {
    describe('hash', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };
        const state = {};

        expect(hooks[EDITOR_SPECIAL_SYMBOL.HASH](stream, state)).toBe('ruleName');
        expect(state.ruleLine).toBe(true);
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/[^/]/));
      });
    });

    describe('slash', () => {
      it('should work correctly', () => {
        const stream = {
          skipToEnd: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.SLASH](stream)).toBe('comment');
        expect(stream.skipToEnd).toHaveBeenCalled();
      });
    });

    describe('comma', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.COMMA](stream)).toBe('comma');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });

    describe('plus', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.PLUS](stream)).toBe('and');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });

    describe('colon', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };
        const state = {};

        hooks[EDITOR_SPECIAL_SYMBOL.COLON](stream, state);

        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
        expect(state.rValue).toBe(true);
        expect(state.keyProperty).toBe(null);
      });
    });

    describe('negation', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.NEGATION](stream)).toBe('not');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });
  });

  describe('processToken', () => {
    const commonStream = {
      sol: () => true,
      eatSpace: () => true,
      skipToEnd: jest.fn(),
      next: jest.fn(),
      eatWhile: jest.fn(),
    };
    const commonParserConfig = {
      typeMapping: {},
      policyMapping: {},
      completionLists: {},
      keySelector: '',
    };

    describe('when "stream.sol" returns true and "stream.eatSpace" returns true', () => {
      const state = {};
      const result = processToken(commonStream, state, commonParserConfig);

      it('should return "null"', () => {
        expect(result).toBeNull();
      });

      it('should modify "state"', () => {
        expect(state.rValue).toEqual(false);
        expect(state.keyProperty).toEqual(null);
      });
    });

    describe('when "stream.sol" returns true and "stream.eatSpace" returns false', () => {
      const state = {};
      const stream = {
        ...commonStream,
        eatSpace: () => false,
        next: jest.fn(),
        current: jest.fn(),
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return "null"', () => {
        expect(result).toBeNull();
      });

      it('should modify "state"', () => {
        expect(state.rValue).toEqual(false);
        expect(state.keyProperty).toEqual(null);
      });
    });

    describe('when "stream.sol" returns false and "stream.eatSpace" returns true', () => {
      const state = {};
      const stream = {
        ...commonStream,
        sol: () => false,
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return "null"', () => {
        expect(result).toBeNull();
      });

      it('should not modify "state"', () => {
        const expectedResult = {};

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "stream.next" returns SLASH hook', () => {
      const state = {};
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => EDITOR_SPECIAL_SYMBOL.SLASH,
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return correct result', () => {
        const expectedResult = 'comment';

        expect(result).toEqual(expectedResult);
      });

      it('should not modify state', () => {
        const expectedResult = {};

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "stream.next" returns NEGATION hook', () => {
      const state = {};
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => EDITOR_SPECIAL_SYMBOL.NEGATION,
      };

      it('should return correct result', () => {
        const expectedResult = 'not';
        const result = processToken(stream, state, commonParserConfig);

        expect(result).toEqual(expectedResult);
      });

      it('should modify state', () => {
        const expectedResult = {
          ruleLine: false,
        };

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "keywords" includes result of "stream.current"', () => {
      const state = {};
      const currentResult = EDITOR_KEYWORD.PRIORITY;
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => '',
        current: () => currentResult,
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return correct result', () => {
        const expectedResult = 'keyword';

        expect(result).toEqual(expectedResult);
      });

      it('should modify state', () => {
        const expectedResult = {
          keyProperty: currentResult,
        };

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "keywords" does not include result of "stream.current"', () => {
      const state = {};
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => '',
        current: () => 'test',
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return "null"', () => {
        expect(result).toBeNull();
      });

      it('should not modify state', () => {
        const expectedResult = {};

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "typeKeys" includes result of "stream.current"', () => {
      const state = {};
      const test = 'test';
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => '',
        current: () => test,
      };
      const parserConfig = {
        ...commonParserConfig,
        typeMapping: {
          test,
        },
      };
      const result = processToken(stream, state, parserConfig);

      it('should return correct result', () => {
        expect(result).toEqual(test);
      });

      it('should modify state', () => {
        const expectedResult = {
          keyProperty: test,
        };

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "LOCATION_RULES_TYPES" includes result of "stream.current"', () => {
      const state = {};
      const stream = {
        ...commonStream,
        sol: () => false,
        eatSpace: () => false,
        next: () => '',
        current: () => RULES_TYPE.INSTITUTION,
      };
      const result = processToken(stream, state, commonParserConfig);

      it('should return correct result', () => {
        expect(result).toEqual(RULES_TYPE.INSTITUTION);
      });

      it('should modify state', () => {
        const expectedResult = {
          keyProperty: RULES_TYPE.INSTITUTION,
        };

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "policyKeys" includes result of "stream.current"', () => {
      const current = 'current';
      const stream = {
        ...commonStream,
        eatSpace: () => false,
        sol: () => false,
        next: () => '',
        current: () => current,
      };
      const parserConfig = {
        ...commonParserConfig,
        policyMapping: {
          current,
        },
      };
      const state = {};
      const result = processToken(stream, state, parserConfig);

      it('should return correct result', () => {
        expect(result).toEqual(current);
      });

      it('should modify state', () => {
        const expectedResult = {
          keyProperty: current,
        };

        expect(state).toEqual(expectedResult);
      });
    });

    describe('when "keyProperty" is presented', () => {
      const current = 'current';

      describe('when there are no "typeMapping" and "policyMapping" values', () => {
        const keyProperty = 'keyProperty';
        const stream = {
          ...commonStream,
          eatSpace: () => false,
          sol: () => false,
          next: () => '',
          current: () => keyProperty,
        };
        const state = {
          keyProperty,
        };

        it('should return "null"', () => {
          expect(processToken(stream, state, commonParserConfig)).toBeNull();
        });
      });

      describe('when "typeMapping" value is presented', () => {
        const keyProperty = RULES_TYPE.INSTITUTION;
        const stream = {
          ...commonStream,
          eatSpace: () => false,
          sol: () => false,
          next: () => '',
          current: () => current,
        };
        const state = {
          keyProperty,
        };
        const parseConfig = {
          ...commonParserConfig,
          typeMapping: {
            [RULES_TYPE.INSTITUTION]: keyProperty,
          },
          completionLists: {
            [RULES_TYPE.INSTITUTION]: [{
              code: 'test',
            }],
          }
        };

        it('should return "null"', () => {
          expect(processToken(stream, state, parseConfig)).toBeNull();
        });
      });

      describe('when "isLocationCriteriaExists" is true', () => {
        const keyProperty = RULES_TYPE.INSTITUTION;
        const stream = {
          ...commonStream,
          eatSpace: () => false,
          sol: () => false,
          next: () => '',
          current: () => current,
        };
        const state = {
          keyProperty,
        };
        const parseConfig = {
          ...commonParserConfig,
          typeMapping: {
            [RULES_TYPE.INSTITUTION]: keyProperty,
          },
          completionLists: {
            [RULES_TYPE.INSTITUTION]: [{
              code: current,
            }],
          }
        };

        it('should return selector', () => {
          expect(processToken(stream, state, parseConfig)).toEqual(`${keyProperty}-selector`);
        });
      });

      describe('when "keySelector" does not contain result of "stream.current"', () => {
        const keyProperty = RULES_TYPE.INSTITUTION;
        const stream = {
          ...commonStream,
          eatSpace: () => false,
          sol: () => false,
          next: () => '',
          current: () => current,
        };
        const state = {
          keyProperty,
        };
        const parseConfig = {
          ...commonParserConfig,
          typeMapping: {
            [RULES_TYPE.INSTITUTION]: keyProperty,
          },
          completionLists: {
            [RULES_TYPE.INSTITUTION]: [{
              code: '',
            }],
          },
          keySelector: current,
        };

        it('should return selector', () => {
          expect(processToken(stream, state, parseConfig)).toEqual(`${keyProperty}-selector`);
        });
      });

      describe('when "policyMapping" and "rValue" values are presented', () => {
        const keyProperty = 'keyProperty';
        const stream = {
          ...commonStream,
          eatSpace: () => false,
          sol: () => false,
          next: () => '',
          current: () => current,
        };
        const state = {
          keyProperty,
          rValue: 'rValue',
        };
        const parseConfig = {
          ...commonParserConfig,
          policyMapping: {
            keyProperty,
          },
        };
        const result = processToken(stream, state, parseConfig);

        it('should return "null"', () => {
          const expectedResult = 'policy';

          expect(result).toEqual(expectedResult);
        });

        it('should modify "state"', () => {
          const expectedResult = {
            ...state,
            keyProperty: null,
          };

          expect(state).toEqual(expectedResult);
        });
      });
    });
  });

  describe('defineRulesCMM', () => {
    const indentUnit = 'test';
    const config = {
      indentUnit,
    };
    const completionLists = 'completionLists';
    const typeMapping = 'typeMapping';
    const policyMapping = 'policyMapping';
    const parserConfig = {
      completionLists,
      typeMapping,
      policyMapping,
    };
    const result = defineRulesCMM(config, parserConfig);

    describe('startState', () => {
      it('should return correct data', () => {
        const expectedResult = {
          keyProperty: null,
          rValue: false,
          indented: 0,
          nextApplicable: {
            completionLists,
            typeMapping,
            policyMapping,
          },
          ruleLine: false,
          context: {
            align: null,
          }
        };

        expect(result.startState()).toEqual(expectedResult);
      });
    });

    describe('blankLine', () => {
      it('should modify "state"', () => {
        const state = {};
        const expectedResult = {
          comment: false,
          indented: 0,
          keyProperty: null,
        };

        result.blankLine(state);

        expect(state).toEqual(expectedResult);
      });
    });

    describe('indent', () => {
      describe('when "state" is empty object', () => {
        it('should return "null"', () => {
          expect(result.indent({})).toBeNull();
        });
      });

      describe('when "state" contains "ruleLine"', () => {
        it('should return correct data', () => {
          const indented = 1;
          const state = {
            ruleLine: true,
            indented,
          };
          expect(result.indent(state)).toEqual(indented + indentUnit);
        });
      });

      describe('when "state" contains "rValue"', () => {
        it('should return correct data', () => {
          const indented = 1;
          const state = {
            rValue: true,
            indented,
          };
          expect(result.indent(state)).toEqual(indented);
        });
      });
    });

    describe('token', () => {
      const commonStream = {
        eatSpace: jest.fn(),
        next: jest.fn(),
        eatWhile: jest.fn(),
        current: jest.fn(),
      };

      describe('when "stream.eol" returns true', () => {
        const stream = {
          ...commonStream,
          eol: () => true,
          sol: () => false,
        };
        const state = {};

        result.token(stream, state);

        it('should modify "state"', () => {
          expect(state.keyProperty).toBeNull();
        });
      });

      describe('when "stream.sol" returns true', () => {
        const stream = {
          ...commonStream,
          sol: () => true,
          eol: () => false,
          indentation: () => false,
        };

        it('should modify "state"', () => {
          const state = {
            context: {
              align: '',
            },
          };
          const expectedResult = {
            ...state,
            indented: false,
            startOfLine: true,
          };

          result.token(stream, state);

          expect(state).toEqual(expect.objectContaining(expectedResult));
        });

        describe('when "ctx.align" equals "null"', () => {
          it('should modify "state"', () => {
            const state = {
              context: {
                align: null,
              },
            };
            const expectedResult = {
              context: {
                align: false,
              },
              indented: false,
              startOfLine: true,
            };

            result.token(stream, state);

            expect(state).toEqual(expect.objectContaining(expectedResult));
          });
        });
      });

      describe('when "stream.eol" and "stream.sol" return false', () => {
        const stream = {
          ...commonStream,
          eol: () => false,
          sol: () => false,
        };
        const state = {};
        const expectedResult = {};

        result.token(stream, state);

        it('should not modify "state"', () => {
          expect(state).toEqual(expectedResult);
        });
      });
    });
  });

  describe('initRulesCMM', () => {
    const CodeMirror = {
      defineMode: jest.fn(),
    };

    it('should trigger "defineMode" with correct arguments', () => {
      initRulesCMM(CodeMirror);

      expect(CodeMirror.defineMode).toHaveBeenLastCalledWith('rulesCMM', expect.any(Function));
    });
  });
});
