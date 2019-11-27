import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';
import {
  kebabCase,
} from 'lodash';

import setupApplication from '../../../helpers/setup-application';
import circulationRules from '../../../interactors/circulation-rules-editor/pane';
import {
  showHintsWithAttachedCustomKeysHandlers,
  removeDisplayedHints,
} from '../utils';

describe('Circulation rules editor: policies hints', () => {
  setupApplication();

  let loanPolicies;

  beforeEach(async function () {
    loanPolicies = await this.server.createList('loanPolicy', 3);

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  describe('entering criteria types', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'm book: ');
    });

    it('should display hints menu', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    it('should display only one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(1);
    });

    it('should display correct list of policies types', () => {
      expect(circulationRules.editor.hints.sections(0).items(0).text).to.equal('Loan policies');
      expect(circulationRules.editor.hints.sections(0).items(1).text).to.equal('Request policies');
      expect(circulationRules.editor.hints.sections(0).items(2).text).to.equal('Patron notice policies');
      expect(circulationRules.editor.hints.sections(0).items(3).text).to.equal('Overdue fine policies');
    });

    it('should display the correct header for the policy types hint menu', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Circulation policies');
    });

    it('should not display the subheader for the policy types list', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.isPresent).to.be.false;
    });

    it('should not contain active items in hints menu by default', () => {
      expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.false;
    });

    describe('pressing tab on the selected item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pressTab();
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });

    describe('picking loan policy type', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pickHint(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });

    describe('clicking on first item in policies list', () => {
      beforeEach(async () => {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });
  });

  describe('choosing loan policy', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('m book: ');

      // choose policy type
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);

      // choose loan policy
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);
    });

    it('should insert the correct policy name', () => {
      expect(circulationRules.editor.value).to.equal(
        `m book: l ${kebabCase(loanPolicies[0].name)} `
      );
    });
  });

  describe('choosing fallback policy', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('fallback-policy: ');

      // choose policy type
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);

      // choose loan policy
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);
    });

    it('should insert the correct loan policy name as a fallback', () => {
      expect(circulationRules.editor.value).to.equal(
        `fallback-policy: l ${kebabCase(loanPolicies[0].name)} `
      );
    });
  });
});
