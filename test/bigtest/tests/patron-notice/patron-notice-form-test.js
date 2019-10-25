import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe.only('Patron Notice Form', () => {
  setupApplication();

  describe('viewing patron notice form', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/patron-notices?layer=add');
    });

    it('should be displayed', () => {
      expect(PatronNoticeForm.isPresent).to.be.true;
    });

    describe('email template accordion', () => {
      beforeEach(async () => {
        await PatronNoticeForm.emaillSectionAccordion.clickHeader();
      });

      it('should not be displayed', () => {
        expect(PatronNoticeForm.emaillSectionAccordion.isOpen).to.be.false;
      });
    });

    describe('template name validation on blur', () => {
      beforeEach(async () => {
        await PatronNoticeForm.templateName.fillAndBlur('Random value');
      });

      it('should be displayed', () => {
        expect(PatronNoticeForm.hasTemplateNameError).to.be.false;
      });
    });
  });
});
