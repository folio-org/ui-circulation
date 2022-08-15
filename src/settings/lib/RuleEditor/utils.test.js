import utils from './utils';

describe('utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addIndentToEditorRules', () => {
    const rule = 'some rule';

    describe('when position is before', () => {
      it('should add indent before', () => {
        expect(utils.addIndentToEditorRules(rule, 'before')).toBe(` ${rule}`);
      });
    });

    describe('when position is after', () => {
      it('should add indent after', () => {
        expect(utils.addIndentToEditorRules(rule, 'after')).toBe(`${rule} `);
      });
    });

    describe('when position is not passed', () => {
      it('should return rule', () => {
        expect(utils.addIndentToEditorRules(rule)).toBe(rule);
      });
    });
  });

  describe('fetchHints', () => {
    const cm = {};
    const options = { test: 'test' };
    const callback = jest.fn();

    describe('when "hint.async" is not true', () => {
      it('should trigger "hint" with correct arguments', () => {
        const hint = jest.fn();

        utils.fetchHints(hint, cm, options, callback);

        expect(hint).toHaveBeenLastCalledWith(cm, options);
      });

      it('should trigger "callback"', () => {
        const result = () => new Promise((res) => { res(); });
        const hint = jest.fn(result);

        utils.fetchHints(hint, cm, options, callback)
          .then(() => {
            expect(callback).toBeCalled();
          });
      });

      it('should trigger "callback" with "result"', () => {
        const result = 'test result';
        const hint = jest.fn(() => result);

        utils.fetchHints(hint, cm, options, callback);

        expect(callback).toHaveBeenCalledWith(result);
      });
    });

    describe('when "hint.async" is true', () => {
      const result = 'test result';
      const hint = jest.fn(() => result);
      let hints;
      hint.async = true;

      beforeAll(() => {
        hints = utils.fetchHints(hint, cm, options, callback);
      });

      it('should trigger "hint" with correct arguments', () => {
        expect(hint).toHaveBeenCalledWith(cm, callback, options);
      });

      it('should return correct result', () => {
        expect(hints).toEqual(result);
      });
    });
  });

  describe('getApplicableHelpers', () => {
    const helpers = [
      {
        supportsSelection: true,
      },
      {
        supportsSelection: false,
      },
    ];

    describe('when "somethingSelected" returns false', () => {
      const cm = {
        somethingSelected: jest.fn(() => false),
      };

      it('should return array of helpers', () => {
        expect(utils.getApplicableHelpers(cm, helpers)).toEqual(helpers);
      });
    });

    describe('when "somethingSelected" returns true', () => {
      const cm = {
        somethingSelected: jest.fn(() => true),
      };

      it('should return filtered array of helpers', () => {
        const expectedResult = [helpers[0]];

        expect(utils.getApplicableHelpers(cm, helpers)).toEqual(expectedResult);
      });
    });
  });

  describe('isTextInputField', () => {
    describe('when element is not "input"', () => {
      it('should return false', () => {
        const element = {
          tagName: 'div',
          type: 'text',
        };

        expect(utils.isTextInputField(element)).toBe(false);
      });
    });

    describe('when element is "input"', () => {
      it('should return true', () => {
        const element = {
          tagName: 'input',
          type: 'text',
        };

        expect(utils.isTextInputField(element)).toBe(true);
      });
    });
  });

  describe('isChildTextInputField', () => {
    const element = {
      tagName: 'input',
      type: 'text',
    };

    describe('when "contains" returns true', () => {
      it('should return true', () => {
        const container = {
          contains: () => true,
        };

        expect(utils.isChildTextInputField(container, element)).toBe(true);
      });
    });

    describe('when "contains" returns false', () => {
      it('should return false', () => {
        const container = {
          contains: () => false,
        };

        expect(utils.isChildTextInputField(container, element)).toBe(false);
      });
    });
  });

  describe('isAnyItem', () => {
    it('should return true', () => {
      const itemId = 'any item id';

      expect(utils.isAnyItem(itemId)).toBe(true);
    });

    it('should return false', () => {
      const itemId = 'item id';

      expect(utils.isAnyItem(itemId)).toBe(false);
    });
  });

  describe('createContainer', () => {
    describe('when "className" is not provided', () => {
      const result = utils.createContainer();

      it('should return div element', () => {
        expect(result.tagName.toLowerCase()).toBe('div');
      });

      it('should have empty classname', () => {
        expect(result.className).toBe('');
      });
    });

    describe('when "className" is provided', () => {
      const className = 'className';
      const result = utils.createContainer(className);

      it('should return div element', () => {
        expect(result.tagName.toLowerCase()).toBe('div');
      });

      it('should have correct classname', () => {
        expect(result.className).toBe(className);
      });
    });
  });

  describe('createHeader', () => {
    const text = 'header text';

    describe('when "className" is not provided', () => {
      const result = utils.createHeader(text);

      it('should return element with appropriate text', () => {
        expect(result.innerHTML).toBe(text);
      });

      it('should have empty classname', () => {
        expect(result.className).toBe('');
      });
    });

    describe('when "className" is provided', () => {
      const className = 'className';
      const result = utils.createHeader(text, className);

      it('should return element with appropriate text', () => {
        expect(result.innerHTML).toBe(text);
      });

      it('should have correct classname', () => {
        expect(result.className).toBe(className);
      });
    });
  });

  describe('getText', () => {
    it('should return "completion" argument if it is string', () => {
      const completion = 'completion';

      expect(utils.getText(completion)).toBe(completion);
    });

    it('should return "text" value if "completion" is not string', () => {
      const text = 'text';
      const completion = { text };

      expect(utils.getText(completion)).toBe(text);
    });
  });

  describe('showHint', () => {
    const cm = {
      showHint: jest.fn(),
    };
    const options = {
      option: 'test',
    };
    const getHints = jest.fn();

    describe('when "getHints" is not provided', () => {
      it('should trigger "showHint" with correct arguments', () => {
        utils.showHint(cm, undefined, options);

        expect(cm.showHint).toHaveBeenCalledWith(options);
      });
    });

    describe('when "getHints" is provided', () => {
      it('should trigger "showHint" with correct arguments', () => {
        utils.showHint(cm, getHints, options);

        expect(cm.showHint).toHaveBeenCalledWith({
          ...options,
          hint: getHints,
        });
      });
    });

    describe('when "options" has "async" param', () => {
      it('should add "async" property to "getHints"', () => {
        utils.showHint(cm, getHints, {
          ...options,
          async: true,
        });

        expect(getHints.async).toBe(true);
      });
    });
  });
});
