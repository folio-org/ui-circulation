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

const getSectionsDescriptions = (criteria) => {
  switch (criteria) {
    case 'a':
      return [
        { header: 'ui-circulation.settings.circulationRules.institution' },
      ];
    case 'b':
      return [
        { header: 'ui-circulation.settings.circulationRules.institution', relatedSection: 'b' },
        { header: 'ui-circulation.settings.circulationRules.campus', selectedHint: 0 },
      ];
    case 'c':
      return [
        { header: 'ui-circulation.settings.circulationRules.institution', relatedSection: 'b' },
        { header: 'ui-circulation.settings.circulationRules.campus', relatedSection: 'c', selectedHint: 0 },
        { header: 'ui-circulation.settings.circulationRules.library', selectedHint: 0 },
      ];
    default:
      return [{}];
  }
};

function getCriteriaOptions(selector, typeKey) {
  const text = isLocationCriteria(typeKey) ? selector.code : selector;
  const displayText = isLocationCriteria(typeKey) ? truncate(selector.displayCode, truncateOptions) : selector;

  return {
    text: `${text} `,
    displayText,
    className: 'rule-hint-minor',
    completeOnSingleClick: true,
    id: selector.id,
  };
}

export function rulesHint(Codemirror, props) {
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
    let sections = [{}];

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

          sections = getSectionsDescriptions(keyProperty);
          const translaitionKeyValue = capitalize(locationHeadersMapping[keyProperty]);
          header = formatMessage({ id: `ui-circulation.settings.circulationRules.select${translaitionKeyValue}` });
        }

        const criteriaKeyProperty = isLocationCriteria(keyProperty) ? 'a' : keyProperty;
        const type = typeMapping[criteriaKeyProperty];

        completionLists[type].forEach((selector) => {
          result.push(getCriteriaOptions(selector, criteriaKeyProperty));
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
      sections.forEach(section => {
        section.header = section.header ? formatMessage({ id: section.header }) : section.header;

        if (section.selectedHint === undefined) {
          section.selectedHint = -1;
        }
      });
      sections[0].list = result;

      return {
        sections,
        from: Codemirror.Pos(cur.line, start),
        to: Codemirror.Pos(cur.line, end),
        header,
      };
    }

    return null;
  });
}

export function initSubMenuDataFetching(Codemirror, props) {
  Codemirror.registerHelper('hint', 'getSubMenuData', (cm, options) => {
    const token = cm.getTokenAt(cm.getCursor());
    const { state } = token;
    const { nextApplicable } = state;
    const { intl: { formatMessage } } = props;

    const {
      typeMapping,
      completionLists,
    } = nextApplicable;

    const result = [];

    if (!typeMapping[options.relatedSection]) return null;

    const type = typeMapping[options.relatedSection];

    if (isLocationCriteria(options.relatedSection)) {
      result.push({
        text: formatMessage({ id: 'ui-circulation.settings.circulationRules.any' }),
        displayText: formatMessage({ id: 'ui-circulation.settings.circulationRules.any' }),
        className: 'rule-hint-minor',
        completeOnSingleClick: true,
        inactive: true,
      });
    }

    completionLists[type].forEach((selector) => {
      if (!selector.parentId || selector.parentId === options.parentId) {
        result.push(getCriteriaOptions(selector, options.relatedSection));
      }
    });

    return result;
  });
}
