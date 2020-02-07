import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import Period from '../../Period';

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

export default RenewalsSection;
