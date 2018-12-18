/* eslint-disable */

/* Hinting logic - this uses the token/state passed from the mode parser to display a popup with
* 'nextApplicable' strings that could be applicable to the code.
*  Its primary responsibility is filtering the list of possibilities that's always passed through
*  in state.nextApplicable.
*/
import Codemirror from 'codemirror';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export default function loanRulesHint(cm, props) {
  Codemirror.registerHelper('hint', 'loanRulesCMM', (cm) => {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    const inner = Codemirror.innerMode(cm.getMode(), token.state);
    if (inner.mode.name != 'loanRulesCMM') return;

    const modeConfig = cm.getMode();

    // debug - can be used to render debug info to the dom for inspection.
    // let stateDiv = document.getElementById('ParserState');
    // stateDiv.innerHTML= JSON.stringify(token, null, 3);
    const currentLine = cm.getLine(cur.line);
    const start = cur.ch;
    const end = start;

    const spec = Codemirror.resolveMode('loanRulesCMM');

    const result = [];


    const ruleTypes = ['rule', 'ruleName'];

    const { typeMapping, completionLists, polices } = token.state.nextApplicable;


    // new rule at the start of lines and blank lines...
    if (cur.ch == 0 || cur.ch == token.state.indented || token.type != 'policy') {
      let newRuleText = '# ';
      // if we're in the middle of a line, a new line should be inserted, then a rule...
      if (cur.ch != 0 && token.state.indented > 0 || token.type == 'ruleName') {
        newRuleText = '\n\n# ';
      }
      result.push({
        text: newRuleText,
        displayText: <FormattedMessage id="ui-circulation.settings.loanRules.newRule" />,
        className: 'loan-rule-hint-major',
        completeOnSingleClick: true,
      });
    }

    // typegroups happen at the beginning of lines or if property is meta.
    if (
      cur.ch == 0 ||
      cur.ch == token.state.indented / 4 ||
      token.state.meta
    ) {
      for (const t in typeMapping) {
        result.push({
          text: `${t} `,
          displayText: `${t}: ${typeMapping[t]}`,
          className: 'loan-rule-hint-minor',
          completeOnSingleClick: true,
        });
      }
    }

    // display criteria selectors if the cursor's not after a semicolon and state.keyPropery is not null...
    if (!token.state.rValue && token.state.keyProperty != null) {
      // not at beginning of line..
      if (cur.ch != 0 && cur.ch > token.state.indented / 4) {
        const type = typeMapping[token.state.keyProperty];
        completionLists[type].forEach((selector) => {
          result.push({
            text: `${selector} `,
            displayText: selector,
            className: 'loan-rule-hint-minor',
            completeOnSingleClick: true,
          });
        });
      }
    }

    // display policies in rValues.
    if (token.state.rValue && cur.ch > token.state.indented) {
      token.state.nextApplicable.policies.forEach((p) => {
        result.push({
          text: `${p.name} `,
          displayText: p.name,
          className: 'loan-rule-hint-minor',
          completeOnSingleClick: true,
        });
      });
    }

    if (result.length) {
      return {
        list: result,
        from: Codemirror.Pos(cur.line, start),
        to: Codemirror.Pos(cur.line, end),
        selectedHint: -1,
      };
    }
  });
}
