import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RequestPolicySettings from '../../interactors/request-policy/request-policy-settings';

describe('RequestPolicySettings', () => {
  setupApplication();

  beforeEach(function () {
    this.server.create('requestPolicy', {
      name: 'policy 3',
      description: 'policy 3 desc',
    });

    this.server.create('requestPolicy', {
      name: 'policy 4',
      description: 'policy 4 desc',
    });
  });

  describe('viewing request policy list', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/request-policies');
    });

    it('has a request policy list', () => {
      expect(RequestPolicySettings.hasList).to.be.true;
    });

    it('has 2 items', () => {
      expect(RequestPolicySettings.policiesCount).to.equal(2);
    });
  });
});
