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
    });
  });

  describe('viewing request policy', () => {
    beforeEach(function () {
      this.visit(`/settings/circulation/request-policies/${requestPolicy.id}`);
    });

    it('has a request policy name', () => {
      expect(RequestPolicyDetail.name).to.equal(requestPolicy.name);
    });
  });
});
