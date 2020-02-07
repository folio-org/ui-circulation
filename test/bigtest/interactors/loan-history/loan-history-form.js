import {
  interactor,
  scoped,
  isPresent,
  clickable,
  property,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

import ClosingTypeSelector from './closing-type-selector';
import ExceptionSection from './exception-section';

@interactor class LoanHistoryForm {
  isLoaded = isPresent('#treatEnabled-checkbox');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  feefineSection = scoped('[data-test-closed-loans-feefine]');
  clickTreatEnabledCheckbox = clickable('#treatEnabled-checkbox');
  callout = new CalloutInteractor();
  saveButton = new ButtonInteractor('[data-test-loan-history-save-button]');
  disabledSaveButton = property('[data-test-loan-history-save-button]', 'disabled');
  addExceptionButton = new ButtonInteractor('[data-test-add-exception-button]');
  removeExceptionIcon = new ButtonInteractor('[data-test-remove-exception-icon]');
  loan = new ClosingTypeSelector('[data-test-closed-loans]');
  feeFine = new ClosingTypeSelector('[data-test-closed-loans-feefine]');
  loanException = new ClosingTypeSelector('[data-test-exception-card]');
  loanExceptionSection = new ExceptionSection('[data-test-exception-list]');
}

export default new LoanHistoryForm();
