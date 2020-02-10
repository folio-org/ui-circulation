import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import Period from '../../Period';

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
  itemLimit = new TextFieldInteractor('[data-test-loans-section-item-limit]');
}

export default LoansSection;
