import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import FinePolicyForm from '../../interactors/fine-policy/fine-policy-form';
import FinePolicyDetail from '../../interactors/fine-policy/fine-policy-detail';
import setupApplication from '../../helpers/setup-application';
import testFinePolicySettings from '../../constants/testFinePolicySettings';

describe('FinePolicyDelete', () => {
  setupApplication({ scenarios: ['testFinePolicy'] });

  describe('updating an existing fine policy', () => {
    beforeEach(async function () {
      await this.visit(`/settings/circulation/fine-policies/${testFinePolicySettings.id}?layer=edit`);
      await FinePolicyForm.whenLoaded(testFinePolicySettings.name);
    });

    it('policy name should be same as in testFinePolicy scenario', () => {
      expect(FinePolicyForm.aboutSection.policyNameValue.value).to.equal(testFinePolicySettings.name);
    });

    describe('choose action delete on existing fine policy', () => {
      beforeEach(async () => {
        await FinePolicyForm.deleteFinePolicy.click();
      });

      it('should open delete modal', () => {
        expect(FinePolicyForm.deleteFinePolicyModal.isPresent).to.be.true;
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await FinePolicyForm.deleteFinePolicyCancel.click();
        });

        it('should close delete modal', () => {
          expect(FinePolicyForm.deleteFinePolicyModal.isPresent).to.be.false;
        });
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await FinePolicyForm.deleteFinePolicyConfirm.click();
        });

        it('LoanPolicyDetail should not be displayed', () => {
          expect(FinePolicyDetail.isPresent).to.be.false;
        });
      });
    });
  });
});
