import {
  isLocationType,
  getSectionsDescriptions,
  getItemOptions,
  getDisplayText,
  rulesHint,
  initSubMenuDataFetching,
} from './Rules-hint';
import {
  RULES_TYPE,
  LOCATION_RULES_TYPES,
} from '../../../constants';

describe('Rules-hint', () => {
  const props = {
    intl: {
      formatMessage: jest.fn(({ id }) => id),
    },
  };
  const institution = {
    code:  'KU',
    displayCode: 'KU',
    id: 'id',
    parentId: 'parentId',
  };

  describe('isLocationType', () => {
    it('should return true if it is a location type', () => {
      const expected = isLocationType(LOCATION_RULES_TYPES[0]);

      expect(expected).toBeTruthy();
    });

    it('should return false if it is not a location type', () => {
      const expected = isLocationType('other type');

      expect(expected).toBeFalsy();
    });
  });

  describe('getSectionsDescriptions', () => {
    it('should return institution header', () => {
      const expected = getSectionsDescriptions(RULES_TYPE.INSTITUTION);
      const received = [
        { header: 'ui-circulation.settings.circulationRules.institution' },
      ];

      expect(expected).toEqual(received);
    });

    it('should return campus header', () => {
      const expected = getSectionsDescriptions(RULES_TYPE.CAMPUS);
      const received = [
        { header: 'ui-circulation.settings.circulationRules.institution', childSection: RULES_TYPE.CAMPUS },
        { header: 'ui-circulation.settings.circulationRules.campus', selectedHintIndex: 0, isMultipleSelection: true },
      ];

      expect(expected).toEqual(received);
    });

    it('should return library header', () => {
      const expected = getSectionsDescriptions(RULES_TYPE.LIBRARY);
      const received = [
        { header: 'ui-circulation.settings.circulationRules.institution', childSection: RULES_TYPE.CAMPUS },
        { header: 'ui-circulation.settings.circulationRules.campus', childSection: RULES_TYPE.LIBRARY, selectedHintIndex: 0 },
        { header: 'ui-circulation.settings.circulationRules.library', selectedHintIndex: 0, isMultipleSelection: true },
      ];

      expect(expected).toEqual(received);
    });

    it('should return location header', () => {
      const expected = getSectionsDescriptions(RULES_TYPE.LOCATION);
      const received = [
        { header: 'ui-circulation.settings.circulationRules.institution', childSection: RULES_TYPE.CAMPUS },
        { header: 'ui-circulation.settings.circulationRules.campus', childSection: RULES_TYPE.LIBRARY, selectedHintIndex: 0 },
        { header: 'ui-circulation.settings.circulationRules.library', childSection: RULES_TYPE.LOCATION, selectedHintIndex: 0 },
        { header: 'ui-circulation.settings.circulationRules.location', selectedHintIndex: 0, isMultipleSelection: true },
      ];

      expect(expected).toEqual(received);
    });

    it('should return empty header', () => {
      const expected = getSectionsDescriptions('other type');
      const received = [{}];

      expect(expected).toEqual(received);
    });
  });

  describe('getItemOptions', () => {
    const selector = {
      code: 'code',
      displayCode: 'DisplayCode',
      id: 'id',
    };

    it('should be location type', () => {
      const expected = getItemOptions(selector, 'a');
      const received = {
        className: 'rule-hint-minor',
        displayText: 'DisplayCode',
        id: 'id',
      };

      expect(expected).toEqual(expect.objectContaining(received));
    });

    it('should not be location type', () => {
      const expected = getItemOptions(selector, 'other type');
      const received = {
        className: 'rule-hint-minor',
        displayText: selector,
        id: 'id',
      };

      expect(expected).toEqual(expect.objectContaining(received));
    });
  });

  describe('getDisplayText', () => {
    it('should return truncated display code', () => {
      const expected = getDisplayText({
        displayCode: 'DisplayCode 123456789',
      }, 'a');
      const received = 'DisplayCode 12345...';

      expect(expected).toEqual(received);
    });

    it('should return display code', () => {
      const expected = getDisplayText({
        displayCode: 'DisplayCode',
      }, 's');
      const received = 'DisplayCode';

      expect(expected).toEqual(received);
    });

    it('should return selector', () => {
      const expected = getDisplayText('selector', 'not location type');
      const received = 'selector';

      expect(expected).toEqual(received);
    });
  });

  describe('rulesHint', () => {
    let result;
    const state = {
      nextApplicable: {},
    };
    const cm = {
      getTokenAt: jest.fn(() => ({
        type: 'ruleName',
        state,
      })),
      getCursor: jest.fn(() => ({
        ch: 1,
        line: 1,
      })),
      getMode: jest.fn(),
    };
    const Codemirror = {
      registerHelper: (fold, rules, callback) => {
        result = callback(cm);
      },
      innerMode: () => ({
        mode: {
          name: 'rulesCMM',
        },
      }),
      Pos: jest.fn(),
    };

    it('should not register hint for not rulesCMM', () => {
      const notRulesCMMCodemirror = {
        ...Codemirror,
        innerMode: () => ({
          mode: {
            name: 'notRulesCMM',
          },
        }),
      };

      rulesHint(notRulesCMMCodemirror, props);

      expect(result).toBeNull();
    });

    it('should return sections list for not ruleName type', () => {
      const cmRuleName = {
        ...cm,
        getTokenAt: jest.fn(() => ({
          type: 'notRuleName',
          state,
        })),
      };
      const CodemirrorNotRuleName = {
        ...Codemirror,
        registerHelper: (fold, rules, callback) => {
          result = callback(cmRuleName);
        },
      };

      rulesHint(CodemirrorNotRuleName, props);

      expect(result).toEqual({
        sections: [{
          list: [
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.not',
              text: '! ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.all',
              text: 'all ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.newRule',
              text: '# ',
            }
          ],
          selectedHintIndex: -1
        }],
      });
    });

    it('should return sections list for ruleName type', () => {
      rulesHint(Codemirror, props);

      expect(result).toEqual({
        sections: [{
          list: [
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.not',
              text: '\n\n! ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.all',
              text: '\n\nall ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.newRule',
              text: '\n\n# ',
            }
          ],
          selectedHintIndex: -1
        }],
      });
    });

    it('should return typegroups ', () => {
      const stateType = {
        nextApplicable: {
          indented: 0,
          typeMapping: {
            g: 'patronGroups',
            m: 'materialTypes',
            t: 'loanTypes',
            a: 'institutions',
            b: 'campuses',
            c: 'libraries',
            s: 'locations',
          },
        },
      };
      const cmRuleName = {
        ...cm,
        getTokenAt: jest.fn(() => ({
          type: 'ruleName',
          state: stateType,
        })),
        getCursor: jest.fn(() => ({
          ch: 0,
          line: 1,
        })),
      };
      const CodemirrorNotRuleName = {
        ...Codemirror,
        registerHelper: (fold, rules, callback) => {
          result = callback(cmRuleName);
        },
      };

      rulesHint(CodemirrorNotRuleName, props);

      expect(result).toEqual({
        sections: [{
          list: [
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.not',
              text: '\n\n! ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.all',
              text: '\n\nall ',
            },
            {
              className: 'rule-hint-major',
              displayText: 'ui-circulation.settings.circulationRules.newRule',
              text: '\n\n# ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 'g: ui-circulation.settings.circulationRules.patronGroups',
              text: 'g ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 'm: ui-circulation.settings.circulationRules.materialTypes',
              text: 'm ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 't: ui-circulation.settings.circulationRules.loanTypes',
              text: 't ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 'a: ui-circulation.settings.circulationRules.institutions',
              text: 'a ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 'b: ui-circulation.settings.circulationRules.campuses',
              text: 'b ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 'c: ui-circulation.settings.circulationRules.libraries',
              text: 'c ',
            },
            {
              className: 'rule-hint-minor',
              displayText: 's: ui-circulation.settings.circulationRules.locations',
              text: 's ',
            }
          ],
          selectedHintIndex: -1
        }],
      });
    });

    it('should return type selectors', () => {
      const stateType = {
        nextApplicable: {
          typeMapping: {
            a: 'institutions',
            c: 'libraries',
          },
          completionLists: {
            institutions: [institution],
          },
        },
        keyProperty: 'c',
        indented: 0,
        rValue: false,
      };
      const cmRuleName = {
        ...cm,
        getTokenAt: jest.fn(() => ({
          type: 'ruleName',
          state: stateType,
        })),
        getCursor: jest.fn(() => ({
          ch: 10,
          line: 1,
        })),
      };
      const CodemirrorNotRuleName = {
        ...Codemirror,
        registerHelper: (fold, rules, callback) => {
          result = callback(cmRuleName);
        },
      };

      rulesHint(CodemirrorNotRuleName, props);

      expect(result).toEqual({
        header: 'ui-circulation.settings.circulationRules.selectLibrary',
        sections: [
          {
            childSection: 'b',
            header: 'ui-circulation.settings.circulationRules.institution',
            list: [
              {
                className: 'rule-hint-minor',
                displayText: 'KU',
                id: 'id',
                text: 'KU ',
              },
            ],
            selectedHintIndex: -1,
          },
          {
            childSection: 'c',
            header: 'ui-circulation.settings.circulationRules.campus',
            selectedHintIndex: 0,
          },
          {
            buttonText: 'ui-circulation.settings.circulationRules.done',
            filterPlaceholder: 'ui-circulation.settings.circulationRules.filterOptionsList',
            header: 'ui-circulation.settings.circulationRules.library',
            isMultipleSelection: true,
            selectedHintIndex: 0,
          },
        ]
      });
    });

    it('should return display policies types', () => {
      const stateType = {
        nextApplicable: {
          policyMapping: {
            i: 'lostItemFeePolicies',
            l: 'loanPolicies',
            n: 'noticePolicies',
            o: 'overdueFinePolicies',
            r: 'requestPolicies',
          },
          completionLists: {
            loanPolicies: ['loanPolicies'],
          },
        },
        indented: 0,
        rValue: true,
      };
      const cmRuleName = {
        ...cm,
        getTokenAt: jest.fn(() => ({
          type: 'ruleName',
          state: stateType,
        })),
        getCursor: jest.fn(() => ({
          ch: 2,
          line: 99,
        })),
      };
      const CodemirrorNotRuleName = {
        ...Codemirror,
        registerHelper: (fold, rules, callback) => {
          result = callback(cmRuleName);
        },
      };

      rulesHint(CodemirrorNotRuleName, props);

      expect(result).toEqual({
        header: 'ui-circulation.settings.circulationRules.circulationPolicies',
        sections: [
          {
            list: [
              {
                className: 'rule-hint-minor',
                displayText: 'ui-circulation.settings.circulationRules.lostItemFeePolicies',
                text: 'i ',
              },
              {
                className: 'rule-hint-minor',
                displayText: 'ui-circulation.settings.circulationRules.loanPolicies',
                text: 'l ',
              },
              {
                className: 'rule-hint-minor',
                displayText: 'ui-circulation.settings.circulationRules.noticePolicies',
                text: 'n ',
              },
              {
                className: 'rule-hint-minor',
                displayText: 'ui-circulation.settings.circulationRules.overdueFinePolicies',
                text: 'o ',
              },
              {
                className: 'rule-hint-minor',
                displayText: 'ui-circulation.settings.circulationRules.requestPolicies',
                text: 'r ',
              },
            ],
            selectedHintIndex: -1,
          }
        ]
      });
    });

    it('should return display policies', () => {
      const stateType = {
        nextApplicable: {
          policyMapping: {
            i: 'lostItemFeePolicies',
            l: 'loanPolicies',
            n: 'noticePolicies',
            o: 'overdueFinePolicies',
            r: 'requestPolicies',
          },
          completionLists: {
            loanPolicies: ['loanPolicies'],
          },
        },
        keyProperty: 'l',
        indented: 0,
        rValue: true,
      };
      const cmRuleName = {
        ...cm,
        getTokenAt: jest.fn(() => ({
          type: 'ruleName',
          state: stateType,
        })),
        getCursor: jest.fn(() => ({
          ch: 101,
          line: 2,
        })),
      };
      const CodemirrorNotRuleName = {
        ...Codemirror,
        registerHelper: (fold, rules, callback) => {
          result = callback(cmRuleName);
        },
      };

      rulesHint(CodemirrorNotRuleName, props);

      expect(result).toEqual({
        sections: [
          {
            list: [
              {
                className: 'rule-hint-minor',
                displayText: 'loanPolicies',
                text: 'loanPolicies ',
              },
            ],
            selectedHintIndex: -1,
          },
        ],
      });
    });
  });

  describe('initSubMenuDataFetching', () => {
    let result;
    const cm = {
      getTokenAt: jest.fn(() => ({
        state: {
          nextApplicable: {
            typeMapping: {
              a: 'institutions',
            },
            completionLists: {
              institutions: [institution],
            },
          },
        },
      })),
      getCursor: jest.fn(),
    };
    const options = {
      childSection: 'a',
      parentIds: ['parentId'],
    };
    const Codemirror = {
      registerHelper: (fold, rules, callback) => {
        result = callback(cm, options);
      },
    };

    it('should have circulation rules any', () => {
      initSubMenuDataFetching(Codemirror, props);

      expect(result).toEqual([
        {
          className: 'rule-hint-minor',
          displayText: '<ui-circulation.settings.circulationRules.any>',
          id: 'anya',
          text: '<ui-circulation.settings.circulationRules.any>',
        }, {
          className: 'rule-hint-minor',
          displayText: 'KU',
          id: 'id',
          text: 'KU ',
        },
      ]);
    });
  });
});
