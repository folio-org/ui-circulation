import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Codemirror from 'codemirror';

import '../../../../test/jest/__mock__';
// import buildStripes from '../../../../test/jest/__mock__/stripes.mock';

import RulesEditor, {
  handleBackspace,
  moveFocus,
  handleEnter,
  selectHint,
  handleTab,
  createTriangle, hintOptions,
} from './RulesEditor';
import {
  rulesHint,
  initSubMenuDataFetching,
} from './Rules-hint';

import { codeMirrorFullScreen } from './RulesEditor.css';

const codeMirrorArea = 'codeMirror';

jest.mock('react-codemirror2', () => ({
  Controlled: jest.fn((props) => {
    return (
      <input
        data-testid={codeMirrorArea}
        {...props}
      />
    );
  }),
}));
jest.mock('codemirror', () => ({
  fold: {
    rules: 'rules',
  },
  hint: {
    rulesCMM: [],
  },
  showHint: jest.fn(),
}));
jest.mock('./initRulesCMM', () => jest.fn());
jest.mock('./initFoldRules', () => jest.fn());
jest.mock('./Rules-hint', () => ({
  rulesHint: jest.fn(),
  initSubMenuDataFetching: jest.fn(),
}));
jest.mock('./rules-show-hint', () => jest.fn());
jest.mock('codemirror/addon/fold/foldcode', () => jest.fn());
jest.mock('codemirror/addon/fold/foldgutter', () => jest.fn());
jest.mock('codemirror/addon/hint/css-hint', () => jest.fn());

// const testStripes = buildStripes();

