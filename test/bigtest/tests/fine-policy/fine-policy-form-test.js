import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import FinePolicyForm from '../../interactors/fine-policy/fine-policy-form';
import FinePolicyDetail from '../../interactors/fine-policy/fine-policy-detail';

describe('FinePolicyForm', () => {
  setupApplication({ scenarios: ['testFinePolicy'] });

  describe('accordions', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fine-policies?layer=add');
    });

    it('should be displayed', () => {
      expect(FinePolicyForm.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await FinePolicyForm.overdueAccordion.clickHeader()
          .overdueAccordion.clickHeader()
          .expandAll.click();
      });

      it('aboutSection should not be displayed', () => {
        expect(FinePolicyForm.generalAccordion.isOpen).to.be.false;
      });

      it('overdueFineSection should not be displayed', () => {
        expect(FinePolicyForm.overdueAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await FinePolicyForm.expandAll.click();
        });

        it('aboutSection should be displayed', () => {
          expect(FinePolicyForm.generalAccordion.isOpen).to.be.true;
        });

        it('overdueFineSection should be displayed', () => {
          expect(FinePolicyForm.overdueAccordion.isOpen).to.be.true;
        }).timeout(3000);
      });
    });
  });

  describe('create a new fine policy', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fine-policies?layer=add');
    });

    describe('filling form and saving new policy', () => {
      const newFinePolicyName = 'new fine policy';

      beforeEach(async function () {
        await FinePolicyForm
          .aboutSection.policyName.fillAndBlur(newFinePolicyName)
          .save();
      });

      it('renders updated policy name', function () {
        expect(FinePolicyDetail.aboutSection.policyName.value.text).to.equal(newFinePolicyName);
      });
    });
  });

  describe('create a new fine policy without overdue fine', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fine-policies?layer=add');
    });

    describe('filling form and saving new policy', () => {
      const newFinePolicyName = 'new fine policy2';

      beforeEach(async function () {
        await FinePolicyForm
          .aboutSection.policyName.fillAndBlur(newFinePolicyName)
          .overdueFineSection.overdue.quantity.fillValue('9')
          .overdueFineSection.overdue.quantity.blurInput()
          .overdueFineSection.overdue.interval.selectAndBlur('day')
          .overdueFineSection.maxOverdue.fillAndBlur('11.99')
          .save();
      });

      it('renders updated policy name', function () {
        expect(FinePolicyDetail.aboutSection.policyName.value.text).to.equal(newFinePolicyName);
      });
    });

    describe('filling form and saving new policy', () => {
      const newFinePolicyName = 'new fine policy3';

      beforeEach(async function () {
        await FinePolicyForm
          .aboutSection.policyName.fillAndBlur(newFinePolicyName)
          .overdueFineSection.overdue.quantity.fillValue('0.00')
          .overdueFineSection.overdue.quantity.blurInput()
          .overdueFineSection.overdue.interval.selectAndBlur('day')
          .overdueFineSection.maxOverdue.fillAndBlur('0')
          .overdueFineSection.maxOverdue.blurInput()
          .save();
      });

      it('renders updated policy name', function () {
        expect(FinePolicyDetail.aboutSection.policyName.value.text).to.equal(newFinePolicyName);
      });
    });
  });
});
