import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import RequestPolicyForm from '../../interactors/request-policy/request-policy-form';
import RequestPolicyDetail from '../../interactors/request-policy/request-policy-detail';
import setupApplication from '../../helpers/setup-application';

describe('RequestPolicyDelete', () => {
  setupApplication();

  describe('show entity in use modal', () => {
    let requestPolicy;

    beforeEach(function () {
      requestPolicy = this.server.create('requestPolicy', {
        id: '1a54b431-2e4f-452d-9cae-9cee66c9a892',
        name: 'Request policy 20'
      });
    });

    describe('choose action delete on existing notice policy from policy form', () => {
      beforeEach(async function () {
        await this.visit(`/settings/circulation/request-policies/${requestPolicy.id}?layer=edit`);
        await RequestPolicyForm.deleteRequestPolicy.click();
      });

      it('should open entity in use modal', () => {
        expect(RequestPolicyForm.entityInUseModal.isPresent).to.be.true;
      });
    });

    describe('choose action delete on existing notice policy from policy details view', () => {
      beforeEach(async function () {
        await this.visit(`/settings/circulation/request-policies/${requestPolicy.id}`);
        await RequestPolicyDetail.deleteRequestPolicy.click();
      });

      it('should open entity in use modal', () => {
        expect(RequestPolicyDetail.entityInUseModal.isPresent).to.be.true;
      });
    });
  });
});
