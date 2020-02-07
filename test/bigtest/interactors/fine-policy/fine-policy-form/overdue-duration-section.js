import { interactor } from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

@interactor class OverdueDurationSection {
  quantity = new TextFieldInteractor('#data-test-quantity-overdue-fine-quantity')
  interval = new SelectInteractor('[data-test-quantity-interval]');
}

export default OverdueDurationSection;
