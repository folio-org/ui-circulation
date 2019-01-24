import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RequestPolicyForm from '../../interactors/request-policy/request-policy-form';
import RequestPolicyDetail from '../../interactors/request-policy/request-policy-detail';

describe('RequestPolicyForm', () => {
  setupApplication();

  describe('create a new policy request', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/request-policies?layer=add');
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

    it('has a hold checkbox', () => {
      expect(RequestPolicyForm.hasHoldCheckbox).to.be.true;
    });

    describe('filling form and saving new policy', () => {
      beforeEach(async function () {
        await RequestPolicyForm
          .fillName('new request policy')
          .fillDescription('test request policy description')
          .clickHoldCheckbox()
          .save();
      });

      it('renders updated policy name', function () {
        expect(RequestPolicyDetail.name).to.equal('new request policy');
      });
    });
  });

  describe('updating an existing request policy', () => {
    let requestPolicy;

    beforeEach(function () {
      requestPolicy = this.server.create('requestPolicy', {
        name: 'Request policy 1',
        description: 'Request policy 1 desc',
      });

      this.visit(`/settings/circulation/request-policies/${requestPolicy.id}?layer=edit`);
    });

    it('has a request policy name field', () => {
      expect(RequestPolicyForm.nameValue).to.equal(requestPolicy.name);
    });

    describe('clicking save', () => {
      beforeEach(async function () {
        await RequestPolicyForm
          .fillName('updated request policy')
          .fillDescription('updated request policy description')
          .save();
      });

      it('renders updated policy name', () => {
        expect(RequestPolicyDetail.name).to.equal('updated request policy');
      });
    });
  });
});
