import {
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';
import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import KeyValue from '../KeyValue';

@interactor class AboutSection {
  static defaultScope = ('[data-test-fine-policy-detail-about-section]');

  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

@interactor class LostItemFeeSection {
  static defaultScope = ('[data-test-lost-item-policy-detail-fee-section]');

  itemAged = new KeyValue('[data-test-item-aged] div');
  patronBilled = new KeyValue('[data-test-patron-billed] div');
  chargeAmount = new KeyValue('[data-test-charge-amount] div');
  lostItemFee = new KeyValue('[data-test-lost-item-fee] div');
  lostByPatron = new KeyValue('[data-test-lost-by-patron] div');
  lostBySystem = new KeyValue('[data-test-lost-by-system] div');
  closeLoanAfter = new KeyValue('[data-test-close-loan-after] div');
  itemReturned = new KeyValue('[data-test-returned-lost-item] div');
  itemReplaced = new KeyValue('[data-test-replaced-lost-item] div');
  replacementFee = new KeyValue('[data-test-replacement-fee] div');
  replacementAllowed = new KeyValue('[data-test-replacement-allowed] div');
  lostItemReturned = new KeyValue('[data-test-if-lost-item-returned] div');
  returnedMoreThan = new KeyValue('[data-test-returned-more-than] div');
}


@interactor class LostItemFeePolicyDetail {
  static defaultScope = ('[data-test-lost-item-fee-policy-detail]');

  aboutSection = new AboutSection();
  lostItemSection = new LostItemFeeSection();
  deleteLostItemFeePolicy = new Interactor('#dropdown-clickable-delete-item');

  lostItemDetails = new AccordionInteractor('#lostItemFeeSectionOpen');
  content = scoped('[class^="content-"]');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new LostItemFeePolicyDetail();
