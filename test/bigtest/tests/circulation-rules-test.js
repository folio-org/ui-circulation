import {
  beforeEach,
  describe,
  it,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { truncate } from 'lodash';

import setupApplication from '../helpers/setup-application';
import circulationRules from '../interactors/circulation-rules';
import { toLowercaseReplaceAllSpaces } from '../helpers/messageConverters';
import replacer from '../../../src/settings/utils/with-dash-replacer';

const removeDisplayedHints = () => {
  const hints = document.getElementsByClassName('CodeMirror-hints');

  for (let i = 0; i < hints.length; i++) {
    hints[i].parentNode.removeChild(hints[i]);
  }
};

describe('CirculationRules', () => {
  setupApplication();

  let loanPolicies;
  let requestPolicies;
  let patronNoticePolicies;
  let institutions;
  let campuses;
  let libraries;
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
    this.server.get('/circulation/rules', {
      'id' : '4c70f818-2edc-4cf8-aa27-16c14c5c7b58',
      'rulesAsText': ''
    });
    loanPolicies = await this.server.createList('loanPolicy', 3);
    requestPolicies = await this.server.createList('requestPolicy', 3);
    patronNoticePolicies = await this.server.createList('patronNoticePolicy', 3);
    const institutionsWithShortCode = this.server.createList('institution', 1, { code: shortInstitutionCode });
    institutions = await this.server.createList('institution', institutionsAmount - 1, { code: longInstitutionCode });
    institutions.unshift(...institutionsWithShortCode);
    campuses = await this.server.createList('campus', campusesAmount, { institutionId: institutions[0].id, code: '|campCode >|' });
    libraries = await this.server.createList('library', librariesAmount, { campusId: campuses[0].id, code: '|libCode *|libCode *' });
    locations = await this.server.createList('location', locationsAmount, { libraryId: libraries[0].id, code: '=locateCode|', name: 'A-location' });

    return this.visit('/settings/circulation/rules', () => {
      expect(circulationRules.$root).to.exist;
    });
  });

  afterEach(() => {
    removeDisplayedHints();
  });

  it('has rules form', () => {
    expect(circulationRules.formPresent).to.be.true;
  });

  it('has rules editor', () => {
    expect(circulationRules.editorPresent).to.be.true;
  });

  it('is save button disabled without changes', () => {
    expect(circulationRules.isSaveButtonDisabled).to.be.true;
  });

  describe('filter rules', () => {
    beforeEach(async () => {
      await circulationRules.filter('term');
    });

    it('does not break the editor', () => {
      expect(circulationRules.editorPresent).to.be.true;
    });
  });

  describe('press Enter without selected hints', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
      await circulationRules.editor.pressEnter();
    });

    it('should add new line symbol', () => {
      expect(circulationRules.editor.value).to.equal('\n');
    });
  });

  describe('focus the editor', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
    });

    it('should open hints menu', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    describe('press down arrow key', () => {
      beforeEach(async () => {
        await circulationRules.editor.pressArrowDown();
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the first item should be selected', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });

      describe('press up arrow key', () => {
        beforeEach(async () => {
          await circulationRules.editor.pressArrowUp();
        });

        it('should contain active items', () => {
          expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
        });
      });

      describe('move selection to the last item', () => {
        beforeEach(async () => {
          const hintsCount = circulationRules.editor.hints.sections(0).itemsCount;
          circulationRules.editor.changeActiveItem(hintsCount - 1);
        });

        it('the last item should be active', () => {
          expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
        });

        describe('press down arrow key', () => {
          beforeEach(async () => {
            await circulationRules.editor.pressArrowDown();
          });

          it('the first item should be active', () => {
            expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
          });

          describe('press up arrow key', () => {
            beforeEach(async () => {
              await circulationRules.editor.pressArrowUp();
            });

            it('the last item should be active', () => {
              expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
            });
          });
        });
      });
    });
  });

  describe('press Tab without selected hints', () => {
    beforeEach(async () => {
      await circulationRules.editor.textArea.focus();
      await circulationRules.editor.pressTab();
    });

    it('should add tab symbol', () => {
      expect(circulationRules.editor.value).to.equal('\t');
    });
  });

  describe('entering circulation rule into editor', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('m book: l example-loan-policy');
    });

    it('should set new circulation rule', () => {
      expect(circulationRules.editor.value).to.equal('m book: l example-loan-policy');
    });

    it('is save button enabled after changes', () => {
      expect(circulationRules.isSaveButtonDisabled).to.be.false;
    });
  });

  describe('entering item type', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('m book: ');
    });

    it('should display hints menu', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display only one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(1);
    });

    it('should display policy types menu', () => {
      expect(circulationRules.editor.hints.sections(0).items(0).text).to.equal('Loan policies');
    });

    it('should display the correct header for the policy types list', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Circulation policies');
    });

    it('should not display the subheader for the policy types list', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.isPresent).to.be.false;
    });

    it('should not contain active items in hints menu by default', () => {
      expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.false;
    });
  });

  describe('choosing non locating type - material type', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('m ');
    });

    it('should display hints with list of material types', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
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

    it('the section should not be scrollable by default', () => {
      expect(circulationRules.editor.hints.sections(0).isScrollable()).to.be.false;
    });
  });

  describe('choosing type locating type - institution', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('a ');
    });

    it('should display hints with list of institutions codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
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
      expect(circulationRules.editor.hints.sections(0).items(1).text).to.equal(truncatedInstitutionCode);
    });

    it('the section should be scrollable where there are a lot of items', () => {
      expect(circulationRules.editor.hints.sections(0).isScrollable()).to.be.true;
    });

    describe('active the first list item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });
    });

    describe('select the last item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount - 4);
      });

      it('the container should be scrolled down to the item', () => {
        expect(circulationRules.editor.hints.sections(0).isScrolledToBottom(institutionsAmount - 4)).to.be.true;
      });

      describe('select the second item', () => {
        beforeEach(async () => {
          await circulationRules.editor.changeActiveItem(1);
        });

        it('the container should be scrolled top to the item', () => {
          expect(circulationRules.editor.hints.sections(0).isScrolledToTop(1)).to.be.true;
        });
      });
    });

    describe('active item with index, that is greater than the list length, without wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount + 1);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the fist item should be active', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });

    describe('active item with index, that is greater than the list length, with wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(institutionsAmount + 1, true);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the last item should be active', () => {
        expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
      });
    });

    describe('active item with negative index without wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(-1);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the last item should be active', () => {
        expect(circulationRules.editor.hints.sections(0).isLastItemActive).to.be.true;
      });
    });

    describe('active item with negative index with wrapping avoiding', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(-1, true);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the first item should be active', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });

    describe('pick an institution with long name', () => {
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

    describe('click on header', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.hints.header.click();
      });

      it('should not handle clicks on header', () => {
        expect(circulationRules.editor.hints.arePresent).to.be.true;
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });

    describe('click on subheader', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.hints.sections(0).subheader.click();
      });

      it('should not handle clicks on subheaders', () => {
        expect(circulationRules.editor.hints.arePresent).to.be.true;
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });
  });

  describe('choosing type locating type - campus', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('b ');
    });

    it('should display hints with list to select campus codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.equal('Select campus');
    });

    it('should display 2 hints sections', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.equal(2);
    });

    it('should display hints with correct subheaders', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.equal('Institution');
      expect(circulationRules.editor.hints.sections(1).subheader.text).to.equal('Campus');
    });

    it('the first section should be filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.equal(institutionsAmount);
    });

    it('the second section should be empty by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.equal(0);
    });

    it('the first section should not contain a special value ANY', () => {
      expect(circulationRules.editor.hints.sections(0).items(0).text).to.equal(institutions[0].code);
    });

    describe('pick an institution that contains campuses', () => {
      beforeEach(async () => {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('the second section should be filled by campuses codes', () => {
        expect(circulationRules.editor.hints.sections(1).items().length).to.equal(campusesAmount + 1);
      });

      it('the editor value should not be changed', () => {
        expect(circulationRules.editor.value).to.equal('b ');
      });

      it('the second section should contain a special value ANY', () => {
        expect(circulationRules.editor.hints.sections(1).items(0).text).to.equal('<ANY>');
      });

      it('the first item of the second section should be selected by default', () => {
        expect(circulationRules.editor.hints.sections(1).isFirstItemActive).to.be.true;
      });

      it('the selected item of the first section should be highlighted', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });

      it('the values should be formatted and truncated', () => {
        const fullValue = `${replacer(campuses[0].code)} (${institutions[0].code})`;
        const truncatedValue = truncate(fullValue, truncateOptions);

        expect(circulationRules.editor.hints.sections(1).items(1).text).to.equal(truncatedValue);
      });

      describe('move selection in the second section to the last item', () => {
        beforeEach(async () => {
          await circulationRules.editor.changeActiveItem(campusesAmount);
        });

        it('the last item of the second section should be selected', () => {
          expect(circulationRules.editor.hints.sections(1).isLastItemActive).to.be.true;
        });

        it('the selection of the first section should not be changed', () => {
          expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
        });

        describe('select selected item in the second section', () => {
          beforeEach(async () => {
            await circulationRules.editor.pickHint(campusesAmount);
          });

          it('the campus code should be added to the editor value', () => {
            expect(circulationRules.editor.value).to.equal(`b ${replacer(campuses[campusesAmount - 1].code)} `);
          });
        });
      });
    });
  });

  describe('choosing type locating type - library', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('c ');
    });

    it('should display hints with list to select library codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
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

    it('the first section should be filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.equal(institutionsAmount);
    });

    it('the second and the third sections should be empty by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.equal(0);
      expect(circulationRules.editor.hints.sections(2).items().length).to.equal(0);
    });

    describe('click on the first institution', () => {
      beforeEach(async () => {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('the second section (campus) section should be filled', () => {
        expect(circulationRules.editor.hints.sections(1).items().length).to.equal(campusesAmount + 1);
      });

      it('the third section (library) should be empty', () => {
        expect(circulationRules.editor.hints.sections(2).items().length).to.equal(0);
      });

      describe('click on the first campus', () => {
        beforeEach(async () => {
          await circulationRules.editor.hints.clickOnItem(1, 1);
        });

        it('the third section (library) should be filled', () => {
          expect(circulationRules.editor.hints.sections(2).items().length).to.equal(librariesAmount + 1);
        });

        it('the first item of the third section should be selected by default', () => {
          expect(circulationRules.editor.hints.sections(2).isFirstItemActive).to.be.true;
        });

        it('the values should be formatted and truncated', () => {
          const fullValue = `${replacer(libraries[0].code)} (${institutions[0].code}-${replacer(campuses[0].code)})`;
          const truncatedValue = truncate(fullValue, truncateOptions);

          expect(circulationRules.editor.hints.sections(2).items(1).text).to.equal(truncatedValue);
        });

        describe('click on the first library', () => {
          beforeEach(async () => {
            await circulationRules.editor.hints.clickOnItem(1, 2);
          });

          it('the library code should be added to the editor value', () => {
            expect(circulationRules.editor.value).to.equal(`c ${replacer(libraries[0].code)} `);
          });
        });
      });
    });
  });

  describe('choosing type locating type - location', () => {
    const rulesEditor = circulationRules.editor;
    const editorHints = rulesEditor.hints;
    const getEditorHintSection = sectionIndex => editorHints.sections(sectionIndex);

    beforeEach(async () => {
      await rulesEditor.setValue('s ');
    });

    it('should display hints with list to select location codes', () => {
      expect(editorHints.arePresent).to.be.true;
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

    it('the first section should be filled by default', () => {
      expect(getEditorHintSection(0).items().length).to.equal(institutionsAmount);
    });

    it('other sections should be empty by default', () => {
      expect(getEditorHintSection(1).items().length).to.equal(0);
      expect(getEditorHintSection(2).items().length).to.equal(0);
      expect(getEditorHintSection(3).items().length).to.equal(0);
    });

    describe('click on the first institution', () => {
      beforeEach(async () => {
        await editorHints.clickOnItem(0);
      });

      it('the second section (campus) section should be filled', () => {
        expect(getEditorHintSection(1).items().length).to.equal(campusesAmount + 1);
      });

      describe('click on the first campus', () => {
        beforeEach(async () => {
          await editorHints.clickOnItem(1, 1);
        });

        it('the third section (library) section should be filled', () => {
          expect(getEditorHintSection(2).items().length).to.equal(librariesAmount + 1);
        });

        describe('click on the first library', () => {
          beforeEach(async () => {
            await editorHints.clickOnItem(1, 2);
          });

          it('the fourth section (location) should be filled', () => {
            expect(getEditorHintSection(3).items().length).to.equal(locationsAmount + 1);
          });

          it('the fourth section should contain a special value ANY', () => {
            expect(getEditorHintSection(3).items(0).text).to.equal('<ANY>');
          });

          it('the first item of the fourth section should be selected by default', () => {
            expect(getEditorHintSection(3).isFirstItemActive).to.be.true;
          });

          it('the values should be formatted and truncated', () => {
            const fullValue = `${replacer(locations[0].code)} (${locations[0].name})`;
            const truncatedValue = truncate(fullValue, truncateOptions);

            expect(getEditorHintSection(3).items(1).text).to.equal(truncatedValue);
          });

          describe('click on the first location', () => {
            beforeEach(async () => {
              await editorHints.clickOnItem(locationsAmount, 3);
            });

            it('the location code should be added to the editor value', () => {
              expect(rulesEditor.value).to.equal(`s ${replacer(locations[locationsAmount - 1].code)} `);
            });
          });
        });
      });
    });
  });

  describe('choosing policy type', () => {
    beforeEach(async () => {
      await circulationRules.editor.setValue('m book: ');
    });

    describe('press enter on the selected item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pressEnter();
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });

    describe('press tab on the selected item', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pressTab();
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });

    describe('pick loan policy type', () => {
      beforeEach(async () => {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pickHint(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.equal('m book: l ');
      });
    });

    describe('click on first item in policies list', () => {
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

    it('should choose loan policy', () => {
      expect(circulationRules.editor.value).to.equal(
        `m book: l ${toLowercaseReplaceAllSpaces(loanPolicies[0].name)} `
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

    it('should choose loan policy as a fallback', () => {
      expect(circulationRules.editor.value).to.equal(
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
      expect(savedRules).to.equal(`m 1a54b431-2e4f-452d-9cae-9cee66c9a892 5ee11d91-f7e8-481d-b079-65d708582ccc: l ${lPolicy.id} r ${rPolicy.id} n ${nPolicy.id}`);
    });
  });
});
