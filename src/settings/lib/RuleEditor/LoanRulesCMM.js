/* Loan Rules Mode for CodeMirror.
*  This is the code that parses the content of the codemirror editor for syntax highlighting. It also passes the completion list through to
*  the loan rules code hinting functionality.
*/

const hooks = {
  '#': (stream, state) => { // # starts a rule, followed by name of rule.
    stream.eatWhile(/[^/]/);
    state.ruleLine = true;
    return 'ruleName';
  },
  '/': (stream) => { // comment for rest of line after '/'
    stream.skipToEnd();
    return 'comment';
  },
  ',': (stream) => { // comma separators.
    stream.eatWhile(/\s/);
    return 'comma';
  },
  '+': (stream) => { // plus 'and'
    stream.eatWhile(/\s/);
    return 'and';
  },
  ':': (stream, state) => { // separate l-value from r-value
    stream.eatWhile(/\s/);
    state.rValue = true;
    // TODO: turn on after  UICIRC-164 is done
    // state.keyProperty = null;
  },
  '!': (stream) => {
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
  const keywords = [
    'fallback-policy',
    'priority',
  ];

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
  if (keywords.indexOf(cur) !== -1) { // style keywords...
    state.keyProperty = cur;
    return 'keyword';
  }

  if (typeKeys.indexOf(cur) !== -1) { // style types
    state.keyProperty = cur;
    return cur;
  }

  if (policyKeys.indexOf(cur) !== -1) { // style policies
    state.keyProperty = cur;
    return cur;
  }

  const { keyProperty, rValue } = state;

  if (keyProperty) {
    if (typeMapping[keyProperty]) {
      let returnClass = false;
      const val = typeMapping[keyProperty];

      if (completionLists[val].indexOf(cur) !== -1) { // matches completion set
        returnClass = true;
      }

      if (keySelector.indexOf(cur) !== -1) { // matches keySelector 'all' or established set.
        returnClass = true;
      }

      if (returnClass) {
        return `${keyProperty}-selector`;
      }
    }

    /* TODO: turn on after  UICIRC-164 is done
    if (policyMapping[keyProperty] && rValue) {
      state.keyProperty = null;
      return 'policy';
    }
    */
  }

  // TODO: for backward compatiblity.
  // Please remove it after UICIRC-164 is completed
  if (rValue) {
    const policyRes = completionLists.loanPolicies.filter((p) => p === cur);
    if (policyRes.length > 0) {
      return 'policy';
    }
  }

  return null;
}

const initLoanRulesCMM = (CodeMirror) => {
  CodeMirror.defineMode('loanRulesCMM', (config, parserConfig) => {
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

export default initLoanRulesCMM;
