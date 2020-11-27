import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { truncate } from 'lodash';

import setupApplication from '../../../helpers/setup-application';
import circulationRules from '../../../interactors/circulation-rules-editor/pane';
import replacer from '../../../../../src/settings/utils/with-dash-replacer';
import {
  showHintsWithAttachedCustomKeysHandlers,
  removeDisplayedHints,
} from '../utils';

const getEditorHintSection = sectionIndex => circulationRules.editor.hints.sections(sectionIndex);

describe('Circulation rules editor: criteria hints', () => {
  setupApplication();

  let institutions;
  let campuses1;
  let campuses2;
  let libraries1;
  let libraries2;
  let locations;

  const shortInstitutionCode = 'INST';
  const longInstitutionCode = '/TESTCODE TESTCODE TESTCODE TESTCODE';
  const truncatedInstitutionCode = 'TESTCODE-TESTCODE...';
  const institutionsAmount = 30;
  const campusesAmount = 4;
  const librariesAmount = 3;
  const locationsAmount = 6;
  const truncateOptions = {
    length: 20,
    omission: '...',
  };

  beforeEach(async function () {
    const institutionsWithShortCode1 = this.server.createList('institution', 1, { code: `${shortInstitutionCode}1` });
    const institutionsWithShortCode2 = this.server.createList('institution', 1, { code: `${shortInstitutionCode}2` });
    institutions = await this.server.createList('institution', institutionsAmount - 2, { code: longInstitutionCode });
    institutions.unshift(...institutionsWithShortCode1, ...institutionsWithShortCode2);
    campuses1 = await this.server.createList('campus', campusesAmount, { institutionId: institutions[0].id, code: '|campCode >|' });
    campuses2 = await this.server.createList('campus', 1, { institutionId: institutions[1].id, code: 'campCode2' });
    libraries1 = await this.server.createList('library', librariesAmount, { campusId: campuses1[0].id, code: '|libCode *|libCode *' });
    await this.server.createList('library', 1, { campusId: campuses2[0].id, code: 'libCode2' });
    libraries2 = await this.server.createList('library', librariesAmount, { campusId: campuses1[1].id });
    locations = await this.server.createList('location', locationsAmount - 1, { libraryId: libraries1[0].id, code: '=locateCode|', name: 'A-location' });
    const filterTestLocation = this.server.createList('location', 1, { libraryId: libraries1[0].id, code: 'testFilterItemCode', name: 'testFilterItemName' });
    locations.push(...filterTestLocation);

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  describe('choosing non locating criteria type - material type', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'm ');
    });

    it('should display material types hints list', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    it('should not display header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.false;
    });

    it('should display only one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(1);
    });

    it('should not display subheader', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.isPresent).to.be.false;
    });

    it('should have the section which is non scrollable by default', () => {
      expect(circulationRules.editor.hints.sections(0).isScrollable()).to.be.false;
    });
  });

  describe('choosing locating criteria type - institution', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'a ');
    });

    it('should display institutions codes hints list', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Select institution');
    });

    it('should display one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(1);
    });

    it('should display hints with correct subheader', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.equal('Institution');
    });

    it('should truncate long locations codes', () => {
      expect(circulationRules.editor.hints.sections(0).items(2).text).to.equal(truncatedInstitutionCode);
    });

    describe('picking an institution with long name', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pickHint(0);
      });

      it('should insert full institution code', () => {
        expect(circulationRules.editor.value).to.equal(
          `a ${institutions[0].code} `
        );
      });
    });

    describe('clicking on header', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.hints.header.click();
      });

      it('should not change hints state', () => {
        expect(circulationRules.editor.hints.hasItems).to.be.true;
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });

    describe('clicking on subheader', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.hints.sections(0).subheader.click();
      });

      it('should not change hints state', () => {
        expect(circulationRules.editor.hints.hasItems).to.be.true;
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });
  });

  describe('choosing locating criteria type - campus', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'b');
    });

    it('should display campus codes hints list', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Select campus');
    });

    it('should display two hints sections', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(2);
    });

    it('should display hints with correct subheaders', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.equal('Institution');
      expect(circulationRules.editor.hints.sections(1).subheader.text).to.equal('Campus');
    });

    it('should display the first section filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.equal(institutionsAmount);
    });

    it('should display the second section filled by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.equal(0);
    });

    describe('picking an institution that doesn\'t contains campuses and press arrow up', () => {
      beforeEach(async () => {
        await circulationRules.editor.pressArrowUp();
        await circulationRules.editor.pressEnter();
        await circulationRules.editor.pressArrowDown();
      });

      it('should interact with the first section and select the first item', () => {
        expect(getEditorHintSection(0).isFirstItemActive).to.equal(true);
      });
    });

    describe('picking an institution that contains campuses', () => {
      beforeEach(async () => {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('should display the second section filled with campuses codes', () => {
        expect(circulationRules.editor.hints.sections(1).items().length).to.equal(campusesAmount);
      });

      it('should not change the editor value', () => {
        expect(circulationRules.editor.value).to.equal('b');
      });

      it('should display sections without the special value ANY', () => {
        expect(circulationRules.editor.hints.sections(0).items(0).text).not.to.equal('<ANY>');
        expect(circulationRules.editor.hints.sections(1).items(0).text).not.to.equal('<ANY>');
      });

      it('should have the first item selected in the first section', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });

      it('should have the first item selected by default in the second section', () => {
        expect(circulationRules.editor.hints.sections(1).isFirstItemActive).to.be.true;
      });

      it('should have formatted and truncated values in the second section', () => {
        const fullValue = `${replacer(campuses1[0].code)} (${institutions[0].code})`;
        const truncatedValue = truncate(fullValue, truncateOptions);

        expect(circulationRules.editor.hints.sections(1).items(1).text).to.equal(truncatedValue);
      });

      describe('moving selection in the second section to the last item', () => {
        beforeEach(async () => {
          await circulationRules.editor.changeActiveItem(campusesAmount - 1);
        });

        it('should make the last item of the second section selected', () => {
          expect(circulationRules.editor.hints.sections(1).isLastItemActive).to.be.true;
        });

        it('should not change the selection of the first section', () => {
          expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
        });

        describe('selecting active item in the second section', () => {
          beforeEach(async () => {
            await circulationRules.editor.hints.clickOnItem(campusesAmount - 1, 1);
            await getEditorHintSection(1).completionButton.click();
          });

          it('should add full hierarchical path with campus code to the editor', () => {
            const code = `${replacer(institutions[0].code)}>${replacer(campuses1[campusesAmount - 1].code)}`;

            expect(circulationRules.editor.value).to.equal(`b ${code} `);
          });
        });
      });
    });
  });

  describe('choosing locating criteria type - library', () => {
    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 'c');
    });

    it('should display library codes hints list', () => {
      expect(circulationRules.editor.hints.hasItems).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Select library');
    });

    it('should display three hints sections', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(3);
    });

    it('should display hints with correct subheaders', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.equal('Institution');
      expect(circulationRules.editor.hints.sections(1).subheader.text).to.equal('Campus');
      expect(circulationRules.editor.hints.sections(2).subheader.text).to.equal('Library');
    });

    it('should display the first section filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.equal(institutionsAmount);
    });

    it('should have other sections empty by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.equal(0);
      expect(circulationRules.editor.hints.sections(2).items().length).to.equal(0);
    });

    describe('clicking on the first institution', () => {
      beforeEach(async () => {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('should make the second section (campus) filled', () => {
        expect(circulationRules.editor.hints.sections(1).items().length).to.equal(campusesAmount + 1);
      });

      it('should affect third section (library) which should be empty', () => {
        expect(circulationRules.editor.hints.sections(2).items().length).to.equal(0);
      });

      describe('clicking on the ANY item', () => {
        beforeEach(async () => {
          await circulationRules.editor.hints.clickOnItem(0, 1);
        });

        it('should make the third section (library) filled by libraries from all added campsuses', () => {
          expect(circulationRules.editor.hints.sections(2).items().length).to.equal(libraries1.length + libraries2.length);
        });
      });

      describe('clicking on the first campus', () => {
        beforeEach(async () => {
          await circulationRules.editor.hints.clickOnItem(1, 1);
        });

        it('should display the special value ANY only in the second section', () => {
          expect(circulationRules.editor.hints.sections(0).items(0).text).not.to.equal('<ANY>');
          expect(circulationRules.editor.hints.sections(1).items(0).text).to.equal('<ANY>');
          expect(circulationRules.editor.hints.sections(2).items(0).text).not.to.equal('<ANY>');
        });

        it('should make the third section (library) filled', () => {
          expect(circulationRules.editor.hints.sections(2).items().length).to.equal(librariesAmount);
        });

        it('should make the first item selected by default in the third section', () => {
          expect(circulationRules.editor.hints.sections(2).isFirstItemActive).to.be.true;
        });

        it('should have formatted and truncated values in the third section', () => {
          const fullValue = `${replacer(libraries1[0].code)} (${institutions[0].code}-${replacer(campuses1[0].code)})`;
          const truncatedValue = truncate(fullValue, truncateOptions);

          expect(circulationRules.editor.hints.sections(2).items(1).text).to.equal(truncatedValue);
        });

        describe('clicking on the first library', () => {
          beforeEach(async () => {
            await circulationRules.editor.hints.clickOnItem(0, 2);
            await getEditorHintSection(2).completionButton.click();
          });

          it('should add full hierarchial path with library code to the editor value', () => {
            const code = `${replacer(institutions[0].code)}>${replacer(campuses1[0].code)}>${replacer(libraries1[0].code)}`;

            expect(circulationRules.editor.value).to.equal(`c ${code} `);
          });
        });
      });
    });
  });

  describe('choosing locating criteria type - location', () => {
    const editorHints = circulationRules.editor.hints;

    beforeEach(async () => {
      await showHintsWithAttachedCustomKeysHandlers(circulationRules.editor, 's');
    });

    it('should display location codes hints list ', () => {
      expect(editorHints.hasItems).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(editorHints.header.isPresent).to.be.true;
      expect(editorHints.header.text).to.equal('Select location');
    });

    it('should display three hints sections', () => {
      expect(editorHints.sectionsCount).to.equal(4);
    });

    it('should display hints with correct subheaders', () => {
      expect(getEditorHintSection(0).subheader.text).to.equal('Institution');
      expect(getEditorHintSection(1).subheader.text).to.equal('Campus');
      expect(getEditorHintSection(2).subheader.text).to.equal('Library');
      expect(getEditorHintSection(3).subheader.text).to.equal('Location');
    });

    it('should display the first section filled by default', () => {
      expect(getEditorHintSection(0).items().length).to.equal(institutionsAmount);
    });

    it('should have other sections empty by default', () => {
      expect(getEditorHintSection(1).items().length).to.equal(0);
      expect(getEditorHintSection(2).items().length).to.equal(0);
      expect(getEditorHintSection(3).items().length).to.equal(0);
    });

    it('should not contain completion buttons by default in the first three sections', () => {
      expect(getEditorHintSection(0).completionButton.isPresent).to.equal(false);
      expect(getEditorHintSection(1).completionButton.isPresent).to.equal(false);
      expect(getEditorHintSection(2).completionButton.isPresent).to.equal(false);
    });

    it('should contain hidden completion button by default in the fourth section', () => {
      expect(getEditorHintSection(3).completionButton.isPresent).to.equal(true);
      expect(getEditorHintSection(3).isCompletionButtonHidden).to.equal(true);
    });

    describe('filling the filter field and moving the fourth section ', () => {
      beforeEach(async () => {
        await getEditorHintSection(3).filterInput.focus();
        await getEditorHintSection(3).filterInput.fill('ItemCode');
        await editorHints.clickOnItem(0);
        await editorHints.clickOnItem(1, 1);
        await editorHints.clickOnItem(1, 2);
      });

      it('should contain only one location', () => {
        expect(getEditorHintSection(3).items(0).text.includes('ItemCode')).to.be.true;
        expect(getEditorHintSection(3).itemsCount).to.equal(1);
      });

      describe('focusing the rules filter field', () => {
        beforeEach(async () => {
          await circulationRules.filterInputField.focus();
        });

        it('should hide hints menu', () => {
          expect(editorHints.hasItems).to.equal(false);
        });
      });

      describe('clicking on hints menu header', () => {
        beforeEach(async () => {
          await circulationRules.editor.hints.header.click();
        });

        it('should not hide hints menu', () => {
          expect(editorHints.hasItems).to.equal(true);
        });
      });
    });

    describe('clicking on the first institution', () => {
      beforeEach(async () => {
        await editorHints.clickOnItem(0);
      });

      it('should make the second section (campus) filled', () => {
        expect(getEditorHintSection(1).items().length).to.equal(campusesAmount + 1);
      });

      describe('clicking on the first campus', () => {
        beforeEach(async () => {
          await editorHints.clickOnItem(1, 1);
        });

        it('should make the third section (library) filled', () => {
          expect(getEditorHintSection(2).items().length).to.equal(librariesAmount + 1);
        });

        describe('clicking on the first library', () => {
          beforeEach(async () => {
            await editorHints.clickOnItem(1, 2);
          });

          it('should not highlight anything if the filter value is empty', () => {
            expect(getEditorHintSection(3).hasHighlightedItems).to.be.false;
          });

          it('should make the fourth section (location) filled', () => {
            expect(getEditorHintSection(3).items().length).to.equal(locationsAmount);
          });

          it('should display sections with the special value ANY in the second and the third sections', () => {
            expect(getEditorHintSection(0).items(0).text).not.to.equal('<ANY>');
            expect(getEditorHintSection(1).items(0).text).to.equal('<ANY>');
            expect(getEditorHintSection(2).items(0).text).to.equal('<ANY>');
            expect(getEditorHintSection(3).items(0).text).not.to.equal('<ANY>');
          });

          it('should have the first item selected by default in the fourth section', () => {
            expect(getEditorHintSection(3).isFirstItemActive).to.be.true;
          });

          it('should contain and show the completion button only in the fourth section', () => {
            expect(getEditorHintSection(0).completionButton.isPresent).to.equal(false);
            expect(getEditorHintSection(1).completionButton.isPresent).to.equal(false);
            expect(getEditorHintSection(2).completionButton.isPresent).to.equal(false);
            expect(getEditorHintSection(3).completionButton.isPresent).to.equal(true);
            expect(getEditorHintSection(3).isCompletionButtonHidden).to.equal(false);
          });

          it('should contain items filter only in the fourth section', () => {
            expect(getEditorHintSection(0).filterInput.isPresent).to.equal(false);
            expect(getEditorHintSection(1).filterInput.isPresent).to.equal(false);
            expect(getEditorHintSection(2).filterInput.isPresent).to.equal(false);
            expect(getEditorHintSection(3).filterInput.isPresent).to.equal(true);
          });

          it('should disable the completion button by default', () => {
            expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(true);
          });

          it('should contain unchecked checkboxes only in the fourth section', () => {
            expect(getEditorHintSection(0).hasCheckBoxes).to.equal(false);
            expect(getEditorHintSection(1).hasCheckBoxes).to.equal(false);
            expect(getEditorHintSection(2).hasCheckBoxes).to.equal(false);
            expect(getEditorHintSection(3).hasCheckBoxes).to.equal(true);
            expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 2)).to.equal(false);
            expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 1)).to.equal(false);
          });

          it('should formatted and not truncated values in the fourth section', () => {
            const formattedValue = `${replacer(locations[0].code)} (${locations[0].name})`;

            expect(getEditorHintSection(3).items(1).text).to.equal(formattedValue);
          });

          describe('focusing the filter input field', () => {
            beforeEach(async () => {
              await getEditorHintSection(3).filterInput.focus();
            });

            it('should not close a hint if focus moved to the filter input', () => {
              expect(editorHints.isPresent).to.equal(true);
            });

            describe('typing a text, that is not presented in items, to the filter input field', () => {
              beforeEach(async () => {
                await getEditorHintSection(3).filterInput.fill(Math.random());
              });

              it('should not contain items', () => {
                expect(getEditorHintSection(3).itemsCount).to.equal(0);
              });
            });

            describe('typing a part of code to the filter input', () => {
              beforeEach(async () => {
                await getEditorHintSection(3).filterInput.fill('ItemCode');
              });

              it('should contain only one location', () => {
                expect(getEditorHintSection(3).items(0).text.includes('ItemCode')).to.be.true;
                expect(getEditorHintSection(3).itemsCount).to.equal(1);
              });

              it('should highlight filter query', () => {
                expect(getEditorHintSection(3).hasHighlightedItems).to.be.true;
                expect(getEditorHintSection(3).isHighlightedFilterValue(0, 'ItemCode')).to.be.true;
              });

              describe('clearing locations filter value ', () => {
                beforeEach(async () => {
                  await getEditorHintSection(3).filterInput.fill('');
                });

                it('should display all locations', () => {
                  expect(getEditorHintSection(3).itemsCount).to.equal(locationsAmount);
                });

                it('should not contain highlighted items', () => {
                  expect(getEditorHintSection(3).hasHighlightedItems).to.be.false;
                });
              });
            });

            describe('typing a part of name to the filter input', () => {
              beforeEach(async () => {
                await getEditorHintSection(3).filterInput.fill('ItemName');
              });

              it('should contain only one location', () => {
                expect(getEditorHintSection(3).items(0).text.includes('ItemName')).to.be.true;
                expect(getEditorHintSection(3).itemsCount).to.equal(1);
              });

              it('should highlight filter value', () => {
                expect(getEditorHintSection(3).hasHighlightedItems).to.be.true;
                expect(getEditorHintSection(3).isHighlightedFilterValue(0, 'ItemName')).to.be.true;
              });
            });
          });

          describe('pressing Enter on the last location', () => {
            beforeEach(async () => {
              await circulationRules.editor.pressArrowUp();
              await circulationRules.editor.pressEnter();
            });

            it('should check the last item in the fourth section', () => {
              expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 1)).to.equal(true);
            });

            describe('pressing Enter on the last location', () => {
              beforeEach(async () => {
                await circulationRules.editor.pressEnter();
              });

              it('should uncheck the last item in the fourth section', () => {
                expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 1)).to.equal(false);
              });

              it('should disable the completion button', () => {
                expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(true);
              });
            });
          });

          describe('clicking on the last two locations', () => {
            beforeEach(async () => {
              await editorHints.clickOnItem(locationsAmount - 2, 3);
              await editorHints.clickOnItem(locationsAmount - 1, 3);
            });

            it('should check the last two items in the fourth section', () => {
              expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 2)).to.equal(true);
              expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 1)).to.equal(true);
            });

            it('should enable the completion button', () => {
              expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(false);
            });

            it('should not add any codes to input field on click on location items', () => {
              expect(circulationRules.editor.value).to.equal('s');
            });

            describe('clicking on the completion button', () => {
              beforeEach(async () => {
                await getEditorHintSection(3).completionButton.click();
              });

              it('should add the location codes of selected items to the editor', () => {
                const hierarchicalPath = `${replacer(institutions[0].code)}>${replacer(campuses1[0].code)}>${replacer(libraries1[0].code)}`;
                const locationCode1 = `${hierarchicalPath}>${replacer(locations[locationsAmount - 2].code)}`;
                const locationCode2 = `${hierarchicalPath}>${replacer(locations[locationsAmount - 1].code)}`;

                expect(circulationRules.editor.value).to.equal(`s ${locationCode1} ${locationCode2} `);
              });
            });

            describe('pressing Backspace button', () => {
              beforeEach(async () => {
                await circulationRules.editor.pressBackspace();
              });

              it('should hide and disable the completion button in the fourth section', () => {
                expect(getEditorHintSection(3).isCompletionButtonHidden).to.equal(true);
                expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(true);
              });
            });

            describe('changing the selected institution to clear the location list', () => {
              beforeEach(async () => {
                await editorHints.clickOnItem(1);
              });

              it('should hide and disable the completion button in the fourth section', () => {
                expect(getEditorHintSection(3).isCompletionButtonHidden).to.equal(true);
                expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(true);
              });
            });

            describe('clicking on the last location', () => {
              beforeEach(async () => {
                await editorHints.clickOnItem(locationsAmount - 1, 3);
              });

              it('should uncheck the last item in the fourth section', () => {
                expect(getEditorHintSection(3).isCheckBoxChecked(locationsAmount - 1)).to.equal(false);
              });

              it('should not change the completion button state', () => {
                expect(getEditorHintSection(3).isCompletionButtonHidden).to.equal(false);
                expect(getEditorHintSection(3).isCompletionButtonDisabled).to.equal(false);
              });
            });
          });
        });
      });
    });
  });
});
