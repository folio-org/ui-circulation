import {
  interactor,
  isPresent,
  action,
  computed,
  text,
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

@interactor class Hints {
   static defaultScope = '.CodeMirror-hints';
   arePresent = isPresent('.loan-rule-hint-minor');
   text = text('.loan-rule-hint-minor');
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

  hints = new Hints();
  value = getEditorValue();
  line0 = getEditorLine(0);
}

@interactor class LoanRules {
  static defaultScope = '[data-test-loan-rules]';
  formPresent = isPresent('[data-test-loan-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  editor = new Editor();
}

export default new LoanRules();
