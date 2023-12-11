import CodeMirror from 'codemirror';
import _ from 'lodash';

import rulesShowHint from './rules-show-hint';
import * as utils from './utils';
import {
  ACTIVE_HINT_ELEMENT_CLASS,
  HINT_ELEMENT_CLASS,
  HINT_SECTION_CONTAINER,
  HINT_SECTIONS_CONTAINER
} from '../../../constants';
import HintSection from '../HintSection/HintSection';

jest.mock('codemirror', () => ({
  hint: {
    auto: {
      resolve: jest.fn(),
    },
    fromList: jest.fn(),
    getSubMenuData: jest.fn(),
    anyword: null,
  },
  registerHelper: jest.fn(),
  defineExtension: jest.fn(),
  defineOption: jest.fn(),
  signal: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  Pos: jest.fn(),
  cmpPos: jest.fn(),
  commands: {},
}));
jest.mock('./utils', () => ({
  showHint: jest.fn(),
  getText: jest.fn(() => 'text'),
  addIndentToEditorRules: jest.fn(() => 'indent'),
  fetchHints: jest.fn(),
  isChildTextInputField: jest.fn(),
  createContainer: jest.fn(),
  createHeader: jest.fn(),
  isAnyItem: jest.fn(),
  getApplicableHelpers: jest.fn(),
}));

