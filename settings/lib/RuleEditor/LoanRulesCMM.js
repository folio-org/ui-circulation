/* Loan Rules Mode for CodeMirror.
*  This is the code that parses the content of the codemirror editor for syntax highlighting. It also passes the completion list through to 
*  the loan rules code hinting functionality.
*/

const initLoanRulesCMM = (CodeMirror) => {
  CodeMirror.defineMode("loanRulesCMM", function(config, parserConfig) {
    
      const indentUnit = config.indentUnit;
    
      const typegroups = Object.keys(parserConfig.typeMapping);
    
      const keywords = [
        "fallback-policy",
        "priority",
      ];
    
      // meta have typegroups or collections of typegroups as their value
      const meta = [
        "priority",
      ]
    
    
      // const regex = new RegExp("^["+keyChars.join("")+"]\\s(?:(?![\\+:]).)*");
      const isPunctuationChar = new RegExp(/[,;\:]/);
      const criteriaRegex = new RegExp("["+typegroups.join("")+"]");
      const commentRegex = new RegExp(/^\//);
      const state = {};
    
      var curPunc, isDefKeyword;
    
      const hooks = {
        '#': function(stream, state) { // # starts a rule, followed by name of rule.
            stream.eatWhile(/[^\/]/);
            state.ruleLine = true;
            return "ruleName";
        },
        '/': function(stream) { // comment for rest of line after '/'
          stream.skipToEnd();
          return "comment"
        },
        ',': function(stream) { // comma separators.
          stream.eatWhile(/\s/);
          return "comma"
        },
        '+': function(stream) { // plus 'and'
          stream.eatWhile(/\s/);
          return "and"
        },
        ':': function(stream, state) { // separate l-value from r-value
          stream.eatWhile(/\s/);
          state.rValue = true;
        },
        '!': function(stream, state) {
          stream.eatWhile(/\s/);
          return 'not';
        }
      }
    
      function tokenBase(stream, state) {
        if(stream.sol()) {
          state.rValue = false;
          state.keyProperty = null;
          if(stream.eatSpace()){
            return null;
          }
        }
    
        if(stream.eatSpace()) return; // skip whitespace..
        var ch = stream.next();
    
        if (hooks[ch]) {
          var result = hooks[ch](stream, state);
          if(result !== 'ruleName' && result !== 'comment') {
            state.ruleLine = false;
          }
          if (result !== false) return result;
        }
    
        stream.eatWhile(/[^\s:,+$]/);
        const cur = stream.current();
        if(keywords.indexOf(cur) !== -1) { // style keywords...
          state.keyProperty = cur;
          return 'keyword';
        }
        if(typegroups.indexOf(cur) !== -1){ // style typegroups
          state.keyProperty = cur;
          return cur;
        }
        if(state.keyProperty) {
          if(Object.prototype.hasOwnProperty.call(parserConfig.typeMapping, state.keyProperty)) {
            let returnClass = false;
            const keyProperty = parserConfig.typeMapping[state.keyProperty];
            if(parserConfig.completionLists[keyProperty].indexOf(cur)!== -1) { // matches completion set
              returnClass = true;
            }
            if(parserConfig.keySelector.indexOf(cur) !== -1) { //matches keySelector 'all' or established set.
              returnClass = true;
            }
            if(returnClass) {
              return `${state.keyProperty}-selector`;
            }
          }
        }
    
        //policies
        if(state.rValue) {
          let policyRes = parserConfig.policies.filter((i)=> i.name === cur);
          if(policyRes.length > 0){
            return 'policy';
          }
        }
      }
    
      return {
    
        startState: function() {
          const {completionLists, policies, typeMapping} = parserConfig;
          return {
            keyProperty: null, // current defined property or typegroup, if any.
            rValue: false, // in a property or value? 
            indented: 0,
            nextApplicable: {completionLists, policies, typeMapping},
            ruleLine: false,
            context: {
              align: null,
            }
          }
        },
    
        blankLine: function(state) {
          state.comment = false;
          state.indented = 0;
          state.keyProperty = null;
        },
    
        indent: function(state, textAfter) {
          if(state.ruleLine) {
            return state.indented + indentUnit;
          }
          if(state.rValue) {
            return state.indented;
          }
        },
    
        eletricInput: /#.*$/,
    
        token: function(stream, state) {
          var ctx = state.context;
          if(stream.eol()) {
            state.keyProperty = null;
          }
          if (stream.sol()) {
            if (ctx.align == null) ctx.align = false;
            state.indented = stream.indentation();
            state.startOfLine = true;
          }
    
          const style = tokenBase(stream, state);
    
          return style;

          return tokenClass ? tokenClass : null;
        }
      };
    });
}

export default initLoanRulesCMM;