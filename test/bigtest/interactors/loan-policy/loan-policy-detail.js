import {
  interactor,
  scoped,
} from '@bigtest/interactor';

@interactor class KeyValue {
  label = scoped('div');
  value = scoped('div:nth-child(2)');
}

@interactor class AboutSection {
  static defaultScope = ('[data-test-loan-policy-detail-about-section]');

  header = scoped('[data-test-about-section-header]');
  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

@interactor class LoansSection {
  static defaultScope = ('[data-test-loan-policy-detail-loans-section]');

  header = scoped('[data-test-loans-section-header]');
  loanProfile = new KeyValue('[data-test-loans-section-loan-profile] div');
  loanPeriod = new KeyValue('[data-test-loans-section-loan-period] div');
  dueDateSchedule = new KeyValue('[data-test-loans-section-due-date-schedule] div');
  closedDueDateMgmt = new KeyValue('[data-test-loans-section-closed-due-date-mgmte] div');
  openingTimeOffset = new KeyValue('[data-test-loans-section-opening-time-offset] div');
  gracePeriod = new KeyValue('[data-test-loans-section-grace-period] div');
}

@interactor class RenewalsSection {
  static defaultScope = ('[data-test-loan-policy-detail-renewals-section]');

  header = scoped('[data-test-renewals-section-header]');
  unlimitedRenewals = new KeyValue('[data-test-renewals-section-unlimited-renewals] div');
  numRenewalsAllowed = new KeyValue('[data-test-renewals-section-number-renewals-allowed] div');
  renewFrom = new KeyValue('[data-test-renewals-section-renew-from] div');
  renewalPeriodDifferent = new KeyValue('[data-test-renewals-section-renewal-period-different] div');
  alternateLoanPeriodRenewals = new KeyValue('[data-test-renewals-section-alternate-loan-period-renewals] div');
}

@interactor class RequestManagementSection {
  static defaultScope = ('[data-test-loan-policy-detail-request-management-section]');

  header = scoped('[data-test-request-management-section-header]');
  // recalls
  recallReturnInterval = new KeyValue('[data-test-request-management-section-recall-return-interval] div');
  minimumGuaranteedLoanPeriod= new KeyValue('[data-test-request-management-section-minimum-guaranteed-loan-period] div');
  // holds
  alternateCheckoutLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-checkout-loan-period] div');
  renewItemsWithRequest= new KeyValue('[data-test-request-management-section-renew-items-with-request] div');
  alternateRenewalLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-renewal-loan-period] div');
}

@interactor class LoanPolicyDetail {
  aboutSection = new AboutSection();
  loansSection = new LoansSection();
  renewalsSection = new RenewalsSection();
  requestManagement = new RequestManagementSection();
}

export default new LoanPolicyDetail('[data-test-loan-policy-detail]');
