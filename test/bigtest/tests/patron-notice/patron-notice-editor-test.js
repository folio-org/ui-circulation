import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import translation from '../../../../translations/ui-circulation/en';
import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe('Patron notice editor', () => {
  setupApplication();

  describe('Body', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/patron-notices?layer=add');
    });

    it('should be displayed', () => {
      expect(PatronNoticeForm.templateBody.isVisible).to.be.true;
    });

    describe('Empty editor on blur', () => {
      beforeEach(async () => {
        await PatronNoticeForm.templateName.fillAndBlur('newPatronNoticeTemplateName');
        await PatronNoticeForm.save();
      });

      it('should be displayed', () => {
        expect(PatronNoticeForm.errorContainer.isVisible).to.be.true;
      });

      it('should contain proper error text', () => {
        expect(PatronNoticeForm.errorContainer.text).to.equal(translation['settings.validate.fillIn']);
      });
    });
  });
});
