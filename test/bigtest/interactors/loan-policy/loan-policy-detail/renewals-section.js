import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

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

export default RenewalsSection;
