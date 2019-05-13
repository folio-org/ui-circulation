import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import circulationRules from '../interactors/circulation-rules';
import { toLowercaseReplaceAllSpaces } from '../helpers/messageСonverters';

describe('CirculationRules', () => {
  setupApplication();

  let loanPolicies;
  let requestPolicies;
  let patronNoticePolicies;

  beforeEach(async function () {
    loanPolicies = await this.server.createList('loanPolicy', 3);
    requestPolicies = await this.server.createList('requestPolicy', 3);
    patronNoticePolicies = await this.server.createList('patronNoticePolicy', 3);

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
      expect(circulationRules.editor.value).to.be.equal(
        `m book: l ${toLowercaseReplaceAllSpaces(loanPolicies[0].name)} `
      );
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
      expect(circulationRules.editor.value).to.be.equal(
        `fallback-policy: l ${toLowercaseReplaceAllSpaces(loanPolicies[0].name)} `
      );
    });
  });

  describe('saving circulation rules', () => {
    let savedRules;
    let lPolicy;
    let rPolicy;
    let nPolicy;

    beforeEach(async function () {
      lPolicy = loanPolicies[0];
      rPolicy = requestPolicies[0];
      nPolicy = patronNoticePolicies[0];

      const lName = toLowercaseReplaceAllSpaces(lPolicy.name);
      const rName = toLowercaseReplaceAllSpaces(rPolicy.name);
      const nName = toLowercaseReplaceAllSpaces(nPolicy.name);

      this.server.put('/circulation/rules', (_, request) => {
        const params = JSON.parse(request.requestBody);
        savedRules = params.rulesAsText;
        return params;
      });

      await circulationRules.editor.setValue(`m book dvd: l ${lName} r ${rName} n ${nName}`);
      await circulationRules.clickSaveRulesBtn();
    });

    it('should choose loan policy as a fallback', () => {
      expect(savedRules).to.be.equal(`m 1a54b431-2e4f-452d-9cae-9cee66c9a892 5ee11d91-f7e8-481d-b079-65d708582ccc: l ${lPolicy.id} r ${rPolicy.id} n ${nPolicy.id}`);
    });
  });
});
