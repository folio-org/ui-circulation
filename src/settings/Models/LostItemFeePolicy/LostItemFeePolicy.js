import {
  get,
} from 'lodash';

import { LostItem, Metadata, ChargeAmount } from '../common';

export default class LostItemFeePolicy {
  static defaultLostItemFeePolicy() {
    return {
      chargeAmountItem: { chargeType: 'actualCost' },
      lostItemProcessingFee: 0.00,
      chargeAmountItemPatron: true,
      chargeAmountItemSystem: true,
      returnedLostItemProcessingFee: true,
      replacedLostItemProcessingFee: true,
      replacementProcessingFee: 0.00,
      replacementAllowed: true,
      lostItemReturned: 'Charge',
    };
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.itemAgedLostOverdue = new LostItem(policy.itemAgedLostOverdue);
    this.patronBilledAfterAgedLost = new LostItem(policy.patronBilledAfterAgedLost);
    this.chargeAmountItem = new ChargeAmount(policy.chargeAmountItem);
    this.lostItemProcessingFee = policy.lostItemProcessingFee;
    this.chargeAmountItemPatron = policy.chargeAmountItemPatron;
    this.chargeAmountItemSystem = policy.chargeAmountItemSystem;
    this.lostItemChargeFeeFine = new LostItem(policy.lostItemChargeFeeFine);
    this.returnedLostItemProcessingFee = policy.returnedLostItemProcessingFee;
    this.replacedLostItemProcessingFee = policy.replacedLostItemProcessingFee;
    this.replacementProcessingFee = policy.replacementProcessingFee;
    this.replacementAllowed = policy.replacementAllowed;
    this.lostItemReturned = policy.lostItemReturned;
    this.feesFinesShallRefunded = new LostItem(policy.feesFinesShallRefunded);
    this.metadata = new Metadata(policy.metadata);
  }

  hasValue(pathToValue) {
    const value = get(this, pathToValue);
    return value < 0;
  }

  hasDuration(pathToValue) {
    const value = get(this, pathToValue);
    return value > 0;
  }

  isRquiredLostItemCharge() {
    const value = get(this, 'lostItemChargeFeeFine.duration');
    const chargeType = get(this, 'chargeAmountItem.chargeType');
    const chargeAmount = get(this, 'chargeAmountItem.amount');
    const processingFee = get(this, 'lostItemProcessingFee');
    const lostByPatron = get(this, 'chargeAmountItemPatron');
    const lostBySystem = get(this, 'chargeAmountItemSystem');

    return (value < 0) || !((chargeAmount > 0 && chargeType === 'anotherCost') || (processingFee > 0 && lostByPatron !== 'false' && lostBySystem !== 'false'));
  }
}
