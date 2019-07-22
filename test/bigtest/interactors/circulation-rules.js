import {
  interactor,
  isPresent,
  action,
  computed,
  text,
  clickable,
  property,
  Interactor,
} from '@bigtest/interactor';

function getEditorValue() {
  return computed(function () {
    const editor = this.$('.CodeMirror').CodeMirror;
    return editor.doc.getValue();
  });
}

function getEditorLine(lineNo = 0) {
  return computed(function () {
    const editor = this.$('.CodeMirror').CodeMirror;
    return editor.doc.getValue(lineNo);
  });
}

function hasClass(selector, className) {
  return computed(function () {
    return this.$(selector).className.includes(className);
  });
}

@interactor class Hints {
  static defaultScope = '.CodeMirror-hints';

  arePresent = isPresent('.rule-hint-minor');
  text = text('.rule-hint-minor');
  header = new Interactor('.CodeMirror-hints-header');
  subheader = new Interactor('.CodeMirror-hints-subheader');
  isActiveItemPresent = isPresent('.CodeMirror-hint-active');
  isFirstItemActive = hasClass('.rule-hint-minor:first-child', 'CodeMirror-hint-active');
  isLastItemActive = hasClass('.rule-hint-minor:last-child', 'CodeMirror-hint-active');

  triggerItemEvent = function (event, options) {
    return action(function (itemIndex) {
      return this.find(`.rule-hint-minor:nth-child(${itemIndex})`)
        .do(($node) => {
          const defaultOptions = {
            ancelable: true,
            bubbles: true
          };

          $node.dispatchEvent(new Event(event, { ...defaultOptions, ...options }));
        });
    });
  }

  clickOnItem = this.triggerItemEvent('click');
  doubleClickOnItem = this.triggerItemEvent('dblclick');
}

@interactor class Editor {
  static defaultScope = '.react-codemirror2';

  setValue = action(function (value) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      CodeMirror.doc.setValue(value);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);
      CodeMirror.showHint();

      return CodeMirror;
    }).run();
  });

  pickHint = action(function (index = 0) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const ca = CodeMirror.state.completionActive;
      const { widget, data } = ca;
      widget.selectedHint = index;
      widget.pick(data, index);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);
      CodeMirror.showHint();
      return CodeMirror;
    }).run();
  });

  changeActiveItem = action(function (index = 0, avoidWrap = false) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const completionActive = CodeMirror.state.completionActive;

      if (completionActive && completionActive.widget) {
        completionActive.widget.changeActive(index, avoidWrap);
      }

      return CodeMirror;
    }).run();
  });

  hints = new Hints();
  value = getEditorValue();
  line0 = getEditorLine(0);
}

@interactor class CirculationRules {
  static defaultScope = '[data-test-circulation-rules]';

  formPresent = isPresent('[data-test-circulation-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  clickSaveRulesBtn = clickable('#clickable-save-loan-rules');
  isSaveButtonDisabled = property('#clickable-save-loan-rules', 'disabled');
  editor = new Editor();
}

export default new CirculationRules();
