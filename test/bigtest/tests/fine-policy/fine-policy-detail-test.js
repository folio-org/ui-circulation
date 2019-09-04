import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import FinePolicyDetail from '../../interactors/fine-policy/fine-policy-detail';


describe('FinePolicyDetail', () => {
  setupApplication({ scenarios: ['testFinePolicy'] });

  let finePolicy;

  describe('viewing fine policy', () => {
    describe('accordions', () => {
      beforeEach(function () {
        finePolicy = this.server.create('overdueFinePolicy');

        this.visit(`/settings/circulation/fine-policies/${finePolicy.id}`);
      });

      it('should be displayed', () => {
        expect(FinePolicyDetail.expandAll.isPresent).to.be.true;
      });

      describe('collapse all', () => {
        beforeEach(async () => {
          await FinePolicyDetail.overdueDetails.clickHeader();
          await FinePolicyDetail.expandAll.click();
        });

        it('content should be hidden', () => {
          expect(FinePolicyDetail.content.isHidden).to.be.true;
        });

        describe('expand all', () => {
          beforeEach(async () => {
            await FinePolicyDetail.expandAll.click();
          });

          it('content should be visible', () => {
            expect(FinePolicyDetail.content.isVisible).to.be.true;
          });
        });
      });
    });

    describe('about section', () => {
      describe('fine policy', () => {
        beforeEach(function () {
          finePolicy = this.server.create('overdueFinePolicy');

          this.visit(`/settings/circulation/fine-policies/${finePolicy.id}`);
        });


        describe('fine policy name', () => {
          it('should be displayed', () => {
            expect(FinePolicyDetail.aboutSection.policyName.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(FinePolicyDetail.aboutSection.policyName.value.text).to.equal(finePolicy.name);
          });
        });

        describe('fine policy description', () => {
          it('should be displayed', () => {
            expect(FinePolicyDetail.aboutSection.policyDescription.isPresent).to.be.true;
          });

          it('should have a proper value', () => {
            expect(FinePolicyDetail.aboutSection.policyDescription.value.text).to.equal(finePolicy.description);
          });
        });
      });
    });

    describe('overdue fine section', () => {
      describe('fine policy', () => {
        beforeEach(function () {
          finePolicy = this.server.create('overdueFinePolicy');

          this.visit(`/settings/circulation/fine-policies/${finePolicy.id}`);
        });

        describe('fines section', () => {
          it('should not be displayed', () => {
            expect(FinePolicyDetail.finesSection.isPresent).to.be.true;
          });
        });
      });
    });
  });
});
