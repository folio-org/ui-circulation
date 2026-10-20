import { Period } from '../common';
import {
  ATTEMPT_ON_DUE_DATE,
  ATTEMPT_DAYS_BEFORE,
} from '../../../constants';

export default class RenewalsPolicy {
  constructor(policy = {}) {
    this.unlimited = policy.unlimited || false;
    this.numberAllowed = policy.numberAllowed;
    this.period = new Period(policy.period);
    this.renewFromId = policy.renewFromId;
    this.differentPeriod = policy.differentPeriod || false;
    this.alternateFixedDueDateScheduleId = policy.alternateFixedDueDateScheduleId;
    this.automaticRenewal = policy.automaticRenewal || false;
    this.automaticRenewalRetryPeriodInDays = policy.automaticRenewalRetryPeriodInDays;

    const backendDays = policy.firstAutomaticRenewalAttemptDaysBeforeDueDate;
    if (backendDays !== undefined && backendDays !== null) {
      if (backendDays === 0) {
        this.attemptFirstRenewal = ATTEMPT_ON_DUE_DATE;
        this.daysBefore = undefined;
      } else {
        this.attemptFirstRenewal = ATTEMPT_DAYS_BEFORE;
        this.daysBefore = backendDays;
      }
    } else {
      this.attemptFirstRenewal = policy.attemptFirstRenewal || ATTEMPT_ON_DUE_DATE;
      this.daysBefore = policy.daysBefore;
    }
  }
}
