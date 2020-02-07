import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';

import Period from '../../Period';

@interactor class RequestManagementSection {
  static defaultScope = ('[data-test-loan-policy-form-request-management-section]');

  header = scoped('[data-test-renewals-request-management-section-header]');
  recallReturnInterval = new Period('[data-test-request-management-section-recall-return-interval]');
  minimumGuaranteedLoanPeriod = new Period('[data-test-request-management-section-minimum-guaranteed-loan-period]');
  alternateCheckoutLoanPeriod = new Period('[data-test-request-management-section-alternate-checkout-loan-period]');
  renewItemsWithRequest = new CheckboxInteractor('[data-test-request-management-section-renew-items-with-request]');
  alternateRenewalLoanPeriod = new Period('[data-test-request-management-section-alternate-renewal-loan-period]');
}

export default RequestManagementSection;
