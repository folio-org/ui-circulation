import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import FinePolicySettings from '../../interactors/fine-policy/fine-policy-settings';

const NUMBER_OF_FINE_POLICIES = 5;

describe('FinePolicySettings', () => {
  setupApplication({ scenarios: ['testFinePolicy'] });

  beforeEach(function () {
    this.server.createList('overdueFinePolicy', NUMBER_OF_FINE_POLICIES);
  });

  describe('viewing fine policy list', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fine-policies');
    });

    it('has a fine policy list', () => {
      expect(FinePolicySettings.hasList).to.be.true;
    });

    it(`has ${NUMBER_OF_FINE_POLICIES + 1} items`, () => {
      expect(FinePolicySettings.policiesCount).to.equal(NUMBER_OF_FINE_POLICIES + 1);
    });
  });
});
