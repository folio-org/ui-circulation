import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

import translation from '../../../../translations/ui-circulation/en';

describe('PatronNoticeForm validation', () => {
  setupApplication();
  let templates;

  describe('onBlur template name', () => {
    beforeEach(async function () {
      templates = await this.server.createList('templates', 2);
    });

    beforeEach(function () {
      this.visit(`/settings/circulation/patron-notices/${templates[0].id}?layer=edit`);
    });

    beforeEach(async () => {
      await PatronNoticeForm.whenLoaded();
    });

    beforeEach(async () => {
      await PatronNoticeForm
        .focusName()
        .fillName(templates[1].name)
        .blurName();
    });

    it('has validation error', () => {
      expect(PatronNoticeForm.hasValidationError).to.be.true;
    });

    it('has proper validation message', () => {
      expect(PatronNoticeForm.validationMessage).to.equal(translation['settings.patronNotices.errors.nameExists']);
    });
  });
});
