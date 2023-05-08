import {
  get,
} from 'lodash';

import { OverdueFine, Metadata } from '../common';
import { FINE_POLICY_PATH } from '../../../constants/Validation/fine-policy';
import ReminderFee from './ReminderFee';

export default class FinePolicy {
  static defaultFinePolicy() {
    return {
      'countClosed': true,
      'forgiveOverdueFine': true,
      'gracePeriodRecall': true,
      'overdueFine': { quantity: 0, intervalId: '' },
      'maxOverdueFine': 0,
      'maxOverdueRecallFine': 0,
      'overdueRecallFine': { quantity: 0, intervalId: '' },
      'reminderFees': [],
    };
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.overdueFine = new OverdueFine(policy.overdueFine);
    this.countClosed = policy.countClosed;
    this.maxOverdueFine = policy.maxOverdueFine;
    this.forgiveOverdueFine = policy.forgiveOverdueFine;
    this.overdueRecallFine = new OverdueFine(policy.overdueRecallFine);
    this.gracePeriodRecall = policy.gracePeriodRecall;
    this.maxOverdueRecallFine = policy.maxOverdueRecallFine;
    this.metadata = new Metadata(policy.metadata);
    this.reminderFees = policy.reminderFees?.map(fee => new ReminderFee(fee)) ?? [];
  }

  hasValue(pathToValue) {
    const value = get(this, pathToValue);
    return value > 0;
  }

  hasNonZeroValue(pathToValue) {
    const value = get(this, pathToValue);

    return !!parseFloat(value, 10);
  }

  isIntervalSelected = (pathToValue) => {
    return Boolean(get(this, pathToValue));
  };

  isOverdueFine() {
    const value = get(this, FINE_POLICY_PATH.OVERDUE_FINE_QUANTITY);
    return value > 0;
  }

  isOverdueRecallFine() {
    const value = get(this, FINE_POLICY_PATH.OVERDUE_RECALL_FINE_QUANTITY);
    return value > 0;
  }
}
