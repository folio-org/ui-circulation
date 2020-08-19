import {
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import AboutSection from './about-section';
import LostItemFeeSection from './lost-item-fee-section';

@interactor class LostItemFeePolicyDetail {
  static defaultScope = ('[data-test-lost-item-fee-policy-detail]');

  aboutSection = new AboutSection();
  lostItemSection = new LostItemFeeSection();
  deleteLostItemFeePolicy = new Interactor('#dropdown-clickable-delete-item');

  lostItemDetails = new AccordionInteractor('#viewLostItemFeeSection');
  content = scoped('[class^="content-"]');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new LostItemFeePolicyDetail();
