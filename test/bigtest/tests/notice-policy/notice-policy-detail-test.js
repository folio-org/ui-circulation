import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import translation from '../../../../translations/ui-circulation/en';
import setupApplication from '../../helpers/setup-application';
import NoticePolicyDetail from '../../interactors/notice-policy/notice-policy-detail';

describe.only('NoticePolicyDetail', () => {
  setupApplication();

  let noticePolicy;

  beforeEach(function () {
    noticePolicy = this.server.create('patronNoticePolicy', {
      active: true,
      loanNotices: [{
        name: 'mockName',
        templateId: '1a1367b4-76d4-4525-8e4f-5842ad04aae9',
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
    this.visit(`/settings/circulation/notice-policies/${noticePolicy.id}`);
  });

  describe('viewing notice policy', () => {
    describe('general section', () => {
      describe('name', () => {
        it('should be displayed', () => {
          expect(NoticePolicyDetail.generalSection.name.isPresent).to.be.true;
        });

        it('should have a proper label', () => {
          expect(NoticePolicyDetail.generalSection.name.label.text).to.equal(translation['settings.noticePolicy.policyName']);
        });

        it('should have a proper value', () => {
          expect(NoticePolicyDetail.generalSection.name.value.text).to.equal(noticePolicy.name);
        });
      });

      describe('description', () => {
        it('should be displayed', () => {
          expect(NoticePolicyDetail.generalSection.description.isPresent).to.be.true;
        });

        it('should have a proper label', () => {
          expect(NoticePolicyDetail.generalSection.description.label.text).to.equal(translation['settings.noticePolicy.policyDescription']);
        });

        it('should have a proper value', () => {
          expect(NoticePolicyDetail.generalSection.description.value.text).to.equal(noticePolicy.description);
        });
      });

      describe('active', () => {
        it('should be displayed', () => {
          expect(NoticePolicyDetail.generalSection.active.isPresent).to.be.true;
        });

        it('should have a proper label', () => {
          expect(NoticePolicyDetail.generalSection.active.label.text).to.equal(translation['settings.noticePolicy.active']);
        });

        it('should have a proper value', () => {
          expect(NoticePolicyDetail.generalSection.active.value.text).to.equal(translation['settings.common.yes']);
        });
      });
    });
    describe('loan notices section', () => {
      it('should have card', () => {
        expect(NoticePolicyDetail.loanNoticesSection.hasCards).to.be.true;
      });

      it('has one card', () => {
        expect(NoticePolicyDetail.loanNoticesSection.cardsCount).to.equal(1);
      });

      describe('loan notice card', () => {
        describe('templateId', () => {
        });
      });
    });
  });
});
