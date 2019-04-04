import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe('Patron notice edit', () => {
  setupApplication();

  describe('updating an existing notice policy', () => {
    let patronNoticeTemplate;
    const newPatronNoticeTemplateName = 'newPatronNoticeTemplateName';

    beforeEach(async function () {
      patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
      await this.visit(`/settings/circulation/patron-notices/${patronNoticeTemplate.id}?layer=edit`);
      await PatronNoticeForm.whenLoaded();
    });

    describe('Cancel editing for pristine form ', () => {
      beforeEach(async () => {
        await PatronNoticeForm.cancelEditingPatronNoticeTemplate.click();
      });

      it('should not show cancel editing confirmation', () => {
        expect(PatronNoticeForm.cancelEditingPatronNoticeTempateModal.isPresent).to.be.false;
      });
    });

    describe('Cancel editing on dirty form', () => {
      beforeEach(async () => {
        await PatronNoticeForm.templateName.fillAndBlur(newPatronNoticeTemplateName);
        await PatronNoticeForm.cancelEditingPatronNoticeTemplate.click();
      });

      it('should show cancel editing confirmation', () => {
        expect(PatronNoticeForm.cancelEditingPatronNoticeTempateModal.isPresent).to.be.true;
      });
    });

    describe('Delete patron notice template', () => {
      beforeEach(async () => {
        await PatronNoticeForm.deletePatronNoticeTemplate.click();
      });

      it('should display confirmation modal delete modal', () => {
        expect(PatronNoticeForm.deletePatronNoticeTemplateModal.isPresent).to.be.true;
      });
    });
  });
});
