import {
  interactor,
  isPresent,
  action,
  computed
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

@interactor class Editor {
  static defaultScope = '.react-codemirror2';

  setValue = action(function (value) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      CodeMirror.doc.setValue(value);
      CodeMirror.showHint();
      return CodeMirror;
    }).run();
  });

  value = getEditorValue();
  line0 = getEditorLine(0);
}

@interactor class LoanRules {
  static defaultScope = '[data-test-loan-rules]';

  isLoaded = isPresent('.CodeMirror-scroll');
  formPresent = isPresent('[data-test-loan-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  editor = new Editor();

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}

export default new LoanRules();
