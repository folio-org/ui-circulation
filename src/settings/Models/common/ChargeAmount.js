export default class ChargeAmount {
  constructor(chargeAmount = {}) {
    this.chargeType = chargeAmount.chargeType;
    this.amount = chargeAmount.amount;
  }
}