describe('rulesShowHint', () => {
  const createElementMock = {
    appendChild: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      top: 1,
      bottom: 3,
      right: 2,
    })),
    style: {},
    classList: {
      add: jest.fn(),
      toggle: jest.fn(),
    },
    clientHeight: 10,
  };
  utils.createContainer.mockImplementation(() => createElementMock);
  utils.createHeader.mockImplementation(() => createElementMock);

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('showHintValue', () => {
    const initialOptions = {
      hint: {},
    };
    const commonCodeMirrorMocks = {
      getCursor: () => {},
      listSelections: () => [],
      on: () => {},
      getLine: () => 1,
      getSelection: () => [],
      showHintValue: rulesShowHint.showHintValue,
      options: {
        hintOptions: {},
      },
      startPos: {
        line: 1,
      },
    };

    describe('when "selections.length" more than 1', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [1, 2],
        };

        expect(fakeCodeMirror.showHintValue(initialOptions)).toBeUndefined();
      });
    });

    describe('when there is no "supportsSelection"', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          somethingSelected: () => true,
        };

        expect(fakeCodeMirror.showHintValue(initialOptions)).toBeUndefined();
      });
    });

    describe('when "supportsSelection" exists', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [
            {
              head: {
                line: 'test',
              },
              anchor: {
                line: 'test_2',
              },
            }
          ],
          somethingSelected: () => true,
        };
        const options = {
          hint: {
            supportsSelection: true,
          },
        };

        expect(fakeCodeMirror.showHintValue(options)).toBeUndefined();
      });

      it('should trigger "close"', () => {
        const line = 'test';
        const close = jest.fn();
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          listSelections: () => [
            {
              head: {
                line,
              },
              anchor: {
                line,
              },
            }
          ],
          getCursor: () => ({ line }),
          somethingSelected: () => true,
          state: {
            completionActive: {
              close,
            },
          },
        };
        const options = {
          hint: {
            supportsSelection: true,
          },
        };

        fakeCodeMirror.showHintValue(options);

        expect(close).toHaveBeenCalled();
      });
    });

    describe('when there is no "hint" and "somethingSelected" returns false', () => {
      it('should return undefined', () => {
        const fakeCodeMirror = {
          ...commonCodeMirrorMocks,
          getCursor: () => ({ line: 'test' }),
          somethingSelected: () => false,
          state: {},
        };

        expect(fakeCodeMirror.showHintValue(rulesShowHint.defaultOptions)).toBeUndefined();
      });
    });
  });

  describe('Completion', () => {
    const initialPosName = 'start';
    const startPos = {
      line: 'test',
      ch: 1,
    };
    const cm = {
      getCursor: jest.fn(() => startPos),
      getLine: jest.fn((line) => line),
      getSelection: jest.fn(() => []),
      on: jest.fn((name, cb) => cb()),
      off: jest.fn((name, cb) => cb()),
      replaceRange: jest.fn(),
      somethingSelected: jest.fn(),
      state: {},
    };
    const options = {
      closeCharacters: /test/,
      hint: {},
      completeSingle: {},
    };

    describe('initialization', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-new
        new rulesShowHint.Completion(cm);
      });

      it('should trigger "getCursor" with correct argument', () => {
        expect(cm.getCursor).toHaveBeenCalledWith(initialPosName);
      });

      it('should trigger "getLine" with correct argument', () => {
        expect(cm.getLine).toHaveBeenCalledWith(startPos.line);
      });

      it('should trigger "getSelection"', () => {
        expect(cm.getSelection).toHaveBeenCalled();
      });
    });

    describe('"close" method', () => {
      const data = {};
      const widget = {
        close: jest.fn(),
      };
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm);
        completion.active = jest.fn(() => true);
      });

      it('should return undefined', () => {
        completion.active = jest.fn(() => false);

        expect(completion.close()).toBeUndefined();
      });

      it('should trigger "cm.off" with correct arguments', () => {
        const expectedArgs = ['cursorActivity', completion.handleCursorActivity];

        completion.close();

        expect(cm.off).toHaveBeenCalledWith(...expectedArgs);
      });

      it('should trigger "CodeMirror.signal" with correct arguments', () => {
        const expectedArgs = [completion.cm, 'endCompletion', completion.cm];

        completion.close();

        expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
      });

      it('should trigger "CodeMirror.signal" when "widget" and "data" are truly', () => {
        const expectedArgs = [data, 'close'];

        completion.widget = widget;
        completion.data = data;
        completion.close();

        expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
      });

      it('should trigger "widget.close" when "widget" is truly', () => {
        completion.widget = widget;
        completion.data = data;
        completion.close();

        expect(widget.close).toHaveBeenCalled();
      });
    });

    describe('"active" method', () => {
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm);
      });

      it('should return true', () => {
        completion.cm.state.completionActive = completion;

        expect(completion.active()).toBe(true);
      });

      it('should return false', () => {
        completion.cm.state.completionActive = null;

        expect(completion.active()).toBe(false);
      });
    });

    describe('"pick" method', () => {
      const pickedItem = {
        from: 'pickedItemFrom',
        to: 'pickedItemTo',
      };
      const pickedItemIndex = 0;
      const basicData = {
        sections: [
          {
            list: [pickedItem]
          },
          {
            list: [pickedItem]
          },
        ],
        from: 'from',
        to: 'to',
      };

      describe('when completion "from" and "to" exist', () => {
        const currentSectionIndex = 1;
        let completion;

        beforeEach(() => {
          completion = new rulesShowHint.Completion(cm);
          completion.widget = {
            currentSectionIndex,
          };
          completion.pick(basicData, pickedItemIndex);
        });

        it('should trigger "cm.replaceRange" with correct arguments', () => {
          const expectedArgs = [
            'text',
            basicData.sections[currentSectionIndex].list[pickedItemIndex].from,
            basicData.sections[currentSectionIndex].list[pickedItemIndex].to,
            'complete'
          ];

          expect(cm.replaceRange).toHaveBeenCalledWith(...expectedArgs);
        });

        it('should trigger "CodeMirror.signal" with correct arguments', () => {
          const expectedArgs = [basicData, 'pick', pickedItem];

          expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
        });
      });

      describe('when completion "from" and "to" do not exist', () => {
        it('should trigger "cm.replaceRange" with correct arguments', () => {
          const data = {
            ...basicData,
            sections: [
              {
                list: [{}],
              }
            ],
          };
          const expectedArgs = ['text', data.from, data.to, 'complete'];
          const completion = new rulesShowHint.Completion(cm);

          completion.pick(data, pickedItemIndex);

          expect(cm.replaceRange).toHaveBeenCalledWith(...expectedArgs);
        });
      });
    });

    describe('"multiplePick" method', () => {
      const currentSectionIndex = 0;
      const completionId = 'completionId';
      const selectedItemsIds = [completionId];
      const data = {
        from: 'from',
        to: 'to',
        sections: [
          {
            list: [
              {
                id: completionId,
              }
            ]
          },
        ],
      };
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm);
        completion.widget = {
          currentSectionIndex,
        };
        completion.multiplePick(data, selectedItemsIds);
      });

      it('should trigger "CodeMirror.signal" once with correct arguments', () => {
        const expectedArgs = [data, 'pick', data.sections[0].list[0]];

        expect(CodeMirror.signal).toHaveBeenNthCalledWith(1, ...expectedArgs);
      });

      it('should trigger "cm.replaceRange" with correct arguments', () => {
        const expectedArgs = ['indent', data.from, data.to, 'complete'];

        expect(cm.replaceRange).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"cursorActivity" method', () => {
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm, options);
      });

      describe('when "debounce" is not 0', () => {
        beforeEach(() => {
          completion.debounce = 1;
        });

        it('should trigger "cancelAnimationFrame" with correct argument', () => {
          const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

          completion.cursorActivity();

          expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(completion.debounce);
        });

        it('should trigger "getCursor"', () => {
          completion.cursorActivity();

          expect(cm.getCursor).toHaveBeenCalled();
        });

        it('should trigger "getLine" with correct argument', () => {
          completion.cursorActivity();

          expect(cm.getLine).toHaveBeenCalledWith(startPos.line);
        });

        it('should trigger "close"', () => {
          const closeSpy = jest.spyOn(completion, 'close');

          cm.getCursor.mockReturnValueOnce({
            line: 'test',
          });
          completion.cursorActivity();

          expect(closeSpy).toHaveBeenCalled();
        });

        it('should not trigger "close"', () => {
          const closeSpy = jest.spyOn(completion, 'close');

          completion.cursorActivity();

          expect(closeSpy).not.toHaveBeenCalled();
        });

        it('should trigger "requestAnimationFrame"', () => {
          const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');

          completion.cursorActivity();

          expect(requestAnimationFrameSpy).toHaveBeenCalled();
        });

        it('should trigger "update"', () => {
          const updateSpy = jest.spyOn(completion, 'update');

          jest.spyOn(window, 'requestAnimationFrame').mockImplementationOnce(cb => cb());
          completion.cursorActivity();

          expect(updateSpy).toHaveBeenCalled();
        });

        it('should trigger "widget.disable"', () => {
          const widget = {
            disable: jest.fn(),
          };

          completion.widget = widget;
          completion.cursorActivity();

          expect(widget.disable).toHaveBeenCalled();
        });
      });

      describe('when "debounce" is 0', () => {
        it('should not trigger "cancelAnimationFrame"', () => {
          const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

          completion.debounce = 0;
          completion.cursorActivity();

          expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('"update" method', () => {
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm, options);
      });

      describe('when "tick" is not null', () => {
        beforeEach(() => {
          utils.fetchHints.mockImplementationOnce((hint, codeMirror, opt, cb) => cb());
        });

        it('should trigger "fetchHints" with correct arguments', () => {
          const expectedArgs = [options.hint, cm, options, expect.any(Function)];

          completion.update();

          expect(utils.fetchHints).toHaveBeenCalledWith(...expectedArgs);
        });

        it('should trigger "finishUpdate"', () => {
          const finishUpdateSpy = jest.spyOn(completion, 'finishUpdate');

          completion.update();

          expect(finishUpdateSpy).toHaveBeenCalled();
        });
      });

      describe('when "tick" is null', () => {
        it('should not trigger "fetchHints"', () => {
          completion.tick = null;
          completion.update();

          expect(utils.fetchHints).not.toHaveBeenCalled();
        });
      });
    });

    describe('"finishUpdate" method', () => {
      const basicData = {
        sections: [],
      };
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm, options);
      });

      it('should trigger "pick" with correct arguments', () => {
        const pickSpy = jest.spyOn(completion, 'pick').mockImplementationOnce(() => {});
        const data = {
          sections: [
            {
              list: ['test'],
            }
          ],
        };
        const expectedArgs = [data, 0];

        completion.finishUpdate(data, true);

        expect(pickSpy).toHaveBeenCalledWith(...expectedArgs);
      });

      describe('when "this.data" is set', () => {
        it('should trigger "CodeMirror.signal" with correct arguments', () => {
          const expectedArgs = [basicData, 'update'];

          completion.data = basicData;
          completion.finishUpdate();

          expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
        });
      });

      describe('when "this.data" is not set', () => {
        it('should trigger "CodeMirror.signal"', () => {
          completion.finishUpdate();

          expect(CodeMirror.signal).not.toHaveBeenCalled();
        });
      });

      describe('when "this.widget" is set', () => {
        it('should trigger "widget.close"', () => {
          const widget = {
            close: jest.fn(),
          };

          completion.widget = widget;
          completion.finishUpdate();

          expect(widget.close).toHaveBeenCalled();
        });
      });

      describe('when "isNew" returns true', () => {
        let isNewSpy;

        beforeEach(() => {
          completion.data = basicData;
          isNewSpy = jest.spyOn(completion, 'isNew').mockReturnValueOnce(true);
          completion.finishUpdate(basicData);
        });


        it('should not trigger "isEmpty"', () => {
          const isEmptySpy = jest.spyOn(_, 'isEmpty');

          expect(isEmptySpy).not.toHaveBeenCalled();
        });

        it('should trigger "isNew" with correct arguments', () => {
          const expectedArgs = [basicData, basicData];

          expect(isNewSpy).toHaveBeenCalledWith(...expectedArgs);
        });
      });

      describe('when "isNew" returns false', () => {
        it('should trigger "isEmpty"', () => {
          const isEmptySpy = jest.spyOn(_, 'isEmpty');

          jest.spyOn(completion, 'isNew').mockReturnValueOnce(false);
          completion.data = basicData;
          completion.finishUpdate(basicData);

          expect(isEmptySpy).toHaveBeenCalled();
        });
      });
    });

    describe('"isNew" method', () => {
      const newValue = {
        to: {
          ch: 2,
        },
        from: {
          ch: 1,
        },
      };
      const prevValue = {
        to: {
          ch: 3,
        },
        from: {
          ch: 1,
        },
      };
      let completion;

      beforeEach(() => {
        completion = new rulesShowHint.Completion(cm, options);
      });

      describe('when "moved" and "characterRangeChanged" are true', () => {
        it('should return true', () => {
          CodeMirror.cmpPos.mockReturnValueOnce(true);

          expect(completion.isNew(prevValue, newValue)).toBe(true);
        });
      });

      describe('when "moved" is false', () => {
        it('should return true', () => {
          CodeMirror.cmpPos.mockReturnValueOnce(false);

          expect(completion.isNew(prevValue, newValue)).toBe(false);
        });
      });

      describe('when "characterRangeChanged" is false', () => {
        it('should return true', () => {
          const changedPrevValue = {
            ...prevValue,
            to: {
              ch: 2,
            },
          };

          CodeMirror.cmpPos.mockReturnValueOnce(true);

          expect(completion.isNew(changedPrevValue, newValue)).toBe(false);
        });
      });
    });
  });

  describe('MultipleSelectionHintSection', () => {
    const sectionOptions = {
      buttonText: 'buttonText',
    };
    const cm = {};

    describe('initialization', () => {
      it('should trigger "classList.add" with correct argument', () => {
        const containerClass = 'CodeMirror-hints-multiple-selection';

        // eslint-disable-next-line no-new
        new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        expect(createElementMock.classList.add).toHaveBeenCalledWith(containerClass);
      });
    });

    describe('"initFilterField" method', () => {
      const filterPlaceholder = 'filterPlaceholder';
      let hintSection;
      let appendChildSpy;
      let createElementSpy;

      beforeEach(() => {
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        appendChildSpy = jest.spyOn(hintSection.header, 'appendChild');
        createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue({});

        hintSection.initFilterField(filterPlaceholder);
      });

      it('should trigger "document.createElement" with correct argument', () => {
        expect(createElementSpy).toHaveBeenCalledWith('input');
      });

      it('should trigger "header.appendChild" with correct argument', () => {
        const filterInput = {
          type: 'text',
          placeholder: filterPlaceholder,
          id: 'filter-locations-input',
          oninput: hintSection.handleFilterInputChange,
          onblur: hintSection.handleFilterInputBlur,
        };

        expect(appendChildSpy).toHaveBeenCalledWith(filterInput);
      });
    });

    describe('"handleFilterInputBlur" method', () => {
      it('should trigger "CodeMirror.signal" with correct arguments', () => {
        const expectedArgs = [cm, 'blurHintInput'];
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        hintSection.handleFilterInputBlur();

        expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"handleFilterInputChange" method', () => {
      let hintSection;

      beforeEach(() => {
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
      });

      describe('when "isEmpty" returns true', () => {
        it('should not trigger "clearItemsActivation"', () => {
          const clearItemsActivationSpy = jest.spyOn(hintSection, 'clearItemsActivation');

          jest.spyOn(_, 'isEmpty').mockReturnValueOnce(true);
          hintSection.handleFilterInputChange();

          expect(clearItemsActivationSpy).not.toHaveBeenCalled();
        });
      });

      describe('when "isEmpty" returns false', () => {
        let clearItemsActivationSpy;
        let filterItemsSpy;
        let changeActiveSpy;

        beforeEach(() => {
          jest.spyOn(_, 'isEmpty').mockReturnValueOnce(false);
          clearItemsActivationSpy = jest.spyOn(hintSection, 'clearItemsActivation').mockImplementation(() => {});
          filterItemsSpy = jest.spyOn(hintSection, 'filterItems').mockImplementation(() => {});
          changeActiveSpy = jest.spyOn(hintSection, 'changeActive').mockImplementation(() => {});

          hintSection.handleFilterInputChange();
        });

        it('should trigger "clearItemsActivation"', () => {
          expect(clearItemsActivationSpy).toHaveBeenCalled();
        });

        it('should trigger "filterItems"', () => {
          expect(filterItemsSpy).toHaveBeenCalled();
        });

        it('should trigger "changeActive"', () => {
          expect(changeActiveSpy).toHaveBeenCalled();
        });
      });
    });

    describe('"clearItemsActivation" method', () => {
      it('should trigger "classList.toggle" with correct arguments', () => {
        const expectedArgs = [ACTIVE_HINT_ELEMENT_CLASS, false];
        const childNodes = [
          {
            classList: {
              toggle: jest.fn(),
            },
          }
        ];

        jest.spyOn(document, 'createElement').mockReturnValue({
          childNodes,
        });

        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        hintSection.clearItemsActivation();

        expect(childNodes[0].classList.toggle).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"filterItems" method', () => {
      const filterValue = 'displayText';
      const options = {
        ...sectionOptions,
        list: [
          {
            displayText: 'displayText',
            id: 'id',
          }
        ],
      };

      describe('when "itemsOptions" is empty', () => {
        const childNodes = [
          {
            classList: {
              toggle: jest.fn(),
            },
            querySelector: jest.fn(),
          }
        ];

        beforeEach(() => {
          jest.spyOn(document, 'createElement').mockReturnValue({
            childNodes,
          });
          jest.spyOn(_, 'isEmpty').mockReturnValue(true);

          const hintSection = new rulesShowHint.MultipleSelectionHintSection(options, cm);

          hintSection.filterItems(filterValue);
        });

        it('should not trigger "classList.toggle"', () => {
          expect(childNodes[0].classList.toggle).not.toHaveBeenCalled();
        });

        it('should not trigger "querySelector"', () => {
          expect(childNodes[0].querySelector).not.toHaveBeenCalled();
        });
      });

      describe('when "itemsOptions" is not empty', () => {
        beforeEach(() => {
          jest.spyOn(_, 'isEmpty')
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        });

        describe('when "querySelector" found elements', () => {
          const childNodes = [
            {
              classList: {
                toggle: jest.fn(),
              },
              querySelector: jest.fn(() => ({
                id: 'elementId',
              })),
            }
          ];
          let hintSection;
          let highlightFilterValueSpy;

          beforeEach(() => {
            jest.spyOn(document, 'createElement').mockReturnValue({
              childNodes,
            });

            hintSection = new rulesShowHint.MultipleSelectionHintSection(options, cm);
            highlightFilterValueSpy = jest.spyOn(hintSection, 'highlightFilterValue').mockReturnValue('test');
            hintSection.filterItems(filterValue);
          });

          it('should trigger "classList.toggle" with correct arguments', () => {
            const expectedArgs = ['hidden', true];

            expect(childNodes[0].classList.toggle).toHaveBeenCalledWith(...expectedArgs);
          });

          it('should trigger "querySelector" twice and with correct argument', () => {
            const expectedArgs = ['input', 'label'];

            expectedArgs.forEach((argument, index) => {
              expect(childNodes[0].querySelector).toHaveBeenNthCalledWith(index + 1, argument);
            });
          });

          it('should trigger "highlightFilterValue"', () => {
            expect(highlightFilterValueSpy).toHaveBeenCalled();
          });
        });

        describe('when "querySelector" did not find elements', () => {
          const childNodes = [
            {
              classList: {
                toggle: jest.fn(),
              },
              querySelector: jest.fn(() => null),
            }
          ];
          let hintSection;
          let highlightFilterValueSpy;

          beforeEach(() => {
            jest.spyOn(document, 'createElement').mockReturnValue({ childNodes });

            hintSection = new rulesShowHint.MultipleSelectionHintSection(options, cm);
            highlightFilterValueSpy = jest.spyOn(hintSection, 'highlightFilterValue').mockReturnValue('test');
            hintSection.filterItems(filterValue);
          });

          it('should not trigger "classList.toggle"', () => {
            expect(childNodes[0].classList.toggle).not.toHaveBeenCalled();
          });

          it('should not trigger "highlightFilterValue"', () => {
            expect(highlightFilterValueSpy).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('"highlightFilterValue" method', () => {
      it('should trigger "displayText.replace" with correct arguments', () => {
        const displayText = 'displayText';
        const filterValue = 'filterValue*+';
        const expectedArgs = [/filterValue\*\+/gi, expect.any(Function)];
        const replaceSpy = jest.spyOn(String.prototype, 'replace');
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        hintSection.highlightFilterValue(displayText, filterValue);

        expect(replaceSpy).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"initCompletionButton" method', () => {
      const buttonText = 'buttonText';
      let hintSection;
      let appendChildSpy;
      let createElementSpy;
      let setCompletionButtonVisibilitySpy;

      beforeEach(() => {
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        appendChildSpy = jest.spyOn(hintSection.buttonContainer, 'appendChild');
        setCompletionButtonVisibilitySpy = jest.spyOn(hintSection, 'setCompletionButtonVisibility');
        createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue({});

        hintSection.initCompletionButton(buttonText);
      });

      it('should trigger "document.createElement" with correct argument', () => {
        expect(createElementSpy).toHaveBeenCalledWith('button');
      });

      it('should trigger "setCompletionButtonVisibility" with correct argument', () => {
        expect(setCompletionButtonVisibilitySpy).toHaveBeenCalledWith(false);
      });

      it('should trigger "buttonContainer.appendChild" with correct argument', () => {
        const filterInput = {
          className: 'CodeMirror-hint-section-button',
          innerHTML: buttonText,
          onclick: hintSection.handleButtonClick,
        };

        expect(appendChildSpy).toHaveBeenCalledWith(filterInput);
      });
    });

    describe('"handleButtonClick" method', () => {
      it('should trigger "CodeMirror.signal" with correct arguments', () => {
        const checkedItemsIds = ['id'];
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        const expectedArgs = [cm, 'multiplePick', checkedItemsIds];

        jest.spyOn(hintSection, 'getCheckedItemsIds').mockReturnValueOnce(checkedItemsIds);
        hintSection.handleButtonClick();

        expect(CodeMirror.signal).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"createListItemContent" method', () => {
      const displayText = 'displayText';
      const itemOptions = {
        id: 'id',
      };
      let hintSection;
      let createElementSpy;

      beforeEach(() => {
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue({});
      });

      describe('when "isAnyItem" returns true', () => {
        beforeEach(() => {
          utils.isAnyItem.mockReturnValue(true);
          utils.createContainer.mockClear();
          hintSection.createListItemContent(displayText, itemOptions);
        });

        it('should not trigger "createContainer"', () => {
          expect(utils.createContainer).not.toHaveBeenCalled();
        });
      });

      describe('when "isAnyItem" returns false', () => {
        beforeEach(() => {
          utils.isAnyItem.mockReturnValue(false);
          createElementMock.appendChild.mockClear();
          hintSection.createListItemContent(displayText, itemOptions);
        });

        it('should trigger "createContainer" with correct argument', () => {
          expect(utils.createContainer).toHaveBeenCalledWith('CodeMirror-checkbox-container');
        });

        it('should trigger "document.createElement" twice with correct argument', () => {
          const expectedArgs = ['label', 'input'];

          expectedArgs.forEach((argument, index) => {
            expect(createElementSpy).toHaveBeenNthCalledWith(index + 1, argument);
          });
        });

        it('should trigger "checkBoxContainer.appendChild" twice', () => {
          expect(createElementMock.appendChild).toHaveBeenCalledTimes(2);
        });
      });
    });

    describe('"checkItem" method', () => {
      let hintSection;
      let getItemCheckBoxSpy;
      let setCompletionButtonEnablingSpy;
      let hasSelectedItemsSpy;

      beforeEach(() => {
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        getItemCheckBoxSpy = jest.spyOn(hintSection, 'getItemCheckBox').mockImplementation(() => ({}));
        setCompletionButtonEnablingSpy = jest.spyOn(hintSection, 'setCompletionButtonEnabling').mockImplementation(() => {});
        hasSelectedItemsSpy = jest.spyOn(hintSection, 'hasSelectedItems').mockImplementation(() => {});

        hintSection.checkItem();
      });

      it('should trigger "getItemCheckBox"', () => {
        expect(getItemCheckBoxSpy).toHaveBeenCalled();
      });

      it('should trigger "setCompletionButtonEnabling"', () => {
        expect(setCompletionButtonEnablingSpy).toHaveBeenCalled();
      });

      it('should trigger "hasSelectedItems"', () => {
        expect(hasSelectedItemsSpy).toHaveBeenCalled();
      });
    });

    describe('"setCompletionButtonVisibility" method', () => {
      it('should trigger "classList.toggle" with correct arguments', () => {
        const isVisible = true;
        const expectedArgs = ['hidden', !isVisible];
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        createElementMock.classList.toggle.mockClear();
        hintSection.setCompletionButtonVisibility(isVisible);

        expect(createElementMock.classList.toggle).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"setCompletionButtonEnabling" method', () => {
      it('should trigger "classList.toggle" with correct arguments', () => {
        const isEnabled = true;
        const expectedArgs = ['disabled', !isEnabled];
        const toggle = jest.fn();

        jest.spyOn(document, 'createElement').mockReturnValue({
          classList: {
            toggle,
          },
        });

        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        toggle.mockClear();
        hintSection.setCompletionButtonEnabling(isEnabled);

        expect(toggle).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('"getItemCheckBox" method', () => {
      const hintIndex = 1;
      const getElementsByTagName = jest.fn(() => []);
      let getListNodeAtSpy;

      beforeEach(() => {
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        getListNodeAtSpy = jest.spyOn(hintSection, 'getListNodeAt').mockReturnValue({ getElementsByTagName });
        hintSection.getItemCheckBox(hintIndex);
      });

      it('should trigger "getListNodeAt" with correct argument', () => {
        expect(getListNodeAtSpy).toHaveBeenCalledWith(hintIndex);
      });

      it('should trigger "getElementsByTagName" with correct argument', () => {
        expect(getElementsByTagName).toHaveBeenCalledWith('input');
      });
    });

    describe('"hasSelectedItems" method', () => {
      const checkedItemsIds = ['id'];
      let getCheckedItemsIdsSpy;
      let isEmptySpy;

      beforeEach(() => {
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        isEmptySpy = jest.spyOn(_, 'isEmpty');
        getCheckedItemsIdsSpy = jest.spyOn(hintSection, 'getCheckedItemsIds').mockReturnValue(checkedItemsIds);
        hintSection.hasSelectedItems();
      });

      it('should trigger "isEmpty" with correct argument', () => {
        expect(isEmptySpy).toHaveBeenCalledWith(checkedItemsIds);
      });

      it('should trigger "getCheckedItemsIds"', () => {
        expect(getCheckedItemsIdsSpy).toHaveBeenCalled();
      });
    });

    describe('"getCheckedItemsIds" method', () => {
      it('should return ids array', () => {
        const checkedItems = [
          {
            checked: true,
            id: 'itemId',
          }
        ];

        jest.spyOn(document, 'createElement').mockReturnValue({
          getElementsByTagName: () => checkedItems,
        });

        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        expect(hintSection.getCheckedItemsIds()).toEqual([checkedItems[0].id]);
      });
    });

    describe('"setList" method', () => {
      describe('when "filterInput.value" is truly', () => {
        let updateSectionWidthSpy;
        let setCompletionButtonVisibilitySpy;
        let setCompletionButtonEnablingSpy;
        let hasSelectedItemsSpy;
        let handleFilterInputChangeSpy;
        let hintSection;

        beforeEach(() => {
          jest.spyOn(document, 'createElement').mockReturnValue({
            value: 'value',
          });
          hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

          updateSectionWidthSpy = jest.spyOn(hintSection, 'updateSectionWidth').mockImplementation(() => {});
          handleFilterInputChangeSpy = jest.spyOn(hintSection, 'handleFilterInputChange').mockImplementation(() => {});
          setCompletionButtonVisibilitySpy = jest.spyOn(hintSection, 'setCompletionButtonVisibility').mockImplementation(() => {});
          setCompletionButtonEnablingSpy = jest.spyOn(hintSection, 'setCompletionButtonEnabling').mockImplementation(() => {});
          hasSelectedItemsSpy = jest.spyOn(hintSection, 'hasSelectedItems').mockImplementation(() => {});

          hintSection.setList([]);
        });

        it('should trigger "updateSectionWidth"', () => {
          expect(updateSectionWidthSpy).toHaveBeenCalled();
        });

        it('should trigger "updateSectionWidth"', () => {
          expect(handleFilterInputChangeSpy).toHaveBeenCalled();
        });

        it('should trigger "setCompletionButtonVisibility" with correct argument', () => {
          expect(setCompletionButtonVisibilitySpy).toHaveBeenCalledWith(false);
        });

        it('should trigger "setCompletionButtonEnabling"', () => {
          expect(setCompletionButtonEnablingSpy).toHaveBeenCalled();
        });

        it('should trigger "hasSelectedItems"', () => {
          expect(hasSelectedItemsSpy).toHaveBeenCalled();
        });
      });

      describe('when "filterInput.value" is falsy', () => {
        it('should not trigger "handleFilterInputChange"', () => {
          jest.spyOn(document, 'createElement').mockReturnValue({
            value: '',
          });

          const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
          const handleFilterInputChangeSpy = jest.spyOn(hintSection, 'handleFilterInputChange').mockImplementation(() => {});

          jest.spyOn(hintSection, 'updateSectionWidth').mockImplementation(() => {});
          jest.spyOn(hintSection, 'setCompletionButtonVisibility').mockImplementation(() => {});
          jest.spyOn(hintSection, 'setCompletionButtonEnabling').mockImplementation(() => {});
          jest.spyOn(hintSection, 'hasSelectedItems').mockImplementation(() => {});

          hintSection.setList([]);

          expect(handleFilterInputChangeSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('"updateSectionWidth" method', () => {
      const headerStyle = {
        width: 'width',
        margin: 'margin',
      };
      let hintSection;
      let getComputedStyleSpy;

      beforeEach(() => {
        jest.spyOn(document, 'createElement').mockReturnValue({
          style: {},
        });

        getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue(headerStyle);
        hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);

        hintSection.updateSectionWidth();
      });

      it('should trigger "getComputedStyle"', () => {
        expect(getComputedStyleSpy).toHaveBeenCalled();
      });

      it('should modify "listContainer"', () => {
        const expectedResult = {
          style: {
            ...headerStyle,
          },
        };

        expect(hintSection.listContainer).toEqual(expect.objectContaining(expectedResult));
      });
    });

    describe('"listNodes" method', () => {
      const displayedNodes = [];
      let getDisplayedNodesSpy;
      let nodes;

      beforeEach(() => {
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        getDisplayedNodesSpy = jest.spyOn(hintSection, 'getDisplayedNodes').mockReturnValue(displayedNodes);

        nodes = hintSection.listNodes;
      });

      it('should trigger "getDisplayedNodes"', () => {
        expect(getDisplayedNodesSpy).toHaveBeenCalled();
      });

      it('should return list nodes', () => {
        expect(nodes).toEqual(displayedNodes);
      });
    });

    describe('"getListNodeAt" method', () => {
      const displayedNodes = ['node'];
      const index = 0;
      let getDisplayedNodesSpy;
      let node;

      beforeEach(() => {
        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        getDisplayedNodesSpy = jest.spyOn(hintSection, 'getDisplayedNodes').mockReturnValue(displayedNodes);

        node = hintSection.getListNodeAt(index);
      });

      it('should trigger "getDisplayedNodes"', () => {
        expect(getDisplayedNodesSpy).toHaveBeenCalled();
      });

      it('should return node', () => {
        expect(node).toEqual(displayedNodes[index]);
      });
    });

    describe('"getDisplayedNodes" method', () => {
      it('should return nodes', () => {
        const childNodes = [
          {
            classList: {
              contains: () => false,
            },
          },
        ];

        jest.spyOn(document, 'createElement').mockReturnValue({
          childNodes,
        });

        const hintSection = new rulesShowHint.MultipleSelectionHintSection(sectionOptions, cm);
        const nodes = hintSection.getDisplayedNodes();

        expect(nodes).toEqual(childNodes);
      });
    });
  });

  describe('parseOptions', () => {
    const hintOptions = {
      test: 'test',
    };
    const options = {
      test_2: 'test_2',
    };
    const cm = {
      options: {
        hintOptions,
      },
    };
    const pos = {};

    describe('when "parsedOptions.hint.resolve" exists', () => {
      it('should trigger "resolve" with correct arguments', () => {
        const resolve = jest.fn();

        CodeMirror.hint.auto.resolve.mockImplementationOnce(resolve);
        rulesShowHint.parseOptions(cm, pos, options);

        expect(resolve).toHaveBeenCalledWith(cm, pos);
      });

      it('should return options', () => {
        const resolveResult = 'test_result';
        const expectedResult = {
          ...hintOptions,
          ...options,
          ...rulesShowHint.defaultOptions,
          hint: resolveResult,
        };

        CodeMirror.hint.auto.resolve.mockImplementationOnce(() => resolveResult);

        expect(rulesShowHint.parseOptions(cm, pos, options)).toEqual(expectedResult);
      });
    });
  });

  describe('resolveAutoHints', () => {
    describe('when "getHelpers" returns array with data', () => {
      const helpers = ['helper'];
      const applicableHelpers = [];
      const cm = {
        getHelpers: () => helpers,
      };
      const options = {};
      const codeMirror = {};
      const returnedFunction = rulesShowHint.resolveAutoHints(cm);

      it('should return function which has additional properties', () => {
        const expectedProperties = {
          async: true,
          supportsSelection: true,
        };

        expect(returnedFunction).toEqual(expect.objectContaining(expectedProperties));
      });

      it('should trigger "getApplicableHelpers" from returned function', () => {
        const getApplicableHelpersSpy = jest.spyOn(utils, 'getApplicableHelpers')
          .mockReturnValueOnce(applicableHelpers);

        returnedFunction(codeMirror, () => {}, options);

        expect(getApplicableHelpersSpy).toHaveBeenCalledWith(codeMirror, helpers);
      });

      it('should trigger "callback" with null', () => {
        const callback = jest.fn();

        utils.getApplicableHelpers.mockReturnValueOnce(applicableHelpers);
        returnedFunction(codeMirror, callback, options);

        expect(callback).toHaveBeenCalledWith(null);
      });

      it('should trigger "fetchHints"', () => {
        const fetchHintsSpy = jest.spyOn(utils, 'fetchHints').mockImplementationOnce((helper, codeM, opt, callback) => callback());
        const appHelper = [{}];
        const helperIndex = 0;

        utils.getApplicableHelpers.mockReturnValueOnce(appHelper);
        returnedFunction(codeMirror, () => {}, options);

        expect(fetchHintsSpy).toHaveBeenCalledWith(appHelper[helperIndex], codeMirror, options, expect.any(Function));
      });
    });

    describe('when "getHelpers" returns empty array', () => {
      const cm = {
        getHelpers: () => [],
        getCursor: () => [],
      };

      it('should return noop', () => {
        const getHelper = jest.fn(() => '');

        expect(rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        })).toBe(_.noop);
      });

      it('should trigger "fromList" from returned function', () => {
        const fromListSpy = jest.spyOn(CodeMirror.hint, 'fromList');
        const words = 'test';
        const getHelper = jest.fn(() => words);
        const codeMirror = {};
        const returnedFunction = rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        });

        returnedFunction(codeMirror);

        expect(fromListSpy).toHaveBeenCalledWith(codeMirror, { words });
      });

      it('should trigger "anyword" from returned function', () => {
        const anyword = jest.fn();
        const getHelper = jest.fn(() => '');
        const codeMirror = {};
        const options = {};

        CodeMirror.hint.anyword = anyword;

        const returnedFunction = rulesShowHint.resolveAutoHints({
          ...cm,
          getHelper,
        });

        returnedFunction(codeMirror, options);

        expect(anyword).toHaveBeenCalledWith(codeMirror, options);
      });
    });
  });

  describe('getFromList', () => {
    const line = 1;
    const to = 5;
    const from = 8;
    const string = 'string';
    const commonCm = {
      getCursor: () => ({
        line,
      }),
      getTokenAt: () => ({
        end: 1,
        start: 2,
        string,
      }),
    };
    const options = {
      words: [],
    };

    describe('when there are founded words', () => {
      it('should use "CodeMirror.Pos" data for returned object', () => {
        const words = [string];
        const expectedResult = {
          list: words,
          from,
          to,
        };

        CodeMirror.Pos
          .mockReturnValueOnce(to)
          .mockReturnValueOnce(from);

        expect(rulesShowHint.getFromList(commonCm, { words })).toEqual(expectedResult);
      });

      it('should return "from" and "to" properties which are equal', () => {
        const words = [''];
        const cm = {
          ...commonCm,
          getTokenAt: () => ({
            end: 1,
            start: 2,
          }),
        };
        const expectedResult = {
          list: words,
          from: to,
          to,
        };

        CodeMirror.Pos
          .mockReturnValueOnce(to);

        expect(rulesShowHint.getFromList(cm, { words })).toEqual(expectedResult);
      });
    });

    describe('when there are no founded words', () => {
      it('should return undefined', () => {
        expect(rulesShowHint.getFromList(commonCm, options)).toBeUndefined();
      });
    });
  });

  describe('Widget', () => {
    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

    const baseCompletion = {
      options: {
        container: {
          appendChild: jest.fn(),
        }
      },
      cm: {
        addKeyMap: jest.fn(),
        removeKeyMap: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        getScrollInfo: jest.fn(),
        getCursor: jest.fn(() => ({
          ch: '',
        })),
        getWrapperElement: jest.fn(() => ({
          getBoundingClientRect: jest.fn(),
        })),
        focus: jest.fn(),
        cursorCoords: jest.fn(() => ({
          left: 1,
          bottom: 1,
          top: 1,
        })),
      },
      multiplePick: jest.fn(),
      pick: jest.fn(),
    };
    const baseWidgetData = {
      sections: [
        {
          list: [],
        },
      ],
      from: {},
    };

    describe('Initialization', () => {
      it('should trigger "addKeyMap"', () => {
        // eslint-disable-next-line no-new
        new rulesShowHint.Widget(baseCompletion, baseWidgetData);

        expect(baseCompletion.cm.addKeyMap).toHaveBeenCalled();
      });
    });

    describe('buildKeyMap', () => {
      const menuSize = 1;
      const movingStep = 1;
      const initialFocus = 0;
      const handler = {
        moveFocus: jest.fn(),
        setFocus: jest.fn(),
        menuSize: jest.fn(() => menuSize),
        pick: '',
        close: '',
        length: 5,
      };

      afterEach(jest.clearAllMocks);

      describe('When customKeys and extraKeys are not set', () => {
        const completion = {
          options: {},
        };

        const keyMap = rulesShowHint.Widget.buildKeyMap(completion, handler);

        it('should trigger moveFocus with correct argument when Up called', () => {
          keyMap.Up();

          expect(handler.moveFocus).toHaveBeenCalledWith(-movingStep);
        });

        it('should trigger moveFocus with correct argument when Down called', () => {
          keyMap.Down();

          expect(handler.moveFocus).toHaveBeenCalledWith(movingStep);
        });

        it('should trigger moveFocus with correct argument when PageUp called', () => {
          keyMap.PageUp();

          expect(handler.moveFocus).toHaveBeenCalledWith(-menuSize + movingStep, true);
        });

        it('should trigger moveFocus with correct argument when PageDown called', () => {
          keyMap.PageDown();

          expect(handler.moveFocus).toHaveBeenCalledWith(menuSize - movingStep, true);
        });

        it('should trigger setFocus with correct argument when Home called', () => {
          keyMap.Home();

          expect(handler.setFocus).toHaveBeenCalledWith(initialFocus);
        });

        it('should trigger setFocus with correct argument when End called', () => {
          keyMap.End();

          expect(handler.setFocus).toHaveBeenCalledWith(handler.length - movingStep);
        });
      });

      describe('When customKeys are set', () => {
        const completion = {
          options: {
            customKeys: {
              customAction: jest.fn(),
              customProperty: '',
            },
          },
        };

        const keyMap = rulesShowHint.Widget.buildKeyMap(completion, handler);

        it('should trigger customAction', () => {
          keyMap.customAction();

          expect(completion.options.customKeys.customAction).toHaveBeenCalled();
        });
      });

      describe('When extraKeys are set', () => {
        const completion = {
          options: {
            extraKeys: {
              extraAction: jest.fn(),
              extraProperty: '',
            },
          },
        };

        const keyMap = rulesShowHint.Widget.buildKeyMap(completion, handler);

        it('should trigger extraAction', () => {
          keyMap.extraAction();

          expect(completion.options.extraKeys.extraAction).toHaveBeenCalled();
        });
      });
    });

    describe('getHintElement', () => {
      const targetElement = {
        closest: jest.fn(),
      };

      it('should trigger "targetElement.closest" with correct argument', () => {
        rulesShowHint.Widget.getHintElement(targetElement);

        expect(targetElement.closest).toHaveBeenCalledWith(`.${HINT_ELEMENT_CLASS}`);
      });
    });

    describe('getHintSectionIndex', () => {
      const targetElement = {
        closest: jest.fn().mockReturnValueOnce({
          children: {},
        }),
      };

      it('should trigger "targetElement.closest" twice with correct arguments', () => {
        const expectedArguments = [`.${HINT_SECTIONS_CONTAINER}`, `.${HINT_SECTION_CONTAINER}`];

        rulesShowHint.Widget.getHintSectionIndex(targetElement);

        expectedArguments.forEach((arg, index) => {
          expect(targetElement.closest).toHaveBeenNthCalledWith(index + 1, arg);
        });
      });
    });

    describe('handleSectionHintClick', () => {
      const hintId = '2';
      const sectionIndex = 1;
      const indexIncrement = 1;
      const targetElement = {
        type: 'test',
      };
      let getHintSectionIndexSpy;

      beforeEach(() => {
        jest.spyOn(rulesShowHint.Widget, 'getHintElement').mockReturnValue({
          hintId,
        });
        getHintSectionIndexSpy = jest.spyOn(rulesShowHint.Widget, 'getHintSectionIndex').mockReturnValue(sectionIndex);
      });

      describe('When hint does not exist', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        let getHintElementSpy;

        beforeEach(() => {
          getHintElementSpy = jest.spyOn(rulesShowHint.Widget, 'getHintElement').mockReturnValue({});

          widget.handleSectionHintClick(targetElement);
        });

        it('should trigger getHintElement', () => {
          expect(getHintElementSpy).toHaveBeenCalled();
        });

        it('should not trigger getHintSectionIndex', () => {
          expect(getHintSectionIndexSpy).not.toHaveBeenCalled();
        });
      });

      describe('When hint id equals selectedHintIndex', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        let getSectionAtSpy;
        let getCurrentSectionSpy;

        beforeEach(() => {
          getCurrentSectionSpy = jest.spyOn(widget, 'getCurrentSection');
          getSectionAtSpy = jest.spyOn(widget, 'getSectionAt')
            .mockReturnValueOnce({
              itemsOptions: {
                option: 'testOption',
              },
            })
            .mockReturnValueOnce({
              selectedHintIndex: hintId,
            });

          widget.handleSectionHintClick(targetElement);
        });

        it('should trigger getHintSectionIndex', () => {
          expect(getHintSectionIndexSpy).toHaveBeenCalled();
        });

        it('should trigger getSectionAt twice', () => {
          expect(getSectionAtSpy).toHaveBeenCalledTimes(2);
        });

        it('should not trigger getCurrentSection', () => {
          expect(getCurrentSectionSpy).not.toHaveBeenCalled();
        });
      });

      describe('When isSectionChanged and isMultipleSelection are true', () => {
        const setCompletionButtonVisibility = jest.fn();
        const setCompletionButtonEnabling = jest.fn();
        let getCurrentSectionSpy;

        beforeEach(() => {
          const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

          jest.spyOn(widget, 'getSectionAt').mockReturnValue({
            selectedHintIndex: hintId,
          });
          jest.spyOn(widget, 'changeActive').mockReturnValue({});
          jest.spyOn(widget, 'pick').mockReturnValue({});
          getCurrentSectionSpy = jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: true,
            setCompletionButtonVisibility,
            setCompletionButtonEnabling,
            listNodes: {
              indexOf: jest.fn(),
            },
          });

          widget.handleSectionHintClick(targetElement);
        });

        it('should trigger getCurrentSection twice', () => {
          expect(getCurrentSectionSpy).toHaveBeenCalledTimes(3);
        });

        it('should trigger setCompletionButtonVisibility with correct argument', () => {
          expect(setCompletionButtonVisibility).toHaveBeenCalledWith(false);
        });

        it('should trigger setCompletionButtonVisibility with correct argument', () => {
          expect(setCompletionButtonVisibility).toHaveBeenCalledWith(false);
        });
      });

      describe('When isSectionChanged is true and isLastSection is false', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        let changeActiveSpy;
        let resetSectionsInCurrentSectionsListFromSpy;

        beforeEach(() => {
          jest.spyOn(widget, 'getSectionAt').mockReturnValue({
            selectedHintIndex: hintId,
          });
          jest.spyOn(widget, 'pick').mockReturnValue({});
          jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: false,
            listNodes: {
              indexOf: jest.fn(),
            },
          });
          changeActiveSpy = jest.spyOn(widget, 'changeActive').mockReturnValue({});
          resetSectionsInCurrentSectionsListFromSpy = jest.spyOn(widget, 'resetSectionsInCurrentSectionsListFrom');

          widget.handleSectionHintClick(targetElement);
        });

        it('should trigger resetSectionsInCurrentSectionsListFrom with correct argument', () => {
          expect(resetSectionsInCurrentSectionsListFromSpy).toHaveBeenCalledWith(sectionIndex + indexIncrement);
        });

        it('should trigger changeActiveSpy', () => {
          expect(changeActiveSpy).toHaveBeenCalled();
        });
      });

      describe('When there is a checkbox hint', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        const target = {
          type: 'checkbox',
        };
        let pickSpy;

        beforeEach(() => {
          jest.spyOn(widget, 'getSectionAt').mockReturnValue({
            selectedHintIndex: hintId,
          });
          jest.spyOn(widget, 'changeActive').mockReturnValue({});
          jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: false,
            listNodes: {
              indexOf: jest.fn(),
            },
          });
          pickSpy = jest.spyOn(widget, 'pick');

          widget.handleSectionHintClick(target);
        });

        it('should not trigger pick', () => {
          expect(pickSpy).not.toHaveBeenCalled();
        });
      });

      describe('When there is not a checkbox hint', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        let pickSpy;

        beforeEach(() => {
          jest.spyOn(widget, 'getSectionAt').mockReturnValue({
            selectedHintIndex: hintId,
          });
          jest.spyOn(widget, 'changeActive').mockReturnValue({});
          jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: false,
            listNodes: {
              indexOf: jest.fn(),
            },
          });
          pickSpy = jest.spyOn(widget, 'pick').mockReturnValue({});

          widget.handleSectionHintClick(targetElement);
        });

        it('should trigger pick', () => {
          expect(pickSpy).toHaveBeenCalled();
        });
      });
    });

    describe('handleMultiplePick', () => {
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

      it('should trigger multiplePick', () => {
        widget.handleMultiplePick();

        expect(baseCompletion.multiplePick).toHaveBeenCalled();
      });
    });

    describe('resetSectionsInCurrentSectionsListFrom', () => {
      const resetIndex = 0;
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

      it('should trigger clearItemsList once', () => {
        const clearItemsListSpy = jest.spyOn(widget.sections[0], 'clearItemsList');

        widget.resetSectionsInCurrentSectionsListFrom(resetIndex);

        expect(clearItemsListSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('moveToPreviousSectionInCurrentSectionsList', () => {
      describe('When isMultipleSelection is true', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        const setCompletionButtonVisibility = jest.fn();
        const setCompletionButtonEnabling = jest.fn();
        const clearItemsList = jest.fn();
        let getCurrentSectionSpy;
        const setSpies = (context) => {
          getCurrentSectionSpy = jest.spyOn(context, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: true,
            setCompletionButtonVisibility,
            setCompletionButtonEnabling,
            clearItemsList,
          });
        };

        beforeEach(() => {
          setSpies(widget);

          widget.moveToPreviousSectionInCurrentSectionsList();
        });

        it('should trigger getCurrentSection twice', () => {
          expect(getCurrentSectionSpy).toHaveBeenCalledTimes(2);
        });

        it('should trigger setCompletionButtonEnabling with correct argument', () => {
          expect(setCompletionButtonVisibility).toHaveBeenCalledWith(false);
        });

        it('should trigger getCurrentSection twice with correct argument', () => {
          expect(setCompletionButtonEnabling).toHaveBeenCalledWith(false);
        });

        it('should trigger clearItemsList', () => {
          expect(clearItemsList).toHaveBeenCalled();
        });

        it('should set currentSectionIndex to -1', () => {
          const newWidget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
          const newCurrentSectionIndex = -1;

          setSpies(newWidget);
          newWidget.moveToPreviousSectionInCurrentSectionsList();

          expect(newWidget.currentSectionIndex).toBe(newCurrentSectionIndex);
        });
      });

      describe('When isMultipleSelection is true', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
        const setCompletionButtonVisibility = jest.fn();
        const setCompletionButtonEnabling = jest.fn();

        beforeEach(() => {
          jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
            isMultipleSelection: false,
            setCompletionButtonVisibility,
            setCompletionButtonEnabling,
            clearItemsList: jest.fn(),
          });

          widget.moveToPreviousSectionInCurrentSectionsList();
        });

        it('should not trigger setCompletionButtonEnabling', () => {
          expect(setCompletionButtonVisibility).not.toHaveBeenCalled();
        });

        it('should not trigger getCurrentSection', () => {
          expect(setCompletionButtonEnabling).not.toHaveBeenCalled();
        });
      });
    });

    describe('getSelectedHintInCurrentSection', () => {
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
      const selectedHintIndex = 10;

      it('should return selected hint index', () => {
        jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
          selectedHintIndex,
        });

        const result = widget.getSelectedHintInCurrentSection();

        expect(result).toBe(selectedHintIndex);
      });
    });

    describe('getSectionAt', () => {
      describe('When data is provided', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

        it('should return correct section', () => {
          const sectionIndex = 0;
          const context = {
            sections: [{}]
          };
          const result = widget.getSectionAt(sectionIndex, context);

          expect(result).toBe(context.sections[sectionIndex]);
        });
      });

      describe('When data is not provided', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

        it('should return correct section', () => {
          const result = widget.getSectionAt();

          expect(result).toBe(widget.sections[widget.currentSectionIndex]);
        });
      });
    });

    describe('createSection', () => {
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

      it('should return instance of MultipleSelectionHintSection', () => {
        const sectionOptions = {
          isMultipleSelection: true,
        };
        const result = widget.createSection(sectionOptions, baseCompletion);

        expect(result).toBeInstanceOf(rulesShowHint.MultipleSelectionHintSection);
      });

      it('should return instance of HintSection', () => {
        const sectionOptions = {
          isMultipleSelection: false,
        };
        const result = widget.createSection(sectionOptions, baseCompletion);

        expect(result).toBeInstanceOf(HintSection);
      });
    });

    describe('setupNextSectionData', () => {
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);
      const selectionsIds = ['id'];
      let getCurrentSectionSpy;
      let getSectionAtSpy;


      beforeEach(() => {
        getCurrentSectionSpy = jest.spyOn(widget, 'getCurrentSection').mockReturnValue({
          childSection: {},
        });
        getSectionAtSpy = jest.spyOn(widget, 'getSectionAt').mockReturnValue({});
        jest.spyOn(widget, 'selectionsIds', 'get').mockReturnValue(selectionsIds);
        jest.spyOn(widget, 'selectionsIds', 'get').mockReturnValue(selectionsIds);

        widget.setupNextSectionData();
      });

      it('should trigger getCurrentSection with correct argument', () => {
        expect(getCurrentSectionSpy).toHaveBeenCalledWith(baseWidgetData);
      });

      it('should trigger getSectionAt with correct arguments', () => {
        const expectedArgs = [widget.currentSectionIndex + 1, baseWidgetData];

        expect(getSectionAtSpy).toHaveBeenCalledWith(...expectedArgs);
      });

      it('should trigger getSubMenuData with correct arguments', () => {
        const expectedArgs = [
          baseCompletion.cm,
          {
            childSection: {},
            parentIds: widget.selectionsIds,
            isLastSection: false,
          }
        ];

        expect(CodeMirror.hint.getSubMenuData).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('disable', () => {
      const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

      beforeEach(() => {
        widget.disable();
      });

      it('should trigger removeKeyMap', () => {
        expect(baseCompletion.cm.removeKeyMap).toHaveBeenCalled();
      });

      it('should trigger addKeyMap', () => {
        expect(baseCompletion.cm.addKeyMap).toHaveBeenCalled();
      });

      it('should set picked to true', () => {
        widget.keyMap.Enter();

        expect(widget.picked).toBe(true);
      });
    });

    describe('updatePosition', () => {
      const originalWindow = { ...window };

      describe('When overlapY is more than 0', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

        beforeEach(() => {
          jest.spyOn(global, 'window', 'get').mockReturnValue({
            ...originalWindow,
            innerHeight: 1,
          });
          widget.updatePosition();
        });

        it('should correctly set position styles', () => {
          expect(widget.position.top).toBe(0);
        });

        it('should correctly set container styles left', () => {
          expect(widget.container.style.left).toBe(`${widget.position.left}px`);
        });

        it('should correctly set container styles top', () => {
          expect(widget.container.style.top).toBe(`${widget.position.top}px`);
        });
      });

      describe('When overlapX is more than 0', () => {
        const widget = new rulesShowHint.Widget(baseCompletion, baseWidgetData);

        beforeEach(() => {
          jest.spyOn(global, 'window', 'get')
            .mockReturnValue({
              ...originalWindow,
              innerWidth: 1,
            });

          widget.updatePosition();
        });

        it('should correctly set position styles left', () => {
          expect(widget.position.left).toBe(0);
        });

        it('should correctly set container styles left', () => {
          expect(widget.container.style.left).toBe(`${widget.position.left}px`);
        });
      });
    });
  });
});
