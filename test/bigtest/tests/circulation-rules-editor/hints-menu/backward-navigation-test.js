import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import circulationRules from '../../../interactors/circulation-rules-editor/pane';
import replacer from '../../../../../src/settings/utils/with-dash-replacer';
import {
  showHintsWithAttachedCustomKeysHandlers,
  removeDisplayedHints,
} from '../utils';

describe('Circulation rules editor -> hints menu: backward navigation between multiple sections ', () => {
  setupApplication();

  let institutions;
  let campuses1;
  let campuses2;

  beforeEach(async function () {
    institutions = await this.server.createList('institution', 30);
    campuses1 = await this.server.createList('campus', 4, { institutionId: institutions[0].id });
    campuses2 = await this.server.createList('campus', 1, { institutionId: institutions[1].id });

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  describe('navigating between sections', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'b ');
    });

    describe('pressing Backspace button', () => {
      describe('with reset to previous section behaviour', () => {
        beforeEach(async () => {
          // select first institution
          await circulationRules.editor.hints.clickOnItem(0);

          // undo institution selection
          await circulationRules.editor.pressBackspace();

          // select first institution
          await circulationRules.editor.hints.clickOnItem(0);

          // select first campus
          await circulationRules.editor.hints.clickOnItem(0, 1);
        });

        it('should insert the right campus code', () => {
          const code = `${replacer(institutions[0].code)}>${replacer(campuses1[0].code)}`;

          expect(circulationRules.editor.value).to.equal(`b ${code} `);
        });
      });

      describe('with normal behaviour', () => {
        beforeEach(async () => {
          await circulationRules.editor.pressBackspace();
        });

        it('should remove characters in editor', () => {
          expect(circulationRules.editor.value).to.equal('b');
        });
      });
    });

    describe('selection hint items with a mouse button', () => {
      describe('clicking on different hint items', () => {
        beforeEach(async () => {
          // select first institution
          await circulationRules.editor.hints.clickOnItem(0);

          // select second institution
          await circulationRules.editor.hints.clickOnItem(1);

          // select first campus in second institution
          await circulationRules.editor.hints.clickOnItem(0, 1);
        });

        it('should insert the right campus code', () => {
          const code = `${replacer(institutions[1].code)}>${replacer(campuses2[0].code)}`;

          expect(circulationRules.editor.value).to.equal(`b ${code} `);
        });
      });

      describe('clicking on the same hint item', () => {
        beforeEach(async () => {
          // select second institution
          await circulationRules.editor.hints.clickOnItem(1);

          // select the same institution (the item still should be selected)
          await circulationRules.editor.hints.clickOnItem(1);

          // select first campus in second institution
          await circulationRules.editor.hints.clickOnItem(0, 1);
        });

        it('should insert the right campus code', () => {
          const code = `${replacer(institutions[1].code)}>${replacer(campuses2[0].code)}`;

          expect(circulationRules.editor.value).to.equal(`b ${code} `);
        });
      });
    });
  });
});
