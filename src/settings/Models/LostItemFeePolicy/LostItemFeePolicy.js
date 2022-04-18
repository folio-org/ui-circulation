import {
  get,
  isNumber,
  isUndefined,
} from 'lodash';

import { LostItem, Metadata, ChargeAmount } from '../common';

export default class LostItemFeePolicy {
  static defaultLostItemFeePolicy() {
    return {
      chargeAmountItem: { chargeType: 'anotherCost' },
      lostItemProcessingFee: 0.00,
      chargeAmountItemPatron: false,
      chargeAmountItemSystem: false,
      returnedLostItemProcessingFee: false,
      replacedLostItemProcessingFee: false,
      replacementProcessingFee: 0.00,
      replacementAllowed: false,
      lostItemReturned: 'Charge',
    };
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.itemAgedLostOverdue = new LostItem(policy.itemAgedLostOverdue);
    this.patronBilledAfterAgedLost = new LostItem(policy.patronBilledAfterAgedLost);
    this.recalledItemAgedLostOverdue = new LostItem(policy.recalledItemAgedLostOverdue);
    this.patronBilledAfterRecalledItemAgedLost = new LostItem(policy.patronBilledAfterRecalledItemAgedLost);
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

    return isNumber(value);
  }

  hasNonZeroValue(pathToValue) {
    const value = get(this, pathToValue);

    return !!parseFloat(value, 10);
  }

  hasInterval(pathToValue) {
    const value = get(this, pathToValue);

    return !isUndefined(value);
  }

  hasPassedValue(pathToValue, expectedValue) {
    const value = get(this, pathToValue);

    return value === expectedValue;
  }

  hasPositiveValue(pathToValue) {
    const value = get(this, pathToValue);

    return parseInt(value, 10) > 0;
  }

  isRquiredLostItemCharge() {
    const chargeType = get(this, 'chargeAmountItem.chargeType');
    const chargeAmount = get(this, 'chargeAmountItem.amount');
    const lostByPatron = get(this, 'chargeAmountItemPatron');
    const lostBySystem = get(this, 'chargeAmountItemSystem');

    return (chargeType === 'actualCost' || (chargeType === 'anotherCost' && chargeAmount === '0.00')) && (!lostByPatron || !lostBySystem);
  }
}
