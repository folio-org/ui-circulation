import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RequestPolicyDetail from '../../interactors/request-policy/request-policy-detail';

describe('RequestPolicyDetail', () => {
  setupApplication();

  let requestPolicy;

  beforeEach(function () {
    requestPolicy = this.server.create('requestPolicy', {
      name: 'Request policy 2',
      description: 'Request policy 2 desc',
      requestTypes: ['Hold', 'Pages', 'Recall'],
    });
  });

  describe('viewing request policy', () => {
    beforeEach(function () {
      this.visit(`/settings/circulation/request-policies/${requestPolicy.id}`);
    });

    it('has a request policy name', () => {
      expect(RequestPolicyDetail.name).to.equal(requestPolicy.name);
    });

    it('has a request types', () => {
      expect(RequestPolicyDetail.requestTypes().length).to.equal(3);
      expect(RequestPolicyDetail.requestTypes(0).text).to.equal(requestPolicy.requestTypes[0]);
      expect(RequestPolicyDetail.requestTypes(1).text).to.equal(requestPolicy.requestTypes[1]);
      expect(RequestPolicyDetail.requestTypes(2).text).to.equal(requestPolicy.requestTypes[2]);
    });
  });

  describe('accordions', () => {
    beforeEach(function () {
      this.visit(`/settings/circulation/request-policies/${requestPolicy.id}`);
    });

    it('should be displayed', () => {
      expect(RequestPolicyDetail.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await RequestPolicyDetail.expandAll.click();
      });

      it('generalSection should not be displayed', () => {
        expect(RequestPolicyDetail.generalSectionAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await RequestPolicyDetail.expandAll.click();
        });

        it('generalSection should be displayed', () => {
          expect(RequestPolicyDetail.generalSectionAccordion.isOpen).to.be.true;
        });
      });
    });

    describe('toggle accordion', () => {
      beforeEach(async () => {
        await RequestPolicyDetail.generalAccordionToggleButton.click();
      });

      it('generalSection should not be displayed', () => {
        expect(RequestPolicyDetail.generalSectionAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await RequestPolicyDetail.generalAccordionToggleButton.click();
        });

        it('generalSection should be displayed', () => {
          expect(RequestPolicyDetail.generalSectionAccordion.isOpen).to.be.true;
        });
      });
    });
  });
});
