import {
  interactor,
  collection,
  count,
} from '@bigtest/interactor';

import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

@interactor class ExceptionSection {
  cardsCount = count('[data-test-exception-card]');
  paymentMethods = collection('[data-test-payment-method-selector]', SelectInteractor);
}

export default ExceptionSection;
