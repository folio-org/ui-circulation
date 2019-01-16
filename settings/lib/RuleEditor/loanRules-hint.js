/* Hinting logic - this uses the token/state passed from the mode parser to display a popup with
* 'nextApplicable' strings that could be applicable to the code.
*  Its primary responsibility is filtering the list of possibilities that's always passed through
*  in state.nextApplicable.
*/
import { forOwn } from 'lodash';

export default function loanRulesHint(Codemirror, props) {
  Codemirror.registerHelper('hint', 'loanRulesCMM', (cm) => {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    const { state } = token;
    const inner = Codemirror.innerMode(cm.getMode(), state);

    if (inner.mode.name !== 'loanRulesCMM') {
      return null;
    }

    const { intl: { formatMessage } } = props;
    const {
      nextApplicable,
      keyProperty,
      rValue,
      indented,
      meta,
    } = state;

    const {
      policyMapping,
      typeMapping,
      completionLists
    } = nextApplicable;

    const start = cur.ch;
    const end = start;
    const result = [];

    // new rule at the start of lines and blank lines...
    if (!rValue && (cur.ch === 0 || cur.ch === indented || token.type !== 'policy')) {
      let newRuleText = '# ';
      // if we're in the middle of a line, a new line should be inserted, then a rule...
      if ((cur.ch !== 0 && indented > 0) || token.type === 'ruleName') {
        newRuleText = '\n\n# ';
      }

      result.push({
        text: newRuleText,
        displayText: formatMessage({ id: 'ui-circulation.settings.loanRules.newRule' }),
        className: 'loan-rule-hint-major',
        completeOnSingleClick: true,
      });
    }

    // typegroups happen at the beginning of lines or if property is meta.
    if (
      cur.ch === 0 ||
      cur.ch === indented / 4 ||
      meta
    ) {
      forOwn(typeMapping, (value, key) => {
        const text = formatMessage({ id: `ui-circulation.settings.loanRules.${value}` });
        result.push({
          text: `${key} `,
          displayText: `${key}: ${text}`,
          className: 'loan-rule-hint-minor',
          completeOnSingleClick: true,
        });
      });
    }

    // display criteria selectors if the cursor's not after a semicolon and state.keyPropery is not null...
    if (!rValue && keyProperty) {
      // not at beginning of line..
      if (cur.ch !== 0 && cur.ch > indented / 4) {
        const type = typeMapping[keyProperty];
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

    // display policy types in rValues.
    if (rValue && cur.ch > indented && !keyProperty) {
      const text = formatMessage({ id: 'ui-circulation.settings.loanRules.circulationPolicies' });

      result.push({
        text,
        displayText: text,
        className: 'loan-rule-hint-strong',
        inactive: true,
      });

      forOwn(policyMapping, (value, key) => {
        result.push({
          text: `${key} `,
          displayText: formatMessage({ id: `ui-circulation.settings.loanRules.${value}` }),
          className: 'loan-rule-hint-minor',
          completeOnSingleClick: true,
        });
      });
    }

    // display policies
    if (rValue && keyProperty) {
      // not at beginning of line..
      if (cur.ch !== 0 && cur.ch > indented / 4) {
        const type = policyMapping[keyProperty];
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

    if (result.length) {
      return {
        list: result,
        from: Codemirror.Pos(cur.line, start),
        to: Codemirror.Pos(cur.line, end),
        selectedHint: -1,
      };
    }

    return null;
  });
}
