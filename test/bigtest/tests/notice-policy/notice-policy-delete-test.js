import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';
import NoticePolicyForm from '../../interactors/notice-policy/notice-policy-form';
import NoticePolicyDetail from '../../interactors/notice-policy/notice-policy-detail';
import setupApplication from '../../helpers/setup-application';

describe('NoticePolicyDelete', () => {
  setupApplication();

  describe('deleting an existing notice policy', () => {
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

    describe('choose action delete on existing notice policy', () => {
      beforeEach(async () => {
        await NoticePolicyForm.deleteNoticePolicy.click();
      });

      it('should open delete modal', () => {
        expect(NoticePolicyForm.deleteNoticePolicyModal.isPresent).to.be.true;
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await NoticePolicyForm.deleteNoticePolicyCancel.click();
        });

        it('should close delete modal', () => {
          expect(NoticePolicyForm.deleteNoticePolicyModal.isPresent).to.be.false;
        });
      });

      describe('delete cancellation', () => {
        beforeEach(async () => {
          await NoticePolicyForm.deleteNoticePolicyConfirm.click();
        });

        it('should have cards', () => {
          expect(NoticePolicyDetail.loanNoticesSection.hasCards).to.be.true;
        });

        it('has none of cards', () => {
          expect(NoticePolicyDetail.loanNoticesSection.isPresent).to.be.false;
        });
      });
    });
  });
});
