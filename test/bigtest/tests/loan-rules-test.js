import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import setupApplication from '../helpers/setup-application';
import loanRules from '../interactors/loan-rules';

describe('LoanRules', () => {
  setupApplication();

  beforeEach(function () {
    return this.visit('/settings/circulation/loan-rules', () => {
      expect(loanRules.$root).to.exist;
    });
  });

  it('has loan rules form', () => {
    expect(loanRules.formPresent).to.be.true;
  });

  it('has loan rules editor', () => {
    expect(loanRules.editorPresent).to.be.true;
  });

  describe('entering loan rule into editor', () => {
    beforeEach(async function () {
      await loanRules.whenLoaded();
      await loanRules.editor.setValue('m book: example-loan-policy');
    });

    it('should set new loan rule', () => {
      expect(loanRules.editor.value).to.be.equal('m book: example-loan-policy');
    });
  });
});
