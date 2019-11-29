import {
  interactor,
  isPresent,
  clickable,
  property,
  Interactor,
  fillable,
} from '@bigtest/interactor';

import Editor from './editor';

@interactor class CirculationRulesPane {
  static defaultScope = '[data-test-circulation-rules]';

  formPresent = isPresent('[data-test-circulation-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  clickSaveRulesBtn = clickable('#clickable-save-loan-rules');
  filterInputField = new Interactor('[data-test-rules-filter]');
  isSaveButtonDisabled = property('#clickable-save-loan-rules', 'disabled');
  editor = new Editor();
  filter = fillable('[data-test-rules-filter]');
}

export default new CirculationRulesPane();
