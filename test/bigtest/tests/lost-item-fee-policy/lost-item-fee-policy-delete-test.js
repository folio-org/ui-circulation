import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import LostItemFeePolicyForm from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-form';
import LostItemFeePolicyDetail from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testLostItemFeePolicySettings from '../../constants/testLostItemFeePolicySettings';

describe('LostItemFeePolicyDelete', () => {
  setupApplication({ scenarios: ['testLostItemFeePolicy'] });

  describe('updating an existing lost item fee policy', () => {
    beforeEach(async function () {
      await this.visit(`/settings/circulation/lost-item-fee-policy/${testLostItemFeePolicySettings.id}?layer=edit`);
      await LostItemFeePolicyForm.whenLoaded(testLostItemFeePolicySettings.name);
    });

    it('policy name should be same as in testLostItemFeePolicy scenario', () => {
      expect(LostItemFeePolicyForm.aboutSection.policyNameValue.value).to.equal(testLostItemFeePolicySettings.name);
    });

    describe('choose action delete on existing lost item fee policy', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm.deleteLostItemPolicy.click();
      });

      it('should open delete modal', () => {
        expect(LostItemFeePolicyForm.deleteLostItemPolicyModal.isPresent).to.be.true;
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await LostItemFeePolicyForm.deleteLostItemPolicyCancel.click();
        });

        it('should close delete modal', () => {
          expect(LostItemFeePolicyForm.deleteLostItemPolicyModal.isPresent).to.be.false;
        });
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await LostItemFeePolicyForm.deleteLostItemPolicyConfirm.click();
        });

        it('LoanPolicyDetail should not be displayed', () => {
          expect(LostItemFeePolicyDetail.isPresent).to.be.false;
        });
      });
    });

    describe('cancel delete', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm.deleteCancel.click();
      });

      it('the new button is present', () => {
        expect(LostItemFeePolicyForm.buttonNew.isPresent).to.be.true;
      });
    });
  });
});
