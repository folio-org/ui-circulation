import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { truncate } from 'lodash';

import setupApplication from '../helpers/setup-application';
import circulationRules from '../interactors/circulation-rules';
import { toLowercaseReplaceAllSpaces } from '../helpers/messageConverters';

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

  const longInstitutionCode = 'TESTCODE-TESTCODE-TESTCODE-TESTCODE';
  const truncatedInstitutionCode = 'TESTCODE-TESTCODE...';
  const institutionsAmount = 20;
  const campusesAmount = 4;
  const truncateOptions = {
    length: 20,
    omission: '...',
  };

  beforeEach(async function () {
    loanPolicies = await this.server.createList('loanPolicy', 3);
    requestPolicies = await this.server.createList('requestPolicy', 3);
    patronNoticePolicies = await this.server.createList('patronNoticePolicy', 3);
    institutions = await this.server.createList('institution', institutionsAmount, { code: longInstitutionCode });
    campuses = await this.server.createList('campus', campusesAmount, { institutionId: institutions[0].id });

    removeDisplayedHints();

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

  it('is save button disabled without changes', () => {
    expect(circulationRules.isSaveButtonDisabled).to.be.true;
  });

  describe('entering circulation rule into editor', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: l example-loan-policy');
    });

    it('should set new circulation rule', () => {
      expect(circulationRules.editor.value).to.be.equal('m book: l example-loan-policy');
    });

    it('is save button enabled after changes', () => {
      expect(circulationRules.isSaveButtonDisabled).to.be.false;
    });
  });

  describe('entering item type', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
    });

    it('should display hints menu', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display only one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.be.equals(1);
    });

    it('should display policy types menu', () => {
      expect(circulationRules.editor.hints.sections(0).items(0).text).to.be.equal('Loan policies');
    });

    it('should display the correct header for the policy types list', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.be.equal('Circulation policies');
    });

    it('should not display the subheader for the policy types list', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.isPresent).to.be.false;
    });

    it('should not contain active items in hints menu by default', () => {
      expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.false;
    });
  });

  describe('choosing non locating criteria - material type', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m ');
    });

    it('should display hints with list of material types', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should not display header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.false;
    });

    it('should display only one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.be.equals(1);
    });

    it('should not display subheader', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.isPresent).to.be.false;
    });
  });

  describe('choosing criteria locating criteria - institution', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('a ');
    });

    it('should display hints with list of institutions codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.be.equal('Select institution');
    });

    it('should display one hint section', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.be.equals(1);
    });

    it('should display hints with correct subheader', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.be.equal('Institution');
    });

    it('should truncate long locations codes', () => {
      expect(circulationRules.editor.hints.sections(0).items(0).text).to.be.equal(truncatedInstitutionCode);
    });

    describe('pick an institution with long name', () => {
      beforeEach(async function () {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pickHint(0);
      });

      it('should insert full institution code', () => {
        expect(circulationRules.editor.value).to.be.equal(
          `a ${institutions[0].code} `
        );
      });
    });
  });

  describe('choosing criteria locating criteria - campus', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('b ');
    });

    it('should display hints with list to select campus codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.be.equal('Select campus');
    });

    it('should display 2 hints sections', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.be.equals(2);
    });

    it('should display hints with correct subheaders', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.be.equal('Institution');
      expect(circulationRules.editor.hints.sections(1).subheader.text).to.be.equal('Campus');
    });

    it('the first section should be filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.be.equal(institutionsAmount);
    });

    it('the second section should be empty by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.be.equal(0);
    });

    describe('pick an institution that contains campuses', () => {
      beforeEach(async function () {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('the second section should be filled by campuses codes', () => {
        expect(circulationRules.editor.hints.sections(1).items().length).to.be.equal(campusesAmount + 1);
      });

      it('the editor value should not be changed', () => {
        expect(circulationRules.editor.value).to.be.equal('b ');
      });

      it('the second section should contain a special value ANY', () => {
        expect(circulationRules.editor.hints.sections(1).items(0).text).to.be.equal('<ANY>');
      });

      it('the first item of the second section should be selected by default', () => {
        expect(circulationRules.editor.hints.sections(1).isFirstItemActive).to.be.true;
      });

      it('the selected item of the first section should be highlighted', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });

      it('the values should be formatted and truncated', () => {
        const fullValue = `${campuses[0].code} (${institutions[0].code})`;
        const truncatedValue = truncate(fullValue, truncateOptions);

        expect(circulationRules.editor.hints.sections(1).items(1).text).to.be.equals(truncatedValue);
      });

      describe('move selection in the second section to the last item', () => {
        beforeEach(async function () {
          await circulationRules.editor.changeActiveItem(campusesAmount);
        });

        it('the last item of the second section should be selected', () => {
          expect(circulationRules.editor.hints.sections(1).isLastItemActive).to.be.true;
        });

        it('the selection of the first section should not be changed', () => {
          expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
        });

        describe('select selected item in the second section', () => {
          beforeEach(async function () {
            await circulationRules.editor.pickHint(campusesAmount);
          });

          it('the campus code should be added to the editor value', () => {
            expect(circulationRules.editor.value).to.be.equal(`b ${campuses[campusesAmount - 1].code} `);
          });
        });
      });
    });
  });

  describe('choosing criteria locating criteria - library', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('c ');
    });

    it('should display hints with list to select library codes', () => {
      expect(circulationRules.editor.hints.arePresent).to.be.true;
    });

    it('should display hints with correct header', () => {
      expect(circulationRules.editor.hints.header.isPresent).to.be.true;
      expect(circulationRules.editor.hints.header.text).to.be.equal('Select library');
    });

    it('should display 3 hints sections', () => {
      expect(circulationRules.editor.hints.sectionsCount).to.be.equals(3);
    });

    it('should display hints with correct subheaders', () => {
      expect(circulationRules.editor.hints.sections(0).subheader.text).to.be.equal('Institution');
      expect(circulationRules.editor.hints.sections(1).subheader.text).to.be.equal('Campus');
      expect(circulationRules.editor.hints.sections(2).subheader.text).to.be.equal('Library');
    });

    it('the first section should be filled by default', () => {
      expect(circulationRules.editor.hints.sections(0).items().length).to.be.equal(institutionsAmount);
    });

    it('2 and 3 sections should be empty by default', () => {
      expect(circulationRules.editor.hints.sections(1).items().length).to.be.equal(0);
      expect(circulationRules.editor.hints.sections(2).items().length).to.be.equal(0);
    });
  });

  describe('choosing policy type', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
    });

    describe('pick loan policy type', () => {
      beforeEach(async function () {
        await circulationRules.editor.changeActiveItem(0);
        await circulationRules.editor.pickHint(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.be.equal('m book: l ');
      });
    });

    describe('click on first item in policies list', () => {
      beforeEach(async function () {
        await circulationRules.editor.hints.clickOnItem(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.be.equal('m book: l ');
      });
    });

    describe('click on the first item in policies list', () => {
      beforeEach(async function () {
        await circulationRules.editor.hints.doubleClickOnItem(0);
      });

      it('should choose loan policy type', () => {
        expect(circulationRules.editor.value).to.be.equal('m book: l ');
      });
    });
  });

  describe('open policies types list', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
    });

    describe('active the first list item', () => {
      beforeEach(async function () {
        await circulationRules.editor.changeActiveItem(0);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });
    });

    describe('active item with index, that is greater than the list length, without wrapping avoiding', () => {
      beforeEach(async function () {
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
      beforeEach(async function () {
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
      beforeEach(async function () {
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
      beforeEach(async function () {
        await circulationRules.editor.changeActiveItem(-1, true);
      });

      it('should contain the active item', () => {
        expect(circulationRules.editor.hints.sections(0).isActiveItemPresent).to.be.true;
      });

      it('the first item should be active', () => {
        expect(circulationRules.editor.hints.sections(0).isFirstItemActive).to.be.true;
      });
    });
  });

  describe('choosing loan policy', () => {
    beforeEach(async function () {
      await circulationRules.editor.setValue('m book: ');
      // choose policy type
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);
      // choose loan policy
      await circulationRules.editor.changeActiveItem(0);
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
      await circulationRules.editor.changeActiveItem(0);
      await circulationRules.editor.pickHint(0);
      // choose loan policy
      await circulationRules.editor.changeActiveItem(0);
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
