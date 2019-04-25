import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import RequestPolicyForm from '../../interactors/request-policy/request-policy-form';
import setupApplication from '../../helpers/setup-application';

describe('RequestPolicyDelete', () => {
  setupApplication();

  describe('show cannot delete request modal', () => {
    let requestPolicy;

    beforeEach(function () {
      requestPolicy = this.server.create('requestPolicy', {
        id: '1a54b431-2e4f-452d-9cae-9cee66c9a892',
        name: 'Request policy 20'
      });
    });

    beforeEach(async function () {
      await this.visit(`/settings/circulation/request-policies/${requestPolicy.id}?layer=edit`);
    });

    describe('choose action delete on existing notice policy', () => {
      beforeEach(async () => {
        await RequestPolicyForm.deleteRequestPolicy.click();
      });

      it('should open delete modal', () => {
        expect(RequestPolicyForm.cannotDeleteModal.isPresent).to.be.true;
      });
    });
  });
});
