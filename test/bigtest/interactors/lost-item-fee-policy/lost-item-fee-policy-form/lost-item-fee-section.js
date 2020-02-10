import { interactor } from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import RadioButtonInteractor from '@folio/stripes-components/lib/RadioButton/tests/interactor';

import Period from '../../Period';

@interactor class LostItemFeeSection {
  static defaultScope = ('[data-test-lost-item-fee-policy-form-section]');

  itemsAged = new Period('[data-test-item-aged-lost]');
  patronBilled = new Period('[data-test-patron-billed]');
  chargeAmountActual = new RadioButtonInteractor('[data-test-charge-type-actual]');
  chargeAmountAnother = new RadioButtonInteractor('[data-test-charge-type-another]');
  chargeAmount = new TextFieldInteractor('[data-test-charge-amount]');
  lostItemFee = new TextFieldInteractor('[data-test-lost-item-processing-fee]');
  lostByPatron = new SelectInteractor('[data-test-item-patron]');
  lostBySystem = new SelectInteractor('[data-test-item-system]');
  closeLoanAfter = new Period('[data-test-lost-item-charge-fee]');
  itemReturned = new SelectInteractor('[data-test-returned-lost-item]');
  itemReplaced = new SelectInteractor('[data-test-replaced-lost-item]');
  replacementFee = new TextFieldInteractor('[data-test-replacement-processing-fee]');
  replacementAllowed = new SelectInteractor('[data-test-replacement-allowed]');
  lostItemReturnedCharge = new RadioButtonInteractor('[data-test-lost-item-returned-charge]');
  lostItemReturnedRemove = new RadioButtonInteractor('[ data-test-lost-item-returned-remove]');
  returnedMoreThan = new Period('[data-test-fees-fines-shall-refunded]');
}

export default LostItemFeeSection;
