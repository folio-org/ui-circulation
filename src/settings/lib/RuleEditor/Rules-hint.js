/* Hinting logic - this uses the token/state passed from the mode parser to display a popup with
* 'nextApplicable' strings that could be applicable to the code.
*  Its primary responsibility is filtering the list of possibilities that's always passed through
*  in state.nextApplicable.
*/
import {
  forOwn,
  capitalize,
  truncate,
} from 'lodash';

const locationHeadersMapping = {
  a: 'institution',
  b: 'campus',
  c: 'library',
  s: 'location',
};

const truncateOptions = {
  length: 20,
  omission: '...',
};

const isLocationCriteria = (criteria) => {
  return criteria === 'a' || criteria === 'b' || criteria === 'c' || criteria === 's';
};

export default function rulesHint(Codemirror, props) {
  Codemirror.registerHelper('hint', 'rulesCMM', (cm) => {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    const { state } = token;
    const inner = Codemirror.innerMode(cm.getMode(), state);

    if (inner.mode.name !== 'rulesCMM') {
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
    let header;
    let subheader;

    // new rule at the start of lines and blank lines...
    if (!rValue && (cur.ch === 0 || cur.ch === indented || token.type !== 'policy')) {
      let newRuleText = '# ';
      // if we're in the middle of a line, a new line should be inserted, then a rule...
      if ((cur.ch !== 0 && indented > 0) || token.type === 'ruleName') {
        newRuleText = '\n\n# ';
      }

      result.push({
        text: newRuleText,
        displayText: formatMessage({ id: 'ui-circulation.settings.circulationRules.newRule' }),
        className: 'rule-hint-major',
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
        const text = formatMessage({ id: `ui-circulation.settings.circulationRules.${value}` });
        result.push({
          text: `${key} `,
          displayText: `${key}: ${text}`,
          className: 'rule-hint-minor',
          completeOnSingleClick: true,
        });
      });
    }

    // display criteria selectors if the cursor's not after a semicolon and state.keyPropery is not null...
    if (!rValue && keyProperty) {
      // not at beginning of line..
      if (cur.ch !== 0 && cur.ch > indented / 4 && typeMapping[keyProperty]) {
        if (isLocationCriteria(keyProperty)) {
          // A temp solution to remove new rule# for locations because it's displayed in wrong cases
          // It will be fixed in the separated issue
          if (result.length > 0) {
            result.pop();
          }

          const translaitionKeyValue = capitalize(locationHeadersMapping[keyProperty]);
          header = formatMessage({ id: `ui-circulation.settings.circulationRules.select${translaitionKeyValue}` });
          subheader = formatMessage({ id: `ui-circulation.settings.circulationRules.${locationHeadersMapping[keyProperty]}` });
        }

        const type = typeMapping[keyProperty];

        completionLists[type].forEach((selector) => {
          result.push({
            text: `${selector} `,
            displayText: isLocationCriteria(keyProperty) ? truncate(selector, truncateOptions) : selector,
            className: 'rule-hint-minor',
            completeOnSingleClick: true,
          });
        });
      }
    }

    // display policy types in rValues.
    if (rValue && cur.ch > indented && !keyProperty) {
      header = formatMessage({ id: 'ui-circulation.settings.circulationRules.circulationPolicies' });

      forOwn(policyMapping, (value, key) => {
        result.push({
          text: `${key} `,
          displayText: formatMessage({ id: `ui-circulation.settings.circulationRules.${value}` }),
          className: 'rule-hint-minor',
          completeOnSingleClick: true,
        });
      });
    }

    // display policies
    if (rValue && keyProperty) {
      // not at beginning of line..
      if (cur.ch !== 0 && cur.ch > indented / 4 && policyMapping[keyProperty]) {
        const type = policyMapping[keyProperty];
        completionLists[type].forEach((selector) => {
          result.push({
            text: `${selector} `,
            displayText: selector,
            className: 'rule-hint-minor',
            completeOnSingleClick: true,
          });
        });
      }
    }

    if (result.length) {
      return {
        listDescription: {
          subheader,
          list: result,
        },
        from: Codemirror.Pos(cur.line, start),
        to: Codemirror.Pos(cur.line, end),
        selectedHint: -1,
        header,
      };
    }

    return null;
  });
}
