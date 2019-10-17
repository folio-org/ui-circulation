/* Circulation Rules Mode for CodeMirror.
*  This is the code that parses the content of the codemirror editor for syntax highlighting. It also passes the completion list through to
*  the circulation rules code hinting functionality.
*/

import {
  LOCATION_RULES_TYPES,
  EDITOR_KEYWORD,
  EDITOR_SPECIAL_SYMBOL,
} from '../../../constants';

const hooks = {
  [EDITOR_SPECIAL_SYMBOL.HASH]: (stream, state) => { // # starts a rule, followed by name of rule.
    stream.eatWhile(/[^/]/);
    state.ruleLine = true;

    return 'ruleName';
  },
  [EDITOR_SPECIAL_SYMBOL.SLASH]: (stream) => { // comment for rest of line after '/'
    stream.skipToEnd();

    return 'comment';
  },
  [EDITOR_SPECIAL_SYMBOL.COMMA]: (stream) => { // comma separators.
    stream.eatWhile(/\s/);

    return 'comma';
  },
  [EDITOR_SPECIAL_SYMBOL.PLUS]: (stream) => { // plus 'and'
    stream.eatWhile(/\s/);
    return 'and';
  },
  [EDITOR_SPECIAL_SYMBOL.COLON]: (stream, state) => { // separate l-value from r-value
    stream.eatWhile(/\s/);
    state.rValue = true;
    state.keyProperty = null;
  },
  [EDITOR_SPECIAL_SYMBOL.NEGATION]: (stream) => {
    stream.eatWhile(/\s/);

    return 'not';
  }
};

function processToken(stream, state, parserConfig) {
  const {
    typeMapping,
    policyMapping,
    completionLists,
    keySelector,
  } = parserConfig;
  const typeKeys = Object.keys(typeMapping);
  const policyKeys = Object.keys(policyMapping);
  const keywords = [...Object.values(EDITOR_KEYWORD)];

  if (stream.sol()) {
    state.rValue = false;
    state.keyProperty = null;

    if (stream.eatSpace()) {
      return null;
    }
  }

  if (stream.eatSpace()) {
    return null; // skip whitespace..
  }

  const ch = stream.next();

  if (hooks[ch]) {
    const result = hooks[ch](stream, state);

    if (result !== 'ruleName' && result !== 'comment') {
      state.ruleLine = false;
    }

    if (result !== false) {
      return result;
    }
  }

  stream.eatWhile(/[^\s:,+$]/);

  const cur = stream.current();

  if (keywords.includes(cur)) { // style keywords
    state.keyProperty = cur;

    return 'keyword';
  }

  if (typeKeys.includes(cur) || LOCATION_RULES_TYPES.includes(cur)) { // style types
    state.keyProperty = cur;

    return cur;
  }

  if (policyKeys.includes(cur)) { // style policies
    state.keyProperty = cur;

    return cur;
  }

  const { keyProperty, rValue } = state;

  if (keyProperty) {
    if (typeMapping[keyProperty]) {
      let returnClass = false;
      const val = typeMapping[keyProperty];
      const isLocationCriteriaExists = LOCATION_RULES_TYPES.includes(keyProperty) && completionLists[val].some(item => item.code === cur);

      if (isLocationCriteriaExists || completionLists[val].includes(cur)) {
        returnClass = true;
      }

      if (keySelector.indexOf(cur) !== -1) { // matches keySelector 'all' or established set.
        returnClass = true;
      }

      if (returnClass) {
        return `${keyProperty}-selector`;
      }
    }

    if (policyMapping[keyProperty] && rValue) {
      state.keyProperty = null;

      return 'policy';
    }
  }

  return null;
}

const initRulesCMM = (CodeMirror) => {
  CodeMirror.defineMode('rulesCMM', (config, parserConfig) => {
    const { indentUnit } = config;

    return {
      startState() {
        const { completionLists, typeMapping, policyMapping } = parserConfig;

        return {
          keyProperty: null, // current defined property or typegroup, if any.
          rValue: false, // in a property or value?
          indented: 0,
          nextApplicable: { completionLists, typeMapping, policyMapping },
          ruleLine: false,
          context: {
            align: null,
          }
        };
      },

      blankLine(state) {
        state.comment = false;
        state.indented = 0;
        state.keyProperty = null;
      },

      indent(state) {
        if (state.ruleLine) {
          return state.indented + indentUnit;
        }

        if (state.rValue) {
          return state.indented;
        }

        return null;
      },

      eletricInput: /#.*$/,

      token(stream, state) {
        const ctx = state.context;

        if (stream.eol()) {
          state.keyProperty = null;
        }

        if (stream.sol()) {
          if (ctx.align == null) ctx.align = false;

          state.indented = stream.indentation();
          state.startOfLine = true;
        }

        return processToken(stream, state, parserConfig);
      }
    };
  });
};

export default initRulesCMM;
