import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RequestPolicyForm from '../../interactors/request-policy/request-policy-form';
import RequestPolicyDetail from '../../interactors/request-policy/request-policy-detail';

describe('RequestPolicyForm', () => {
  setupApplication();

  describe('displaying a request policy', () => {
    let requestPolicy;

    beforeEach(function () {
      requestPolicy = this.server.create('requestPolicy', {
        name: 'Request policy 20',
        description: 'Request policy 1 desc',
      });
    });

    beforeEach(async function () {
      await this.visit(`/settings/circulation/request-policies/${requestPolicy.id}?layer=edit`);
    });

    it('has a request policy name field', () => {
      expect(RequestPolicyForm.hasName).to.be.true;
    });

    it('has a request policy description field', () => {
      expect(RequestPolicyForm.hasDescription).to.be.true;
    });

    it('has a save button', () => {
      expect(RequestPolicyForm.hasSaveButton).to.be.true;
    });

    it('has a request types checkboxes', () => {
      expect(RequestPolicyForm.hasHoldCheckbox).to.be.true;
      expect(RequestPolicyForm.pageCheckbox.isPresent).to.be.true;
      expect(RequestPolicyForm.recallCheckbox.isPresent).to.be.true;
    });

    it('has a request policy name field', () => {
      expect(RequestPolicyForm.nameValue).to.equal(requestPolicy.name);
    });

    describe('toggle accordion', () => {
      beforeEach(function () {
        this.visit('/settings/circulation/request-policies?layer=add');
      });

      beforeEach(async () => {
        await RequestPolicyForm.generalAccordionToggleButton.click();
      });

      it('generalSection should not be displayed', () => {
        expect(RequestPolicyForm.generalSectionAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await RequestPolicyForm.generalAccordionToggleButton.click();
        });

        it('generalSection should be displayed', () => {
          expect(RequestPolicyForm.generalSectionAccordion.isOpen).to.be.true;
        });
      });
    });
  });

  describe('saving form', () => {
    let requestPolicy;

    beforeEach(function () {
      requestPolicy = this.server.create('requestPolicy', {
        name: 'Request policy',
        description: 'Request policy 1 desc',
        requestTypes: ['Hold', 'Page']
      });

      this.visit(`/settings/circulation/request-policies/${requestPolicy.id}?layer=edit`);
    });

    beforeEach(async () => {
      await RequestPolicyForm.whenLoaded();
      await RequestPolicyForm
        .fillName('updated policy name')
        .fillDescription('updated request policy description')
        .save();
    });

    it('renders updated policy name', () => {
      expect(RequestPolicyDetail.name).to.equal('updated policy name');
    });
  });
});
