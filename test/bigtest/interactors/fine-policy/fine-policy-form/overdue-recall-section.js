import { interactor } from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

@interactor class OverdueRecallSection {
  quantity = new TextFieldInteractor('#data-test-quantity-overdue-recall-fine-quantity')
  interval = new SelectInteractor('[data-test-quantity-interval]');
}

export default OverdueRecallSection;
