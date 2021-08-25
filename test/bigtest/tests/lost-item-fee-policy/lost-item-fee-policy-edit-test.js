import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import LostItemFeePolicyForm from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-form';
import LostItemFeePolicyDetail from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testLostItemFeePolicySettings from '../../constants/testLostItemFeePolicySettings';

describe('LostItemFeePolicyEdit', () => {
  setupApplication({ scenarios: ['testLostItemFeePolicy'] });

  describe('updating an existing lost item fee policy', () => {
    const newLoanPolicyName = 'updated lost item fee policy';

    beforeEach(function () {
      this.visit(`/settings/circulation/lost-item-fee-policy/${testLostItemFeePolicySettings.id}?layer=edit`);
    });

    beforeEach(async () => {
      await LostItemFeePolicyForm.whenLoaded(testLostItemFeePolicySettings.name);
    });

    it('policy name should be same as in testLostItemFeePolicy scenario', () => {
      expect(LostItemFeePolicyForm.aboutSection.policyNameValue.value).to.equal(testLostItemFeePolicySettings.name);
    });

    describe.skip('updating an existing lost item fee policy', () => {
      beforeEach(async function () {
        await LostItemFeePolicyForm
          .aboutSection.policyNameValue.fill(newLoanPolicyName)
          .lostItemFeeSection.lostItemFee.fill('0')
          .lostItemFeeSection.replacementAllowed.selectAndBlur('Yes')
          .save();
      });

      it('should render updated policy name', () => {
        expect(LostItemFeePolicyDetail.aboutSection.policyName.value.text).to.equal(newLoanPolicyName);
      });
    });

    describe('Cancel editing for pristine form', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm.cancelEditingLostItemPolicy.click();
      });

      it('should not show cancel editing confirmation', () => {
        expect(LostItemFeePolicyForm.cancelEditingLostItemPolicyModal.isPresent).to.be.false;
      });
    });

    describe('Cancel editing on dirty form', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm.aboutSection.policyNameValue.fill(newLoanPolicyName);
        await LostItemFeePolicyForm.cancelEditingLostItemPolicy.click();
      });

      it('should show cancel editing confirmation', () => {
        expect(LostItemFeePolicyForm.cancelEditingLostItemPolicyModal.isPresent).to.be.true;
      });
    });
  });
});
