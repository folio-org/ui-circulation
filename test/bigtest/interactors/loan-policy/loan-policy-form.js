import {
  clickable,
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import Period from '../Period';

@interactor class AboutSection {
  static defaultScope = ('[data-test-loan-policy-form-about-section]');

  header = scoped('[data-test-about-section-header]');
  policyName = new TextFieldInteractor('[data-test-about-section-policy-name]');
  policyDescription = new TextFieldInteractor('[data-test-about-section-policy-description]');
  policyNameValue = scoped('#input_policy_name');
}

@interactor class LoansSection {
  static defaultScope = ('[data-test-loan-policy-form-loans-section]');

  header = scoped('[data-test-loans-section-header]');
  loanable = new CheckboxInteractor('[data-test-loans-section-loanable]');
  loanProfile = new SelectInteractor('[data-test-loans-section-loan-profile]');
  loanPeriod = new Period('[data-test-loans-section-loan-period]');
  fixedDueDateScheduleId = new SelectInteractor('[data-test-loans-section-fixed-due-date-schedule-id]');
  closedDueDateMgmt = new SelectInteractor('[data-test-loans-section-closed-due-date-mgmt]');
  openingTimeOffset = new Period('[data-test-loans-section-opening-time-offset]');
  gracePeriod = new Period('[data-test-loans-section-grace-period]');
}

@interactor class RenewalsSection {
  static defaultScope = ('[data-test-loan-policy-form-renewals-section]');

  header = scoped('[data-test-renewals-section-header]');
  renewable = new CheckboxInteractor('[data-test-renewals-section-renewable]');
  unlimitedRenewals = new CheckboxInteractor('[data-test-renewals-section-unlimited-renewals]');
  numRenewalsAllowed = new TextFieldInteractor('[data-test-renewals-section-num-renewals-allowed]');
  renewFrom = new SelectInteractor('[data-test-renewals-section-renew-from]');
  renewalPeriodDifferent = new CheckboxInteractor('[data-test-renewals-section-renewal-period-different]');
  alternateLoanPeriodRenewals = new Period('[data-test-renewals-section-alternate-loan-period-renewals]');
  alternateFixedDueDateSchedule = new SelectInteractor('[data-test-renewals-alternate-fixed-due-date-schedule]');
}

@interactor class RequestManagementSection {
  static defaultScope = ('[data-test-loan-policy-form-request-management-section]');

  header = scoped('[data-test-renewals-request-management-section-header]');
  recallReturnInterval = new Period('[data-test-request-management-section-recall-return-interval]');
  minimumGuaranteedLoanPeriod = new Period('[data-test-request-management-section-minimum-guaranteed-loan-period]');
  alternateCheckoutLoanPeriod = new Period('[data-test-request-management-section-alternate-checkout-loan-period]');
  renewItemsWithRequest = new CheckboxInteractor('[data-test-request-management-section-renew-items-with-request]');
  alternateRenewalLoanPeriod = new Period('[data-test-request-management-section-alternate-renewal-loan-period]');
}

@interactor class LoanPolicyForm {
  static defaultScope = ('[data-test-loan-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.aboutSection.scoped('#input_policy_name').value === policyName);
  }

  aboutSection = new AboutSection();
  loansSection = new LoansSection();
  renewalsSection = new RenewalsSection();
  requestManagementSection = new RequestManagementSection();

  deleteLoanPolicy = new Interactor('#clickable-delete-entry');
  deleteLoanPolicyModal = new Interactor('#delete-item-confirmation');
  deleteLoanPolicyCancel= new Interactor('[data-test-confirmation-modal-cancel-button]');
  deleteLoanPolicyConfirm = new Interactor('[data-test-confirmation-modal-confirm-button]');
  expandAll = scoped('[data-test-expand-all] button');

  save = clickable('#clickable-save-entry');
}

export default new LoanPolicyForm();
