import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import FinePolicyForm from '../../interactors/fine-policy/fine-policy-form';
import FinePolicyDetail from '../../interactors/fine-policy/fine-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testFinePolicySettings from '../../constants/testFinePolicySettings';

describe('FinePolicyEdit', () => {
  setupApplication({ scenarios: ['testFinePolicy'] });

  describe('updating an existing fine policy', () => {
    const newLoanPolicyName = 'updated fine policy';

    beforeEach(async function () {
      await this.visit(`/settings/circulation/fine-policies/${testFinePolicySettings.id}?layer=edit`);
      await FinePolicyForm.whenLoaded(testFinePolicySettings.name);
    });

    it('policy name should be same as in testFinePolicy scenario', () => {
      expect(FinePolicyForm.aboutSection.policyNameValue.value).to.equal(testFinePolicySettings.name);
    });

    describe('updating an existing fine policy', () => {
      beforeEach(async function () {
        await FinePolicyForm.aboutSection.policyNameValue.fill(newLoanPolicyName).save();
      });

      it('should render updated policy name', () => {
        expect(FinePolicyDetail.aboutSection.policyName.value.text).to.equal(newLoanPolicyName);
      });
    });

    describe('Cancel editing for pristine form', () => {
      beforeEach(async () => {
        await FinePolicyForm.cancelEditingFinePolicy.click();
      });

      it('should not show cancel editing confirmation', () => {
        expect(FinePolicyForm.cancelEditingFinePolicyModal.isPresent).to.be.false;
      });
    });

    describe('Cancel editing on dirty form', () => {
      beforeEach(async () => {
        await FinePolicyForm.aboutSection.policyNameValue.fill(newLoanPolicyName);
        await FinePolicyForm.cancelEditingFinePolicy.click();
      });

      it('should show cancel editing confirmation', () => {
        expect(FinePolicyForm.cancelEditingFinePolicyModal.isPresent).to.be.true;
      });
    });
  });
});
