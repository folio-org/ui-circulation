import {
  get,
} from 'lodash';

import { OverdueFine, Metadata } from '../common';

export default class FinePolicy {
  static defaultFinePolicy() {
    return {
      'countClosed': true,
      'forgiveOverdueFine': true,
      'gracePeriodRecall': true,
      'overdueFine': { quantity: 0, intervalId: '' },
      'maxOverdueFine': 0,
      'maxOverdueRecallFine': 0,
      'overdueRecallFine': { quantity: 0, intervalId: '' }
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
  }

  hasValue(pathToValue) {
    const value = get(this, pathToValue);
    return value > 0;
  }

  isIntervalSelected = (pathToValue) => {
    return Boolean(get(this, pathToValue));
  };

  isOverdueFine() {
    const value = get(this, 'overdueFine.quantity');
    return value > 0;
  }

  isOverdueRecallFine() {
    const value = get(this, 'overdueRecallFine.quantity');
    return value > 0;
  }
}
