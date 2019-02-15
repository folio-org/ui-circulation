import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LoanPolicySettings from '../../interactors/loan-policy/loan-policy-settings';

const NUMBER_OF_LOAN_POLICIES = 5;

describe('LoanPolicySettings', () => {
  setupApplication();

  beforeEach(function () {
    this.server.createList('loanPolicy', NUMBER_OF_LOAN_POLICIES);
  });

  describe('viewing loan policy list', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/loan-policies');
    });

    it('has a loan policy list', () => {
      expect(LoanPolicySettings.hasList).to.be.true;
    });

    it(`has ${NUMBER_OF_LOAN_POLICIES} items`, () => {
      expect(LoanPolicySettings.policiesCount).to.equal(NUMBER_OF_LOAN_POLICIES);
    });
  });
});
