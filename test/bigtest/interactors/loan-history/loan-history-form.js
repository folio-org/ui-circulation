import {
  interactor,
  scoped,
  isPresent,
  clickable,
  property,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class ClosingTypeSelector {
  selectRadio(value) {
    return this.click(`input[type="radio"][value="${value}"]`);
  }

  duration = scoped('[data-test-period-duration]', TextFieldInteractor);
  interval = scoped('[data-test-period-interval]', SelectInteractor);
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
  loan = new ClosingTypeSelector('[data-test-closed-loans]');
  feeFine = new ClosingTypeSelector('[data-test-closed-loans-feefine]');
}

export default new LoanHistoryForm();
