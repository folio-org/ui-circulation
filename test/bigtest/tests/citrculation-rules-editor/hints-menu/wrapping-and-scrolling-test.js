import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import circulationRules from '../../../interactors/circulation-rules-editor/pane';
import {
  showHintsWithAttachedCustomKeysHandlers,
  removeDisplayedHints,
} from '../utils';

describe('Circulation rules editor -> hints menu: wrapping and scrolling', () => {
  setupApplication();

  const institutionsAmount = 30;

  beforeEach(async function () {
    await this.server.createList('institution', institutionsAmount);

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  describe('choosing criteria type with many added items', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'a ');
    });

    it('should have the section scrollable as it has many items', () => {
      expect(circulationRules.editor.hints.sections(0).isScrollable()).to.be.true;
    });

    describe('activating the first list item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
      });

      it('should make the first item active', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });
    });

    describe('selecting the last item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount - 4);
      });

      it('should scroll the container down to the item', () => {
        expect(circulationRules.editor.hints.sections(0).isScrolledToBottom(institutionsAmount - 4)).to.be.true;
      });

      describe('selecting the second item', () => {
        beforeEach(async () => {
          await circulationRules.editor.changeActiveItem(1);
        });

        it('should scroll the container to the second item', () => {
          expect(circulationRules.editor.hints.sections(0).isScrolledToTop(1)).to.be.true;
        });
      });
    });

    describe('activating item with index, that is greater than the list length, without wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount + 1);
      });

      it('should make the first item active', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });

    describe('activating item with index greater than the list length, with wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount + 1, true);
      });

      it('should make the last item active', () => {
        expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
      });
    });

    describe('activating item with negative index without wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(-1);
      });

      it('should make the last item active', () => {
        expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
      });
    });

    describe('activating item with negative index with wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(-1, true);
      });

      it('should make the first item active', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });
  });
});
