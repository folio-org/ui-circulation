import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import LoanPolicyForm from '../../interactors/loan-policy/loan-policy-form';
import LoanPolicyDetail from '../../interactors/loan-policy/loan-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testLoanPolicySettings from '../../constants/testLoanPolicySettings';

describe('LoanPolicyEdit', () => {
  setupApplication({ scenarios: ['testLoanPolicy'] });

  describe('updating an existing loan policy', () => {
    const newLoanPolicyName = 'updated loan policy';

    beforeEach(async function () {
      await this.visit(`/settings/circulation/loan-policies/${testLoanPolicySettings.id}?layer=edit`);
      await LoanPolicyForm.whenLoaded(testLoanPolicySettings.name);
    });

    it('policy name should be same as in testLoanPolicy scenario', () => {
      expect(LoanPolicyForm.aboutSection.policyNameValue.value).to.equal(testLoanPolicySettings.name);
    });

    it('item limit should be same as in testLoanPolicy scenario', () => {
      expect(LoanPolicyDetail.loansSection.itemLimit.value.text).to.equal('22');
    });

    describe('updating an existing loan policy', () => {
      beforeEach(async function () {
        await LoanPolicyForm.aboutSection.policyNameValue.fill(newLoanPolicyName).save();
      });

      it('should render updated policy name', () => {
        expect(LoanPolicyDetail.aboutSection.policyName.value.text).to.equal(newLoanPolicyName);
      });
    });

    describe('Cancel editing for pristine form', () => {
      beforeEach(async () => {
        await LoanPolicyForm.cancelEditingLoanPolicy.click();
      });

      it('should not show cancel editing confirmation', () => {
        expect(LoanPolicyForm.cancelEditingLoanPolicyModal.isPresent).to.be.false;
      });
    });

    describe('Cancel editing on dirty form', () => {
      beforeEach(async () => {
        await LoanPolicyForm.aboutSection.policyNameValue.fill(newLoanPolicyName);
        await LoanPolicyForm.cancelEditingLoanPolicy.click();
      });

      it('should show cancel editing confirmation', () => {
        expect(LoanPolicyForm.cancelEditingLoanPolicyModal.isPresent).to.be.true;
      });
    });
  });
});
