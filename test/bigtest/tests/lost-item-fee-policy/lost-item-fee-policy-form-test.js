import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LostItemFeePolicyForm from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-form';
import LostItemFeePolicyDetail from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-detail';

describe('Lost Item Fee Policy Form', () => {
  setupApplication({ scenarios: ['testLostItemFeePolicy'] });

  describe('accordions', () => {
    beforeEach(async function () {
      await this.visit('/settings/circulation/lost-item-fee-policy?layer=add');
    });

    it('should be displayed', () => {
      expect(LostItemFeePolicyForm.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await LostItemFeePolicyForm.expandAll.click();
      });

      it('aboutSection should not be displayed', () => {
        expect(LostItemFeePolicyForm.generalInformationAccordion.isOpen).to.be.false;
      });

      it('overdueFineSection should not be displayed', () => {
        expect(LostItemFeePolicyForm.lostItemFeeAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await LostItemFeePolicyForm.expandAll.click();
        });

        it('aboutSection should be displayed', () => {
          expect(LostItemFeePolicyForm.generalInformationAccordion.isOpen).to.be.true;
        });

        it('overdueFineSection should be displayed', () => {
          expect(LostItemFeePolicyForm.lostItemFeeAccordion.isOpen).to.be.true;
        }).timeout(3000);
      });
    });
  });

  describe('create a new lost item fee policy', () => {
    beforeEach(async function () {
      await this.visit('/settings/circulation/lost-item-fee-policy?layer=add');
    });

    describe('filling form and saving new policy', () => {
      const newLostItemPolicyName = 'new lost policy';

      beforeEach(async function () {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newLostItemPolicyName)
          .lostItemFeeSection.closeLoanAfter.fillAndBlurDuration(5)
          .lostItemFeeSection.closeLoanAfter.selectAndBlurInterval('hour(s)')
          .save();
      });

      it('renders updated policy name', function () {
        expect(LostItemFeePolicyDetail.aboutSection.policyName.value.text).to.equal(newLostItemPolicyName);
      });
    });
  });

  describe('create a new lost item fee policy with all values', () => {
    beforeEach(async function () {
      await this.visit('/settings/circulation/lost-item-fee-policy?layer=add');
    });

    describe('filling form and saving new policy', () => {
      const newFinePolicyName = 'new lost policy2';

      beforeEach(async function () {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newFinePolicyName)
          .lostItemFeeSection.itemsAged.fillAndBlurDuration(5)
          .lostItemFeeSection.itemsAged.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.patronBilled.fillAndBlurDuration(5)
          .lostItemFeeSection.patronBilled.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.chargeAmountAnother.clickAndBlur()
          .lostItemFeeSection.chargeAmount.fillAndBlur(5)
          .lostItemFeeSection.lostItemFee.fillAndBlur(5)
          .lostItemFeeSection.lostByPatron.selectAndBlur('Yes')
          .lostItemFeeSection.lostBySystem.selectAndBlur('Yes')
          .lostItemFeeSection.closeLoanAfter.fillAndBlurDuration(5)
          .lostItemFeeSection.closeLoanAfter.selectAndBlurInterval('hour(s)')
          .lostItemFeeSection.itemReturned.selectAndBlur('No')
          .lostItemFeeSection.itemReplaced.selectAndBlur('No')
          .lostItemFeeSection.replacementFee.fillAndBlur(5)
          .lostItemFeeSection.replacementAllowed.selectAndBlur('Yes')
          .lostItemFeeSection.lostItemReturnedCharge.clickAndBlur()
          .lostItemFeeSection.returnedMoreThan.fillAndBlurDuration(5)
          .lostItemFeeSection.returnedMoreThan.selectAndBlurInterval('hour(s)')
          .save();
      });

      it('renders updated policy name', function () {
        expect(LostItemFeePolicyDetail.aboutSection.policyName.value.text).to.equal(newFinePolicyName);
      });
    });

    describe('filling form and saving new policy', () => {
      const newFinePolicyName = 'new lost policy3';

      beforeEach(async function () {
        await LostItemFeePolicyForm
          .aboutSection.policyName.fillAndBlur(newFinePolicyName)
          .lostItemFeeSection.closeLoanAfter.fillAndBlurDuration(5)
          .lostItemFeeSection.closeLoanAfter.selectAndBlurInterval('hour(s)')
          .save();
      });

      it('renders updated policy name', function () {
        expect(LostItemFeePolicyDetail.aboutSection.policyName.value.text).to.equal(newFinePolicyName);
      });
    });
  });
});
