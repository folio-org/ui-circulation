import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import NoticePolicyForm from '../../interactors/notice-policy/notice-policy-form';
import NoticePolicyDetail from '../../interactors/notice-policy/notice-policy-detail';
import setupApplication from '../../helpers/setup-application';

describe('NoticePolicyEdit', () => {
  setupApplication();

  describe('updating an existing notice policy', () => {
    const newNoticePolicyName = 'test';
    let noticePolicy;

    beforeEach(async function () {
      const patronNoticeTemplate = this.server.create('templates', { category: 'Loan' });
      noticePolicy = this.server.create('patronNoticePolicy', {
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
      await this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}?layer=edit`);
      await NoticePolicyForm.whenLoaded(noticePolicy.name);
    });

    it('policy name should be same as in testNoticePolicy scenario', () => {
      expect(NoticePolicyForm.generalSection.policyName.val).to.equal(noticePolicy.name);
    });

    describe('updating an existing notice policy', () => {
      beforeEach(async () => {
        await NoticePolicyForm.generalSection.policyName.fillAndBlur(newNoticePolicyName)
          .save();
      });

      it('should render updated policy name', () => {
        expect(NoticePolicyDetail.generalSection.name.value.text).to.equal(newNoticePolicyName);
      });
    });
  });
});
