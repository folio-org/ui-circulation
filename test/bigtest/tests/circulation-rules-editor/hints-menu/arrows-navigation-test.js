import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import circulationRules from '../../../interactors/circulation-rules-editor/pane';
import { removeDisplayedHints } from '../utils';

describe.skip('Circulation rules editor -> hints menu: arrows keys navigation', () => {
  setupApplication();

  beforeEach(async function () {
    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  describe('focusing the editor', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
    });

    it('should open hints menu', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    describe('pressing down arrow key', () => {
      beforeEach(async () => {
        await circulationRules.editor.pressArrowDown();
      });

      it('should make the first item selected', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });

      describe('pressing up arrow key', () => {
        beforeEach(async () => {
          await circulationRules.editor.pressArrowUp();
        });

        it('should make the first item active', () => {
          expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
        });
      });

      describe('moving selection to the last item', () => {
        beforeEach(async () => {
          const hintsCount = circulationRules.editor.hints.sections(0).itemsCount;
          circulationRules.editor.changeActiveItem(hintsCount - 1);
        });

        it('should make it active', () => {
          expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
        });

        describe('pressing down arrow key', () => {
          beforeEach(async () => {
            await circulationRules.editor.pressArrowDown();
          });

          it('should make the first item active', () => {
            expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
          });

          describe('pressing up arrow key', () => {
            beforeEach(async () => {
              await circulationRules.editor.pressArrowUp();
            });

            it('should make the last item active', () => {
              expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
            });
          });
        });
      });
    });
  });
});
