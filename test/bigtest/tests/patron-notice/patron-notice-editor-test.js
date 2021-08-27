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
      expect(PatronNoticeForm.templateBody.isPresent).to.be.true;
    });

    describe.skip('Empty editor on blur', () => {
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

    describe('Tokens', () => {
      it('should display tokens button', () => {
        expect(PatronNoticeForm.showAvailbaleTokensBtn.isPresent).to.be.true;
      });

      describe('Tokens modal', () => {
        beforeEach(async () => {
          await PatronNoticeForm.showAvailbaleTokensBtn.click();
        });

        it('should display tokens modal', () => {
          expect(PatronNoticeForm.tokensModal.isPresent).to.be.true;
        });

        it('should display list of tokens', () => {
          expect(PatronNoticeForm.tokensModal.availbaleTokens(0).isPresent).to.be.true;
        });

        it('should display cancel button', () => {
          expect(PatronNoticeForm.tokensModal.cancelBtn.isPresent).to.be.true;
        });

        it('should display add token button', () => {
          expect(PatronNoticeForm.tokensModal.addTokensBtn.isPresent).to.be.true;
        });

        describe('Enable add tokens button', () => {
          beforeEach(async () => {
            await PatronNoticeForm.tokensModal.availbaleTokens(0).items(0).click();
          });

          it('should enable button', () => {
            expect(PatronNoticeForm.tokensModal.isAddTokenBtnDisabled).to.be.false;
          });
        });

        describe('Pick token', () => {
          beforeEach(async () => {
            await PatronNoticeForm.tokensModal.availbaleTokens(0).items(0).click();
            await PatronNoticeForm.tokensModal.addTokensBtn.click();
          });

          it('should insert token into editor', () => {
            expect(PatronNoticeForm.templateBody.text).to.equal('{{item.title}}');
          });
        });

        describe('Close tokens modal', () => {
          beforeEach(async () => {
            await PatronNoticeForm.tokensModal.cancelBtn.click();
          });

          it('shound not display tokens modal', () => {
            expect(PatronNoticeForm.tokensModal.availbaleTokens(0).isPresent).to.be.false;
          });
        });

        describe('Uncheck token', () => {
          beforeEach(async () => {
            await PatronNoticeForm.tokensModal.availbaleTokens(0).items(0).click();
            await PatronNoticeForm.tokensModal.availbaleTokens(0).items(0).click();
          });

          it('should enable button', () => {
            expect(PatronNoticeForm.tokensModal.isAddTokenBtnDisabled).to.be.true;
          });
        });

        describe('Multiple tokens', () => {
          beforeEach(async () => {
            await PatronNoticeForm.templateCategory.selectAndBlur(translation['settings.patronNotices.categories.loan']);
            await PatronNoticeForm.tokensModal.multipleTokens.click();
            await PatronNoticeForm.tokensModal.availbaleTokens(2).items(0).click();
            await PatronNoticeForm.tokensModal.addTokensBtn.click();
          });

          it('should insert loop with token into editor', () => {
            expect(PatronNoticeForm.templateBody.text).to.equal('{{#loans}}{{loan.dueDate}}{{/loans}}');
          });
        });
      });
    });
  });
});
