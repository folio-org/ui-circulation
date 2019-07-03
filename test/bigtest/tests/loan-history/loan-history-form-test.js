import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LoanHistoryForm from '../../interactors/loan-history/loan-history-form';

import { closingTypesMap } from '../../../../src/constants';

describe('Loan History Form', () => {
  setupApplication({ scenarios: ['testLoanHistory'] });

  beforeEach(function () {
    this.visit('/settings/circulation/loan-history');
  });

  it('save button is disabled', () => {
    expect(LoanHistoryForm.disabledSaveButton).to.be.true;
  });

  describe('when checkbox is not checked', () => {
    beforeEach(async function () {
      await LoanHistoryForm.whenLoaded();
    });

    it('any options below the checkbox is not shown', () => {
      expect(LoanHistoryForm.feefineSection.isPresent).to.be.false;
    });

    describe('when checkbox is checked', () => {
      beforeEach(async function () {
        await LoanHistoryForm.clickTreatEnabledCheckbox();
      });

      it('section for closed loans with associated fees/fines is shown', () => {
        expect(LoanHistoryForm.feefineSection.isPresent).to.be.true;
      });

      describe('when click save button', () => {
        beforeEach(async function () {
          await LoanHistoryForm
            .loan.selectRadio(closingTypesMap.IMMEDIATELY)
            .loan.selectRadio(closingTypesMap.INTERVAL)
            .loan.selectRadio(closingTypesMap.NEVER);

          await LoanHistoryForm.saveButton.click();
        });

        it('form successfully saves', () => {
          expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
        });
      });
    });
  });


  describe('when form is loaded and radio button for loan interval is selected', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.loan.selectRadio(closingTypesMap.INTERVAL);
    });

    it('save button is active', () => {
      expect(LoanHistoryForm.disabledSaveButton).to.be.false;
    });

    describe('when the interval closing type field completely filled', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.duration.fillAndBlur('2');
        await LoanHistoryForm.loan.interval.selectAndBlur('Week(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form successfully saves', () => {
        expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('when the duration value is empty', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.interval.selectAndBlur('Day(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });

    describe('when the interval is not selected', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.duration.fillAndBlur('3');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });
  });

  describe('when form is loaded and radio button for fee/fine interval is selected', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.clickTreatEnabledCheckbox();
      await LoanHistoryForm.feeFine.selectRadio(closingTypesMap.INTERVAL);
    });

    it('save button is active', () => {
      expect(LoanHistoryForm.disabledSaveButton).to.be.false;
    });

    describe('when click save button', () => {
      beforeEach(async function () {
        await LoanHistoryForm
          .feeFine.selectRadio(closingTypesMap.IMMEDIATELY)
          .feeFine.selectRadio(closingTypesMap.INTERVAL)
          .feeFine.selectRadio(closingTypesMap.NEVER);

        await LoanHistoryForm.saveButton.click();
      });

      it('form successfully saves', () => {
        expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('when the interval closing type field completely filled', () => {
      beforeEach(async () => {
        await LoanHistoryForm.feeFine.duration.fillAndBlur('2');
        await LoanHistoryForm.feeFine.interval.selectAndBlur('Week(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form successfully saves', () => {
        expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('when the duration value is empty', () => {
      beforeEach(async () => {
        await LoanHistoryForm.feeFine.interval.selectAndBlur('Day(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });

    describe('when the interval is not selected', () => {
      beforeEach(async () => {
        await LoanHistoryForm.feeFine.duration.fillAndBlur('3');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });
  });

  describe('when form is loaded and checkbox for treat closed loans is checked', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.clickTreatEnabledCheckbox();
    });

    it('button for add exception is present', () => {
      expect(LoanHistoryForm.addExceptionButton.isPresent).to.be.true;
    });

    describe('when button for add exception is clicked', () => {
      beforeEach(async () => {
        await LoanHistoryForm.addExceptionButton.click();
      });

      it('exception card is shown', () => {
        expect(LoanHistoryForm.loanException.isPresent).to.be.true;
      });

      describe('when button for delete exception is clicked', () => {
        beforeEach(async () => {
          await LoanHistoryForm.removeExceptionIcon.click();
        });

        it('exception card is not shown', () => {
          expect(LoanHistoryForm.loanException.isPresent).to.be.false;
        });
      });

      describe('when user has made changes', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanExceptionSection.paymentMethods(0).selectAndBlur('Cash1');
        });

        it('save button is active', () => {
          expect(LoanHistoryForm.disabledSaveButton).to.be.false;
        });
      });

      describe('when select radio buttons and click save button', () => {
        beforeEach(async function () {
          await LoanHistoryForm
            .loanException.selectRadio(closingTypesMap.IMMEDIATELY)
            .loanException.selectRadio(closingTypesMap.INTERVAL)
            .loanException.selectRadio(closingTypesMap.NEVER);

          await LoanHistoryForm.saveButton.click();
        });

        it('form successfully saves', () => {
          expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
        });
      });

      describe('when radio button for interval type is selected', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanException.selectRadio(closingTypesMap.INTERVAL);
        });

        it('save button is active', () => {
          expect(LoanHistoryForm.disabledSaveButton).to.be.false;
        });

        describe('when fields completely filled', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('2');
            await LoanHistoryForm.loanException.interval.selectAndBlur('Week(s)');
            await LoanHistoryForm.saveButton.click();
          });

          it('form successfully saves', () => {
            expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
          });
        });

        describe('when the duration value is negative', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('-2');
            await LoanHistoryForm.loanException.interval.selectAndBlur('Day(s)');
            await LoanHistoryForm.saveButton.click();
          });

          it('form doesn\'t save', () => {
            expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
          });
        });

        describe('when the interval is not selected', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('7');
            await LoanHistoryForm.saveButton.click();
          });

          it('form doesn\'t save', () => {
            expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
          });
        });
      });
    });

    describe('when button for add exception is clicked twice', () => {
      beforeEach(async () => {
        await LoanHistoryForm
          .addExceptionButton.click()
          .addExceptionButton.click();
      });

      it('should have 2 exception cards', () => {
        expect(LoanHistoryForm.loanExceptionSection.cardsCount).to.be.equal(2);
      });

      describe('when user has selected the same payment method for multiple exceptions', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanExceptionSection.paymentMethods(0).selectAndBlur('Cash2');
          await LoanHistoryForm.loanExceptionSection.paymentMethods(1).selectAndBlur('Cash2');
          await LoanHistoryForm.saveButton.click();
        });

        it('form doesn\'t save', () => {
          expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
        });
      });
    });
  });
});
