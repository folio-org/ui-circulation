import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import PatronNoticeForm from '../../interactors/patron-notice/patron-notice-form';

describe('Patron notice - prohibit deletion', () => {
  setupApplication();

  describe('Edit page - delete', () => {
    beforeEach(async function () {
      const patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
      this.server.create('patronNoticePolicy', {
        active: true,
        loanNotices: [{
          name: 'mockName',
          templateId: patronNoticeTemplate.id,
          templateName: 'mockTemplateName',
          format: 'Email',
          frequency: 'Recurring',
          realTime: true,
          sendOptions: {
            sendHow: 'After',
            sendWhen: 'Due date',
            sendBy: {
              duration: 2,
              intervalId: 'Hours'
            },
            sendEvery: {
              duration: 2,
              intervalId: 'Hours'
            }
          }
        }],
      });
      await this.visit(`/settings/circulation/patron-notices/${patronNoticeTemplate.id}?layer=edit`);
      await PatronNoticeForm.whenLoaded();
      await PatronNoticeForm.deletePatronNoticeTemplate.click();
    });

    it('should display prohibit item deletion modal', () => {
      expect(PatronNoticeForm.prohibitDeletion.isPresent).to.be.true;
    });
  });
});
