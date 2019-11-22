import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';
import KeyValue from '../KeyValue';


@interactor class AboutSection {
  static defaultScope = ('[data-test-loan-policy-detail-about-section]');

  header = scoped('[data-test-about-section-header]');
  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

@interactor class LoansSection {
  static defaultScope = ('[data-test-loan-policy-detail-loans-section]');

  header = scoped('[data-test-loans-section-header]');
  loanPeriod = new KeyValue('[data-test-loans-section-loan-period] div');
  loanProfile = new KeyValue('[data-test-loans-section-loan-profile] div');
  gracePeriod = new KeyValue('[data-test-loans-section-grace-period] div');
  itemLimit = new KeyValue('[data-test-loans-section-item-limit] div');
  dueDateSchedule = new KeyValue('[data-test-loans-section-due-date-schedule] div');
  closedDueDateMgmt = new KeyValue('[data-test-loans-section-closed-due-date-mgmte] div');
  openingTimeOffset = new KeyValue('[data-test-loans-section-opening-time-offset] div');
}

@interactor class RenewalsSection {
  static defaultScope = ('[data-test-loan-policy-detail-renewals-section]');

  header = scoped('[data-test-renewals-section-header]');
  renewFrom = new KeyValue('[data-test-renewals-section-renew-from] div');
  unlimitedRenewals = new KeyValue('[data-test-renewals-section-unlimited-renewals] div');
  numRenewalsAllowed = new KeyValue('[data-test-renewals-section-number-renewals-allowed] div');
  renewalPeriodDifferent = new KeyValue('[data-test-renewals-section-renewal-period-different] div');
  alternateLoanPeriodRenewals = new KeyValue('[data-test-renewals-section-alternate-loan-period-renewals] div');
  alternateFixedDueDateScheduleId = new KeyValue('[data-test-renewals-section-alternate-fixed-due-date-schedule-id] div');
}

@interactor class RequestManagementSection {
  static defaultScope = ('[data-test-loan-policy-detail-request-management-section]');

  header = scoped('[data-test-request-management-section-header]');
  // recalls
  recallReturnInterval = new KeyValue('[data-test-request-management-section-recall-return-interval] div');
  minimumGuaranteedLoanPeriod= new KeyValue('[data-test-request-management-section-minimum-guaranteed-loan-period] div');
  // holds
  renewItemsWithRequest= new KeyValue('[data-test-request-management-section-renew-items-with-request] div');
  alternateRenewalLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-renewal-loan-period] div');
  alternateCheckoutLoanPeriod= new KeyValue('[data-test-request-management-section-alternate-checkout-loan-period] div');
}

@interactor class LoanPolicyDetail {
  static defaultScope = ('[data-test-loan-policy-detail]');

  aboutSection = new AboutSection();
  loansSection = new LoansSection();
  renewalsSection = new RenewalsSection();
  requestManagement = new RequestManagementSection();

  generalInformationAccordion = new AccordionInteractor('#generalInformation');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new LoanPolicyDetail();
