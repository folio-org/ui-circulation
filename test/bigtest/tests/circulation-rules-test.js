import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import circulationRules from '../interactors/circulation-rules';

describe('CirculationRules', () => {
  setupApplication();

  beforeEach(function () {
    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  it('has rules form', () => {
    expect(circulationRules.formPresent).to.be.true;
  });

  it('has rules editor', () => {
    expect(circulationRules.editorPresent).to.be.true;
  });

  describe('entering circulation rule into editor', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: l example-loan-policy');
    });

    it('should set new circulation rule', () => {
      expect(circulationRules.editor.value).to.be.equal('m book: l example-loan-policy');
    });
  });

  describe('entering item type', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
    });

    it('should display policy types menu', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
      expect(circulationRules.editor.hints.text).to.be.equal('Loan policies');
    });
  });

  describe('choosing policy type', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
      await circulationRules.editor.pickHint(1);
    });

    it('should choose policy type', () => {
      expect(circulationRules.editor.value).to.be.equal('m book: l ');
    });
  });

  describe('choosing loan policy', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
      // choose policy type
      await circulationRules.editor.pickHint(1);
      // choose loan policy
      await circulationRules.editor.pickHint(0);
    });

    it('should choose loan policy', () => {
      expect(circulationRules.editor.value).to.be.equal('m book: l example-loan-policy ');
    });
  });

  describe('choosing fallback policy', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('fallback-policy: ');
      // choose policy type
      await circulationRules.editor.pickHint(1);
      // choose loan policy
      await circulationRules.editor.pickHint(0);
    });

    it('should choose loan policy as a fallback', () => {
      expect(circulationRules.editor.value).to.be.equal('fallback-policy: l example-loan-policy ');
    });
  });
});
