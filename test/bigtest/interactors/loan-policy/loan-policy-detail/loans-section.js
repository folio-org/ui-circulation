import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

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

export default LoansSection;
