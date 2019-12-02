import {
  Interactor,
  interactor,
  action,
  computed,
  triggerable,
} from '@bigtest/interactor';

import HintsMenu from './hints-menu';

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

@interactor class Editor {
  static defaultScope = '.react-codemirror2';

  setValue = action(function (value, overrideOptions) {
    const defaultOptions = { showHint: true, append: false };
    const options = Object.assign(defaultOptions, overrideOptions);

    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const resultValue = options.append ? CodeMirror.doc.getValue() + value : value;

      CodeMirror.doc.setValue(resultValue);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);

      if (options.showHint) {
        CodeMirror.showHint();
      }

      return CodeMirror;
    }).run();
  });

  pickHint = action(function (index = 0) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const {
        widget,
        data,
      } = CodeMirror.state.completionActive;
      widget.sections[widget.currentSectionIndex].selectedHintIndex = index;

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

  pressKey = function (keyCode) {
    return triggerable('textarea', 'keydown', {
      bubbles: true,
      cancelable: true,
      keyCode,
    });
  };

  pressEnter = this.pressKey(13);
  pressTab = this.pressKey(9);
  pressArrowDown = this.pressKey(40);
  pressArrowUp = this.pressKey(38);
  pressBackspace = this.pressKey(8);

  textArea = new Interactor('textarea');
  errorMessage = new Interactor('.rule-error');
  hints = new HintsMenu();
  value = getEditorValue();
  line0 = getEditorLine(0);
}

export default Editor;
