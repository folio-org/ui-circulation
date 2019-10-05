import {
  interactor,
  scoped,
  isPresent,
  clickable,
  property,
  collection,
  count,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import RadioButtonInteractor from '@folio/stripes-components/lib/RadioButton/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class ClosingTypeSelector {
  selectRadio(value) {
    return this.click(`input[type="radio"][value="${value}"]`);
  }

  duration = scoped('[data-test-period-duration]', TextFieldInteractor);
  interval = scoped('[data-test-period-interval]', SelectInteractor);
  closingTypes = collection('label', RadioButtonInteractor);
}

@interactor class ExceptionSection {
  cardsCount = count('[data-test-exception-card]');
  paymentMethods = collection('[data-test-payment-method-selector]', SelectInteractor);
}

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
