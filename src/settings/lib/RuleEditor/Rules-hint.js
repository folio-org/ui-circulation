/* Hinting logic - this uses the token/state passed from the mode parser to display a popup with
* 'nextApplicable' strings that could be applicable to the code.
*  Its primary responsibility is filtering the list of possibilities that's always passed through
*  in state.nextApplicable.
*/
import {
  forOwn,
  capitalize,
  truncate,
  isEmpty,
} from 'lodash';

import {
  RULES_TYPE,
  LOCATION_RULES_TYPES
} from '../../../constants';

const locationHeadersMapping = {
  [RULES_TYPE.INSTITUTION]: 'institution',
  [RULES_TYPE.CAMPUS]: 'campus',
  [RULES_TYPE.LIBRARY]: 'library',
  [RULES_TYPE.LOCATION]: 'location',
};

const truncateOptions = {
  length: 20,
  omission: '...',
};

const isLocationType = type => LOCATION_RULES_TYPES.includes(type);

const getSectionsDescriptions = type => {
  switch (type) {
    case RULES_TYPE.INSTITUTION:
      return [
        { header: 'ui-circulation.settings.circulationRules.institution' },
      ];
    case RULES_TYPE.CAMPUS:
      return [
        { header: 'ui-circulation.settings.circulationRules.institution', childSection: RULES_TYPE.CAMPUS },
        { header: 'ui-circulation.settings.circulationRules.campus', selectedHintIndex: 0 },
      ];
    case RULES_TYPE.LIBRARY:
      return [
        { header: 'ui-circulation.settings.circulationRules.institution', childSection: RULES_TYPE.CAMPUS },
        { header: 'ui-circulation.settings.circulationRules.campus', childSection: RULES_TYPE.LIBRARY, selectedHintIndex: 0 },
        { header: 'ui-circulation.settings.circulationRules.library', selectedHintIndex: 0 },
      ];
    default:
      return [{}];
  }
};

function getTypeOptions(selector, typeKey) {
  const isLocationTypeKey = isLocationType(typeKey);
  const text = isLocationTypeKey ? selector.code : selector;
  const displayText = isLocationTypeKey ? truncate(selector.displayCode, truncateOptions) : selector;

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

    // new rule at the start of lines and blank lines
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

    // display type selectors if the cursor's not after a semicolon and state.keyPropery is not null...
    if (!rValue && keyProperty) {
      // not at beginning of line..
      if (cur.ch !== 0 && cur.ch > indented / 4 && typeMapping[keyProperty]) {
        const isLocationKey = isLocationType(keyProperty);

        if (isLocationKey) {
          // A temp solution to remove new rule# for locations because it's displayed in wrong cases
          // It will be fixed in the separated issue
          if (!isEmpty(result)) {
            result.pop();
          }

          sections = getSectionsDescriptions(keyProperty);

          const translationKeyValue = capitalize(locationHeadersMapping[keyProperty]);

          header = formatMessage({ id: `ui-circulation.settings.circulationRules.select${translationKeyValue}` });
        }

        const typeKeyProperty = isLocationKey ? RULES_TYPE.INSTITUTION : keyProperty;
        const type = typeMapping[typeKeyProperty];

        completionLists[type].forEach(selector => {
          result.push(getTypeOptions(selector, typeKeyProperty));
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

        if (section.selectedHintIndex === undefined) {
          section.selectedHintIndex = -1;
        }
      });
      // The first section should be always filled and other sections should be filed by request in getSubMenuData helper
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
    const { intl: { formatMessage } } = props;
    const subMenuData = [];
    const token = cm.getTokenAt(cm.getCursor());
    const {
      typeMapping,
      completionLists,
    } = token.state.nextApplicable;

    const type = typeMapping[options.childSection];

    if (options.childSection && isLocationType(options.childSection)) {
      const text = `<${formatMessage({ id: 'ui-circulation.settings.circulationRules.any' })}>`;

      subMenuData.push({
        text,
        displayText: text,
        className: 'rule-hint-minor',
        completeOnSingleClick: true,
        inactive: true,
      });
    }

    completionLists[type].forEach((selector) => {
      if (selector.parentId === options.parentId) {
        subMenuData.push(getTypeOptions(selector, options.childSection));
      }
    });

    return subMenuData;
  });
}
