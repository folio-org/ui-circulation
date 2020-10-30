import {
  interactor,
  scoped,
  collection,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import RadioButtonInteractor from '@folio/stripes-components/lib/RadioButton/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

@interactor class ClosingTypeSelector {
  selectRadio(value) {
    return this.click(`input[type="radio"][value="${value}"]`);
  }

  duration = scoped('[data-test-period-duration]', TextFieldInteractor);
  interval = scoped('[data-test-period-interval]', SelectInteractor);
  intervalSelector = scoped('[data-test-period-interval] select');
  closingTypes = collection('[data-test-closed-loans-feefine]', RadioButtonInteractor);
}

export default ClosingTypeSelector;
