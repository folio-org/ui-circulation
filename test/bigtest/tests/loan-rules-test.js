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

  /* TODO: turn on after  UICIRC-164 is done
  describe('entering loan rule into editor', () => {
    beforeEach(async function () {
      await loanRules.editor.setValue('m book: l example-loan-policy');
    });

    it('should set new loan rule', () => {
      expect(loanRules.editor.value).to.be.equal('m book: l example-loan-policy');
    });
  });

  describe('entering item type', () => {
    beforeEach(async function () {
      await loanRules.editor.setValue('m book: ');
    });

    it('should display policy types menu', () => {
      expect(loanRules.editor.hints.arePresent).to.be.true;
      expect(loanRules.editor.hints.text).to.be.equal('Loan policies');
    });
  });

  describe('choosing policy type', () => {
    beforeEach(async function () {
      await loanRules.editor.setValue('m book: ');
      await loanRules.editor.pickHint(1);
    });

    it('should choose policy type', () => {
      expect(loanRules.editor.value).to.be.equal('m book: l ');
    });
  });

  describe('choosing loan policy', () => {
    beforeEach(async function () {
      await loanRules.editor.setValue('m book: ');
      // choose policy type
      await loanRules.editor.pickHint(1);
      // choose loan policy
      await loanRules.editor.pickHint(0);
    });

    it('should choose loan policy', () => {
      expect(loanRules.editor.value).to.be.equal('m book: l example-loan-policy ');
    });
  });
  */
});
