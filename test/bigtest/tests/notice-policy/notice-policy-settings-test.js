import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import setupApplication from '../../helpers/setup-application';
import NoticePolicySettings from '../../interactors/notice-policy/notice-policy-settings';

const NUMBER_OF_NOTICE_POLICIES = 2;

describe('NoticePolicySettings', () => {
  setupApplication();

  beforeEach(function () {
    this.server.createList('patronNoticePolicy', NUMBER_OF_NOTICE_POLICIES);
    this.visit('/settings/circulation/notice-policies');
  });

  describe('viewing notice policy list', () => {
    it('has a notice policy list', () => {
      expect(NoticePolicySettings.hasList).to.be.true;
    });

    it('has 2 items', () => {
      expect(NoticePolicySettings.policiesCount).to.equal(NUMBER_OF_NOTICE_POLICIES);
    });
  });
});
