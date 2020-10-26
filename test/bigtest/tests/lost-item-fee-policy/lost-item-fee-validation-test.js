import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LostItemFeePolicyForm from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-form';

import translation from '../../../../translations/ui-circulation/en';

describe('Validation of Lost Item Fee Policy Form', () => {
  setupApplication({ scenarios: ['testLostItemFeePolicy'] });

  describe('create new policy', () => {
    const newLostItemPolicyName = 'new policy';

    beforeEach(function () {
      this.visit('/settings/circulation/lost-item-fee-policy?layer=add');
    });

    describe('lost item processing fee', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.itemsAged.fillAndBlurDuration(5)
          .lostItemFeeSection.itemsAged.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.patronBilled.fillAndBlurDuration(5)
          .lostItemFeeSection.patronBilled.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.chargeAmountAnother.clickAndBlur()
          .lostItemFeeSection.lostItemFee.fillAndBlur(1)
          .save();
      });

      it('shows validation error', () => {
        expect(LostItemFeePolicyForm.validationError(1).isPresent).to.be.true;
        expect(LostItemFeePolicyForm.validationError(1).text).to.equal(translation['settings.lostItemFee.validate.hasNoChargeLostItemProcessingFee']);
      });
    });

    describe('lost item processing fee value is present', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.chargeAmountAnother.clickAndBlur()
          .lostItemFeeSection.lostByPatron.selectAndBlur('Yes')
          .save();
      });

      it('shows validation error', () => {
        expect(LostItemFeePolicyForm.validationError(1).isPresent).to.be.true;
        expect(LostItemFeePolicyForm.validationError(1).text).to.equal(translation['settings.lostItemFee.validate.hasLostItemProcessingFeeValue']);
      });
    });

    describe('charge lost item processing fee if item aged to lost by system validation is present', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.itemsAged.fillAndBlurDuration(5)
          .lostItemFeeSection.itemsAged.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.lostBySystem.selectAndBlur('Yes')
          .save();
      });

      it('shows validation error', () => {
        expect(LostItemFeePolicyForm.validationError(1).isPresent).to.be.true;
        expect(LostItemFeePolicyForm.validationError(1).text).to.equal(translation['settings.lostItemFee.validate.hasLostItemProcessingFeeValue']);
      });
    });

    describe('If lost item replaced, remove lost item processing fee and lost item processing fee validation is present', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.lostItemFee.fillAndBlur(1)
          .lostItemFeeSection.itemReplaced.selectAndBlur('Yes')
          .save();
      });

      it('shows validation error', () => {
        expect(LostItemFeePolicyForm.validationError(2).isPresent).to.be.true;
        expect(LostItemFeePolicyForm.validationError(2).text).to.equal(translation['settings.lostItemFee.validate.hasReplacementAllowedAndNegativeLostItemPolicyFee']);
      });
    });

    describe('If lost item replaced, remove lost item processing fee and replacement allowed validation is present', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.replacementAllowed.selectAndBlur('Yes')
          .lostItemFeeSection.itemReplaced.selectAndBlur('Yes')
          .save();
      });

      it('shows validation error', () => {
        expect(LostItemFeePolicyForm.validationError(1).isPresent).to.be.true;
        expect(LostItemFeePolicyForm.validationError(1).text).to.equal(translation['settings.lostItemFee.validate.hasLostItemProcessingFeeValue']);
      });
    });
  });
});
