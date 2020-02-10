import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

@interactor class RequestManagementSection {
  static defaultScope = ('[data-test-loan-policy-detail-request-management-section]');

  header = scoped('[data-test-request-management-section-header]');

  recallReturnInterval = new KeyValue('[data-test-request-management-section-recall-return-interval] div');
  minimumGuaranteedLoanPeriod= new KeyValue('[data-test-request-management-section-minimum-guaranteed-loan-period] div');
  renewItemsWithRequest= new KeyValue('[data-test-request-management-section-renew-items-with-request] div');
  alternateRenewalLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-renewal-loan-period] div');
  alternateCheckoutLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-checkout-loan-period] div');
}

export default RequestManagementSection;
