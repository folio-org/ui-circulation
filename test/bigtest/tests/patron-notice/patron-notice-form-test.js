import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import setupApplication from '../../helpers/setup-application';
import patronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe.only('Patron Notice Form', () => {
  setupApplication();

  describe('viewing patron notice form', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/patron-notices?layer=add');
    });

    it('should be displayed', () => {
      expect(patronNoticeForm.isPresent).to.be.true;
    });

    describe('email template accordion', () => {
      beforeEach(async () => {
        await patronNoticeForm.emaillSectionAccordion.clickHeader();
      });

      it('should not be displayed', () => {
        expect(patronNoticeForm.emaillSectionAccordion.isOpen).to.be.false;
      });
    });
  });
});
