import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import LoanPolicyForm from '../../interactors/loan-policy/loan-policy-form';
import LoanPolicyDetail from '../../interactors/loan-policy/loan-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testLoanPolicySettings from '../../constants/testLoanPolicySettings';

describe('LoanPolicyDelete', () => {
  setupApplication({ scenarios: ['testLoanPolicy'] });

  describe('updating an existing loan policy', () => {
    beforeEach(async function () {
      await this.visit(`/settings/circulation/loan-policies/${testLoanPolicySettings.id}?layer=edit`);
      await LoanPolicyForm.whenLoaded(testLoanPolicySettings.name);
    });

    it('policy name should be same as in testLoanPolicy scenario', () => {
      expect(LoanPolicyForm.aboutSection.policyNameValue.value).to.equal(testLoanPolicySettings.name);
    });

    describe('choose action delete on existing notice policy', () => {
      beforeEach(async () => {
        await LoanPolicyForm.deleteLoanPolicy.click();
      });

      it('should open delete modal', () => {
        expect(LoanPolicyForm.deleteLoanPolicyModal.isPresent).to.be.true;
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await LoanPolicyForm.deleteLoanPolicyCancel.click();
        });

        it('should close delete modal', () => {
          expect(LoanPolicyForm.deleteLoanPolicyModal.isPresent).to.be.false;
        });
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await LoanPolicyForm.deleteLoanPolicyConfirm.click();
        });

        it('LoanPolicyDetail should not be displayed', () => {
          expect(LoanPolicyDetail.isPresent).to.be.false;
        });
      });
    });
  });
});