describe('RulesEditor', () => {
  describe('handleBackspace', () => {
    describe('when "widget.currentSectionIndex" less than one', () => {
      const deleteH = jest.fn();
      const codeMirror = {
        state: {
          completionActive: {
            widget: {
              currentSectionIndex: 0,
            },
          },
        },
        deleteH,
      };

      beforeAll(() => {
        handleBackspace(codeMirror);
      });

      it('should trigger "deleteH" with correct arguments', () => {
        const expectedArgs = [-1, 'char'];

        expect(deleteH).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('when "widget.currentSectionIndex" equals or more than one', () => {
      const moveToPreviousSectionInCurrentSectionsList = jest.fn();
      const codeMirror = {
        state: {
          completionActive: {
            widget: {
              currentSectionIndex: 2,
              moveToPreviousSectionInCurrentSectionsList,
            },
          },
        },
      };

      beforeAll(() => {
        handleBackspace(codeMirror);
      });

      it('should trigger "moveToPreviousSectionInCurrentSectionsList"', () => {
        expect(moveToPreviousSectionInCurrentSectionsList).toHaveBeenCalled();
      });
    });
  });

  describe('moveFocus', () => {
    it('should trigger "moveFocus" with correct "value"', () => {
      const moveFocusMock = jest.fn();
      const value = 'testValue';
      const codeMirror = {};
      const handle = {
        moveFocus: moveFocusMock,
      };

      moveFocus(value)(codeMirror, handle);

      expect(moveFocusMock).toHaveBeenCalledWith(value);
    });
  });

  describe('handleEnter', () => {
    describe('when "selectHint" returns true', () => {
      it('should not trigger "execCommand"', () => {
        const execCommand = jest.fn();
        const codeMirror = {
          execCommand,
          state: {
            completionActive: {
              widget: {
                currentSectionIndex: 0,
              },
            },
          },
        };
        const handle = {
          data: {
            sections: [{
              selectedHintIndex: 0,
              list: [{}],
            }],
          },
          pick: jest.fn(),
        };

        handleEnter(codeMirror, handle);

        expect(execCommand).not.toHaveBeenCalled();
      });
    });

    describe('when "selectHint" does not return true', () => {
      it('should trigger "execCommand" with correct argument', () => {
        const execCommand = jest.fn();
        const codeMirror = {
          execCommand,
          state: {
            completionActive: {
              widget: {
                currentSectionIndex: 0,
              },
            },
          },
        };
        const handle = {
          data: {
            sections: [{
              selectedHintIndex: -1,
            }],
          },
        };
        const expectedArg = 'newlineAndIndent';

        handleEnter(codeMirror, handle);

        expect(execCommand).toHaveBeenCalledWith(expectedArg);
      });
    });
  });

  describe('selectHint', () => {
    const codeMirror = {
      state: {
        completionActive: {
          widget: {
            currentSectionIndex: 0,
          },
        },
      },
    };

    describe('when "selectedHintIndex" fits condition', () => {
      const pick = jest.fn();
      const handle = {
        data: {
          sections: [
            {
              selectedHintIndex: 0,
              list: [{}],
            }
          ],
        },
        pick,
      };
      let result;

      beforeAll(() => {
        result = selectHint(codeMirror, handle);
      });

      it('should trigger "pick"', () => {
        expect(pick).toHaveBeenCalled();
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('when "selectedHintIndex" does not fit condition', () => {
      const pick = jest.fn();
      const handle = {
        data: {
          sections: [
            {
              selectedHintIndex: -1,
              list: [],
            }
          ],
        },
        pick,
      };
      let result;

      beforeAll(() => {
        result = selectHint(codeMirror, handle);
      });

      it('should not trigger "pick"', () => {
        expect(pick).not.toHaveBeenCalled();
      });

      it('should not return true', () => {
        expect(result).not.toBe(true);
      });
    });
  });

  describe('handleTab', () => {
    describe('when "selectHint" returns true', () => {
      it('should not trigger "getDoc"', () => {
        const getDoc = jest.fn();
        const codeMirror = {
          getDoc,
          state: {
            completionActive: {
              widget: {
                currentSectionIndex: 0,
              },
            },
          },
        };
        const handle = {
          data: {
            sections: [{
              selectedHintIndex: 0,
              list: [{}],
            }],
          },
          pick: jest.fn(),
        };

        handleTab(codeMirror, handle);

        expect(getDoc).not.toHaveBeenCalled();
      });
    });

    describe('when "somethingSelected" returns true', () => {
      it('should not trigger "indentSelection" with correct argument', () => {
        const indentSelection = jest.fn();
        const codeMirror = {
          indentSelection,
          somethingSelected: jest.fn(() => true),
          state: {
            completionActive: {
              widget: {
                currentSectionIndex: 0,
              },
            },
          },
        };
        const handle = {
          data: {
            sections: [{
              selectedHintIndex: -1,
            }],
          },
        };
        const expectedArg = 'add';

        handleTab(codeMirror, handle);

        expect(indentSelection).toHaveBeenCalledWith(expectedArg);
      });
    });

    describe('when "selectHint" and "somethingSelected" return false', () => {
      const cursor = {};
      const replaceRange = jest.fn();
      const getCursor = jest.fn(() => cursor);
      const getDoc = jest.fn(() => ({
        getCursor,
        replaceRange,
      }));
      const codeMirror = {
        getDoc,
        somethingSelected: jest.fn(() => false),
        state: {
          completionActive: {
            widget: {
              currentSectionIndex: 0,
            },
          },
        },
      };
      const handle = {
        data: {
          sections: [{
            selectedHintIndex: -1,
          }],
        },
      };

      beforeAll(() => {
        handleTab(codeMirror, handle);
      });

      it('should not trigger "getDoc"', () => {
        expect(getDoc).toHaveBeenCalled();
      });

      it('should not trigger "getCursor"', () => {
        expect(getCursor).toHaveBeenCalled();
      });

      it('should not trigger "replaceRange" with correct arguments', () => {
        const expectedArgs = ['\t', cursor];

        expect(replaceRange).toHaveBeenCalledWith(...expectedArgs);
      });
    });
  });

  describe('createTriangle', () => {
    const namespaceURL = 'http://www.w3.org/2000/svg';
    const svgAttribute = 'svg';
    const polygonAttribute = 'polygon';
    const divElement = 'div';

    describe('when "isOpen" is true', () => {
      const appendChild = jest.fn();
      const setAttribute = jest.fn();
      const elementMock = {
        style: {
          cssText: '',
        },
        appendChild,
      };
      const elementNSMock = {
        style: {
          cssText: '',
        },
        appendChild,
        setAttribute,
      };
      const createElementMock = jest.fn(() => elementMock);
      const createElementNSMock = jest.fn(() => elementNSMock);
      const createElementSpy = jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMock);
      const createElementNSSpy = jest.spyOn(document, 'createElementNS').mockImplementationOnce(createElementNSMock);

      createTriangle();

      it('should trigger "createElement" with correct argument', () => {
        expect(createElementSpy).toHaveBeenCalledWith(divElement);
      });

      it('should set correct value to "style.cssText"', () => {
        const cssStyle = 'width: 26px; height: 26px; cursor:pointer;';

        expect(elementMock.style.cssText).toBe(cssStyle);
      });

      it('should trigger "createElementNS" of svg with correct argument', () => {
        expect(createElementNSSpy).toHaveBeenCalledWith(namespaceURL, svgAttribute);
      });

      it('should set correct value of svg to "style.cssText"', () => {
        const cssStyle = 'width:100%; height: 100%';

        expect(elementNSMock.style.cssText).toBe(cssStyle);
      });

      it('should trigger "createElementNS" of polygon with correct argument', () => {
        expect(createElementNSSpy).toHaveBeenCalledWith(namespaceURL, polygonAttribute);
      });
    });
  });

  describe('hintOptions', () => {
    const codeMirror = {};

    describe('PageUp', () => {
      it('should trigger "moveFocus" with correct arguments', () => {
        const moveFocusMock = jest.fn();
        const handle = {
          menuSize: jest.fn(() => 5),
          moveFocus: moveFocusMock,
        };
        const expectedArgs = [-4, true];

        hintOptions.customKeys.PageUp(codeMirror, handle);

        expect(moveFocusMock).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('PageDown', () => {
      it('should trigger "moveFocus" with correct arguments', () => {
        const moveFocusMock = jest.fn();
        const handle = {
          menuSize: jest.fn(() => 5),
          moveFocus: moveFocusMock,
        };
        const expectedArgs = [4, true];

        hintOptions.customKeys.PageDown(codeMirror, handle);

        expect(moveFocusMock).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('Home', () => {
      it('should trigger "setFocus" with correct argument', () => {
        const setFocus = jest.fn();
        const handle = {
          setFocus,
        };
        const expectedArg = 0;

        hintOptions.customKeys.Home(codeMirror, handle);

        expect(setFocus).toHaveBeenCalledWith(expectedArg);
      });
    });

    describe('End', () => {
      it('should trigger "setFocus" with correct argument', () => {
        const setFocus = jest.fn();
        const handle = {
          length: 2,
          setFocus,
        };
        const expectedArg = 1;

        hintOptions.customKeys.End(codeMirror, handle);

        expect(setFocus).toHaveBeenCalledWith(expectedArg);
      });
    });
  });

  describe('component', () => {
    const createRefMock = {
      current: {
        editor: {
          on: jest.fn(),
          refresh: jest.fn(),
          eachLine: jest.fn(cb => {
            cb({ text: ' #' });
          }),
          getLineNumber: jest.fn(),
          lastLine: jest.fn(),
          markText: jest.fn(() => ({
            clear: jest.fn(),
          })),
          display: {
            input: {
              textarea: {
                ariaLabel: '',
              },
            },
          },
          state: {
            stateFocused: true,
          },
          doc: {
            addLineWidget: jest.fn(() => ({
              clear: jest.fn(),
            })),
          },
        },
      },
    };
    const completionLists = {};
    const typeMapping = {};
    const policyMapping = {};
    const code = 'code';
    const initialProps = {
      completionLists,
      typeMapping,
      policyMapping,
      code,
      filter: '',
      showAssist: true,
      stripes: {
        user: {
          perms: {
            'ui-circulation.settings.edit-circulation-rules': true
          }
        }
      },
    };
    const rulesHintArgs = {
      ...initialProps,
      intl: {
        formatMessage: expect.any(Function),
        locale: 'en',
      },
    };

    jest.spyOn(React, 'createRef').mockReturnValue(createRefMock);

    describe('initial render', () => {
      render(
        <RulesEditor
          {...initialProps}
        />
      );

      it('should render "CodeMirror" with correct props', () => {
        const codeMirrorOptions = {
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 4,
          indentUnit: 4,
          smartIndent: true,
          indentWithTabs: true,
          tabindex: 0,
          rtlMoveVisually: true,
          mode: {
            name: 'rulesCMM',
            completionLists,
            typeMapping,
            policyMapping,
            keySelector: ['all', 'rare'],
          },
          electricChars: true,
          gutters: ['CodeMirror-linenumbers', 'rules-foldgutter'],
          foldGutter: expect.objectContaining({
            rangeFinder: 'rules',
            gutter: 'rules-foldgutter',
          }),
          readOnly: false,
        };
        const expectedProps = {
          className: codeMirrorFullScreen,
          options: codeMirrorOptions,
          value: initialProps.code,
          onFocus: expect.any(Function),
          onBlur: expect.any(Function),
          onBeforeChange: expect.any(Function),
          onChange: expect.any(Function),
        };

        expect(CodeMirror).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      });

      it('should trigger "rulesHint" with correct arguments', () => {
        expect(rulesHint).toHaveBeenCalledWith(Codemirror, rulesHintArgs);
      });

      it('should trigger "initSubMenuDataFetching" with correct arguments', () => {
        expect(initSubMenuDataFetching).toHaveBeenCalledWith(Codemirror, rulesHintArgs);
      });

      it('should trigger "cm.on" with correct arguments at the first time', () => {
        const expectedArgs = ['cursorActivity', expect.any(Function)];

        expect(createRefMock.current.editor.on).toHaveBeenNthCalledWith(1, ...expectedArgs);
      });

      it('should trigger "cm.on" with correct arguments at second time', () => {
        const expectedArgs = ['endCompletion', expect.any(Function)];

        expect(createRefMock.current.editor.on).toHaveBeenNthCalledWith(2, ...expectedArgs);
      });
    });

    describe('updating', () => {
      cleanup();
      const wrapper = render(
        <RulesEditor
          {...initialProps}
        />
      );

      describe('when new "errors" prop', () => {
        const line = 2;
        const props = {
          ...initialProps,
          errors: [{
            line,
            message: 'message',
          }],
        };
        wrapper.rerender(
          <RulesEditor
            {...props}
          />
        );

        it('should trigger "cm.doc.addLineWidget" with correct arguments', () => {
          const expectedArgs = [
            line - 1,
            expect.any(HTMLDivElement),
            {
              coverGutter: true,
              noHScroll: true,
            }
          ];

          expect(createRefMock.current.editor.doc.addLineWidget).toHaveBeenCalledWith(...expectedArgs);
        });
      });

      describe('when new "filter" prop', () => {
        const props = {
          ...initialProps,
          filter: 'filter',
        };
        wrapper.rerender(
          <RulesEditor
            {...props}
          />
        );

        it('should trigger "cm.eachLine"', () => {
          expect(createRefMock.current.editor.eachLine).toHaveBeenCalled();
        });
      });

      describe('when new "code" prop', () => {
        const props = {
          ...initialProps,
          code: 'test',
        };
        wrapper.rerender(
          <RulesEditor
            {...props}
          />
        );

        it('should render "CodeMirror" with correct "value" prop', () => {
          const expectedProps = {
            value: props.code,
          };

          expect(CodeMirror).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
        });
      });

      describe('when new "typeMapping", "policyMapping" and "completionLists" props', () => {
        const test = 'test';
        const props = {
          ...initialProps,
          typeMapping: {
            test,
          },
          policyMapping: {
            test,
          },
          completionLists: {
            test,
          },
        };
        wrapper.rerender(
          <RulesEditor
            {...props}
          />
        );

        it('should render "CodeMirror" with correct "options" prop', () => {
          const codeMirrorOptions = {
            name: 'rulesCMM',
            completionLists: {
              test,
            },
            typeMapping: {
              test,
            },
            policyMapping: {
              test,
            },
            keySelector: ['all', 'rare'],
          };
          const expectedProps = {
            options: codeMirrorOptions,
          };

          expect(CodeMirror).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
        });
      });
    });

    describe('user interaction', () => {
      beforeEach(() => {
        cleanup();
      });

      it('should trigger "Codemirror.showHint"', () => {
        render(
          <RulesEditor
            {...initialProps}
          />
        );
        fireEvent.focus(screen.getByTestId(codeMirrorArea));

        expect(Codemirror.showHint).toHaveBeenCalled();
      });

      it('should not trigger "Codemirror.showHint"', () => {
        Codemirror.showHint.mockClear();
        jest.spyOn(React, 'createRef').mockReturnValue({
          current: {
            editor: {
              ...createRefMock.current.editor,
              state: {
                focused: true,
                completionActive: {},
              },
            },
          },
        });

        render(
          <RulesEditor
            {...initialProps}
          />
        );
        fireEvent.focus(screen.getByTestId(codeMirrorArea));

        expect(Codemirror.showHint).not.toHaveBeenCalled();
      });

      it('should trigger "widget.close"', () => {
        const close = jest.fn();

        jest.spyOn(React, 'createRef').mockReturnValue({
          current: {
            editor: {
              ...createRefMock.current.editor,
              state: {
                focused: false,
                completionActive: {
                  widget: {
                    close,
                  },
                },
              },
            },
          },
        });

        render(
          <RulesEditor
            {...initialProps}
          />
        );
        fireEvent.blur(screen.getByTestId(codeMirrorArea));

        expect(close).toHaveBeenCalled();
      });

      it('should not trigger "widget.close"', () => {
        const close = jest.fn();

        jest.spyOn(React, 'createRef').mockReturnValue({
          current: {
            editor: {
              ...createRefMock.current.editor,
              state: {
                focused: true,
                completionActive: {
                  widget: {
                    close,
                  },
                },
              },
            },
          },
        });

        render(
          <RulesEditor
            {...initialProps}
          />
        );
        fireEvent.blur(screen.getByTestId(codeMirrorArea));

        expect(close).not.toHaveBeenCalled();
      });

      it('should trigger "onChange" prop', () => {
        const onChange = jest.fn();
        const event = {
          target: {
            value: 'test',
          },
        };

        render(
          <RulesEditor
            {...initialProps}
            onChange={onChange}
          />
        );
        fireEvent.change(screen.getByTestId(codeMirrorArea), event);

        expect(onChange).toHaveBeenCalled();
      });
    });

    describe('when user has view only permission for circulation rules', () => {
      const props = {
        ...initialProps,
        stripes: {
          user: {
            perms: {
              'ui-circulation.settings.view-circulation-rules': true
            }
          },
        }
      };
      render(
        <RulesEditor
          {...props}
        />
      );

      it('should render "CodeMirror" with correct props', () => {
        const codeMirrorOptions = {
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 4,
          indentUnit: 4,
          smartIndent: true,
          indentWithTabs: true,
          tabindex: 0,
          rtlMoveVisually: true,
          mode: {
            name: 'rulesCMM',
            completionLists,
            typeMapping,
            policyMapping,
            keySelector: ['all', 'rare'],
          },
          electricChars: true,
          gutters: ['CodeMirror-linenumbers', 'rules-foldgutter'],
          foldGutter: expect.objectContaining({
            rangeFinder: 'rules',
            gutter: 'rules-foldgutter',
          }),
          readOnly: 'nocursor',
        };
        const expectedProps = {
          className: codeMirrorFullScreen,
          options: codeMirrorOptions,
          value: initialProps.code,
          onFocus: expect.any(Function),
          onBlur: expect.any(Function),
          onBeforeChange: expect.any(Function),
          onChange: expect.any(Function),
        };

        expect(CodeMirror).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      });

      describe('user interaction', () => {
        beforeEach(() => {
          cleanup();
        });

        it('should trigger "Codemirror.showHint"', () => {
          render(
            <RulesEditor
              {...props}
            />
          );
          fireEvent.focus(screen.getByTestId(codeMirrorArea));

          expect(Codemirror.showHint).not.toHaveBeenCalled();
        });
      });
    });
  });
});
