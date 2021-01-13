import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe('Patron Notice Form', () => {
  setupApplication();

  describe('viewing patron notice form', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/patron-notices?layer=add');
    });

    it('should be displayed', () => {
      expect(PatronNoticeForm.isPresent).to.be.true;
    });

    it('should focus name field', () => {
      expect(PatronNoticeForm.templateName.isFocused).to.be.true;
    });

    describe('email template accordion', () => {
      beforeEach(async () => {
        await PatronNoticeForm.emaillSectionAccordion.clickHeader();
      });

      it('should not be displayed', () => {
        expect(PatronNoticeForm.emaillSectionAccordion.isOpen).to.be.false;
      });
    });
  });
});
