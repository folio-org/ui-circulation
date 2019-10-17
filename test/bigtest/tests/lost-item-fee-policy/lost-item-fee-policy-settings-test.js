import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LostItemFeePolicySettings from '../../interactors/lost-item-fee-policy/lost-item-fee-policy-settings';

const NUMBER_OF_LOST_ITEM_FEE_POLICIES = 5;

describe('LostItemFeePolicySettings', () => {
  setupApplication({ scenarios: ['testLostItemFeePolicy'] });

  beforeEach(function () {
    this.server.createList('lostItemFeePolicy', NUMBER_OF_LOST_ITEM_FEE_POLICIES);
  });

  describe('viewing lost item fee policy list', () => {
    beforeEach(async function () {
      await this.visit('/settings/circulation/lost-item-fee-policy');
    });

    it('has a lost item fee policy list', () => {
      expect(LostItemFeePolicySettings.hasList).to.be.true;
    });

    it(`has ${NUMBER_OF_LOST_ITEM_FEE_POLICIES + 1} items`, () => {
      expect(LostItemFeePolicySettings.policiesCount).to.equal(NUMBER_OF_LOST_ITEM_FEE_POLICIES + 1);
    });
  });
});
