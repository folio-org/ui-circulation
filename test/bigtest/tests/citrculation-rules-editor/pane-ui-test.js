import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { kebabCase } from 'lodash';
import { Response } from '@bigtest/mirage';

import setupApplication from '../../helpers/setup-application';
import circulationRules from '../../interactors/circulation-rules-editor/pane';
import {
  showHintsWithAttachedCustomKeysHandlers,
  removeDisplayedHints,
} from './utils';

describe('Circulation rules editor: pane UI', () => {
  setupApplication();

  let loanPolicies;
  let requestPolicies;
  let patronNoticePolicies;
  let overdueFinePolicy;

  beforeEach(async function () {
    this.server.get('/circulation/rules', {
      'id' : '4c70f818-2edc-4cf8-aa27-16c14c5c7b58',
      'rulesAsText': ''
    });

    loanPolicies = await this.server.createList('loanPolicy', 3);
    requestPolicies = await this.server.createList('requestPolicy', 3);
    patronNoticePolicies = await this.server.createList('patronNoticePolicy', 3);
    overdueFinePolicy = await this.server.createList('overdueFinePolicy', 3);

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  it('should have rules form', () => {
    expect(circulationRules.formPresent).to.be.true;
  });

  it('should have rules editor', () => {
    expect(circulationRules.editorPresent).to.be.true;
  });

  it('should have disabled save button when there is no changes', () => {
    expect(circulationRules.isSaveButtonDisabled).to.be.true;
  });


  describe('rules filtering', () => {
    beforeEach(async () => {
      await circulationRules.filter('term');
    });

    it('should not break the editor', () => {
      expect(circulationRules.editorPresent).to.be.true;
    });
  });

  describe('pressing Tab without selected hints', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
      await circulationRules.editor.pressTab();
    });

    it('should a add tab symbol', () => {
      expect(circulationRules.editor.value).to.equal('\t');
    });
  });

  describe('pressing Enter button without selected hints', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
      await circulationRules.editor.pressEnter();
    });

    it('should add a new line symbol', () => {
      expect(circulationRules.editor.value).to.equal('\n');
    });
  });

  describe('inserting circulation rule into focused editor', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'm book: l example-loan-policy');
    });

    it('should update the editor value', () => {
      expect(circulationRules.editor.value).to.equal('m book: l example-loan-policy');
    });

    it('should enable save button', () => {
      expect(circulationRules.isSaveButtonDisabled).to.be.false;
    });
  });

  describe('saving circulation rules', () => {
    let savedRules;
    let lPolicy;
    let rPolicy;
    let nPolicy;
    let oPolicy;
    let lName;
    let rName;
    let nName;
    let oName;

    beforeEach(async function () {
      lPolicy = loanPolicies[0];
      rPolicy = requestPolicies[0];
      nPolicy = patronNoticePolicies[0];
      oPolicy = overdueFinePolicy[0];

      lName = kebabCase(lPolicy.name);
      rName = kebabCase(rPolicy.name);
      nName = kebabCase(nPolicy.name);
      oName = kebabCase(oPolicy.name);

      this.server.put('/circulation/rules', (_, request) => {
        const params = JSON.parse(request.requestBody);
        savedRules = params.rulesAsText;

        return params;
      });

      await circulationRules.editor.setValue(`m book dvd: l ${lName} r ${rName} n ${nName} o ${oName}`);
      await circulationRules.clickSaveRulesBtn();
    });

    it('should choose loan policy as a fallback', () => {
      expect(savedRules).to.equal(`m 1a54b431-2e4f-452d-9cae-9cee66c9a892 5ee11d91-f7e8-481d-b079-65d708582ccc: l ${lPolicy.id} r ${rPolicy.id} n ${nPolicy.id} o ${oPolicy.id}`);
    });

    describe('changing circulation rules', () => {
      beforeEach(async function () {
        await circulationRules.editor.setValue(`\nm book text: l ${lName} r ${rName} n ${nName}`, { append: true });
      });

      it('should enable save button', () => {
        expect(circulationRules.isSaveButtonDisabled).to.be.false;
      });

      describe('clicking save button', () => {
        beforeEach(async function () {
          await circulationRules.clickSaveRulesBtn();
        });

        it('should disable save button upon successful save', () => {
          expect(circulationRules.isSaveButtonDisabled).to.be.true;
        });
      });
    });
  });

  describe('saving invalid circulation rules', () => {
    const errorMessage = 'mismatched input \' \' expecting {\'priority\', NEWLINE}';

    beforeEach(async function () {
      this.server.put('/circulation/rules', () => {
        return new Response(422, {}, {
          'message' : errorMessage,
          'line' : 1,
          'column' : 1,
        });
      });

      await circulationRules.editor.setValue(' ');
      await circulationRules.clickSaveRulesBtn();
    });

    it('should display formatted error message', () => {
      expect(circulationRules.editor.errorMessage.isPresent).to.be.true;
      expect(circulationRules.editor.errorMessage.text).to.equal(errorMessage);
    });
  });
});
