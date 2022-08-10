import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import { forEach } from 'lodash';

import setupApplication from '../../helpers/setup-application';
import LoanHistoryForm from '../../interactors/loan-history/loan-history-form';

import {
  closingTypesMap,
  intervalIdsMap,
} from '../../../../src/constants';

const intervals = {
  MINUTES: 'Minute(s)',
  HOURS: 'Hour(s)',
  DAYS: 'Day(s)',
  WEEKS: 'Week(s)',
  MONTHS: 'Month(s)',
};

describe('Loan History Form', () => {
  setupApplication({ scenarios: ['testLoanHistory'] });

  beforeEach(function () {
    this.visit('/settings/circulation/loan-anonymization');
  });

  it('save button should be disabled', () => {
    expect(LoanHistoryForm.disabledSaveButton).to.be.true;
  });

  describe('selecting any closing type radio button and clicking save button', () => {
    beforeEach(async () => {
      await LoanHistoryForm
        .loan.selectRadio(closingTypesMap.IMMEDIATELY)
        .loan.selectRadio(closingTypesMap.INTERVAL)
        .loan.selectRadio(closingTypesMap.NEVER);

      await LoanHistoryForm.saveButton.click();
    });

    it('should save form successfully', () => {
      expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
    });
  });

  describe('when checkbox is not checked', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
    });

    it('shoud not display any options below the checkbox', () => {
      expect(LoanHistoryForm.feefineSection.isPresent).to.be.false;
    });

    describe('when checkbox is checked', () => {
      beforeEach(async () => {
        await LoanHistoryForm.clickTreatEnabledCheckbox();
      });

      it('should display section for closed loans with associated fees/fines', () => {
        expect(LoanHistoryForm.feefineSection.isPresent).to.be.true;
      });
    });
  });

  describe('loading the form and selecting radio button for loan interval', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.loan.selectRadio(closingTypesMap.INTERVAL);
    });

    it('save button should be active', () => {
      expect(LoanHistoryForm.disabledSaveButton).to.be.false;
    });

    forEach(intervals, (value, key) => {
      describe('selecting interval', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loan.interval.selectAndBlur(value);
        });

        it(`interval ${value} should be present`, () => {
          expect(LoanHistoryForm.loan.intervalSelector.value).to.be.equal(intervalIdsMap[key]);
        });
      });
    });

    describe('filling completely the interval closing type fields', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.duration.fillAndBlur('2');
        await LoanHistoryForm.loan.interval.selectAndBlur('Week(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('should save form successfully', () => {
        expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('when the duration value is empty', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.interval.selectAndBlur('Day(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('should not save the form', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });

    describe('when the interval is not selected', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.duration.fillAndBlur('3');
        await LoanHistoryForm.saveButton.click();
      });

      it('should not save the form', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });
  });

  describe('loading the form and selecting treat checkbox', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.clickTreatEnabledCheckbox();
    });

    it('save button should be active', () => {
      expect(LoanHistoryForm.disabledSaveButton).to.be.false;
    });

    describe('clicking the save button', () => {
      beforeEach(async () => {
        await LoanHistoryForm.saveButton.click();
      });

      it('should not save the form', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });

    describe('selecting any radio button in fees/fines section', () => {
      beforeEach(async () => {
        await LoanHistoryForm
          .feeFine.selectRadio(closingTypesMap.IMMEDIATELY)
          .feeFine.selectRadio(closingTypesMap.INTERVAL)
          .feeFine.selectRadio(closingTypesMap.NEVER);
      });

      describe('unchecking the checkbox', () => {
        beforeEach(async () => {
          await LoanHistoryForm.clickTreatEnabledCheckbox();
        });

        it('should disappear section for closed loans with associated fees/fines', () => {
          expect(LoanHistoryForm.feefineSection.isPresent).to.be.false;
        });

        describe('when checkbox is checked', () => {
          beforeEach(async () => {
            await LoanHistoryForm.clickTreatEnabledCheckbox();
          });

          it('should display section for closed loans with associated fees/fines', () => {
            expect(LoanHistoryForm.feefineSection.isPresent).to.be.true;
          });

          it('no radio button should be selected', () => {
            const isChecked = LoanHistoryForm.feeFine.closingTypes().some(item => item.isChecked);

            expect(isChecked).to.be.false;
          });
        });
      });

      describe('clicking save button', () => {
        beforeEach(async () => {
          await LoanHistoryForm.saveButton.click();
        });

        it('should not save the form', () => {
          expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
        });
      });

      describe('selecting any radio button in default section and clicking save button', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loan.selectRadio(closingTypesMap.IMMEDIATELY);
          await LoanHistoryForm.saveButton.click();
        });

        it('should save form successfully', () => {
          expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
        });
      });
    });

    describe('selecting any radio button in default section and radio button for fee/fine interval', () => {
      beforeEach(async () => {
        await LoanHistoryForm.loan.selectRadio(closingTypesMap.IMMEDIATELY);
        await LoanHistoryForm.feeFine.selectRadio(closingTypesMap.INTERVAL);
      });

      describe('filling completely the interval closing type fields', () => {
        beforeEach(async () => {
          await LoanHistoryForm.feeFine.duration.fillAndBlur('2');
          await LoanHistoryForm.feeFine.interval.selectAndBlur('Week(s)');
          await LoanHistoryForm.saveButton.click();
        });

        it('should save form successfully', () => {
          expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
        });
      });

      describe('when the duration value is empty', () => {
        beforeEach(async () => {
          await LoanHistoryForm.feeFine.interval.selectAndBlur('Day(s)');
          await LoanHistoryForm.saveButton.click();
        });

        it('should not save the form', () => {
          expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
        });
      });

      describe('when the interval is not selected', () => {
        beforeEach(async () => {
          await LoanHistoryForm.feeFine.duration.fillAndBlur('3');
          await LoanHistoryForm.saveButton.click();
        });

        it('should not save the form', () => {
          expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
        });
      });
    });
  });

  describe('loading the form and selecting treat checkbox', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.loan.selectRadio(closingTypesMap.IMMEDIATELY);
      await LoanHistoryForm.clickTreatEnabledCheckbox();
      await LoanHistoryForm.feeFine.selectRadio(closingTypesMap.IMMEDIATELY);
    });

    it('button for add exception should be present', () => {
      expect(LoanHistoryForm.addExceptionButton.isPresent).to.be.true;
    });

    describe('clicking button for add exception', () => {
      beforeEach(async () => {
        await LoanHistoryForm.addExceptionButton.click();
      });

      it('should display exception card', () => {
        expect(LoanHistoryForm.loanException.isPresent).to.be.true;
      });

      describe('clicking button for delete exception', () => {
        beforeEach(async () => {
          await LoanHistoryForm.removeExceptionIcon.click();
        });

        it('should not display exception card', () => {
          expect(LoanHistoryForm.loanException.isPresent).to.be.false;
        });
      });

      describe('selecting the payment method', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanExceptionSection.paymentMethods(0).selectAndBlur('Cash1');
        });

        it('save button should be active', () => {
          expect(LoanHistoryForm.disabledSaveButton).to.be.false;
        });
      });

      describe('selecting any closing type radio button', () => {
        beforeEach(async () => {
          await LoanHistoryForm
            .loanException.selectRadio(closingTypesMap.IMMEDIATELY)
            .loanException.selectRadio(closingTypesMap.INTERVAL)
            .loanException.selectRadio(closingTypesMap.NEVER);
        });

        describe('clicking save button', () => {
          beforeEach(async () => {
            await LoanHistoryForm.saveButton.click();
          });

          it('should save form successfully', () => {
            expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
          });
        });

        describe('unchecking the checkbox', () => {
          beforeEach(async () => {
            await LoanHistoryForm.clickTreatEnabledCheckbox();
          });

          it('should disappear section for closed loans with associated fees/fines', () => {
            expect(LoanHistoryForm.feefineSection.isPresent).to.be.false;
          });

          it('save button should be active', () => {
            expect(LoanHistoryForm.disabledSaveButton).to.be.false;
          });
        });
      });

      describe('selecting radio button for interval type', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanException.selectRadio(closingTypesMap.INTERVAL);
        });

        it('save button should be active', () => {
          expect(LoanHistoryForm.disabledSaveButton).to.be.false;
        });

        describe('filling completely the interval closing type fields', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('2');
            await LoanHistoryForm.loanException.interval.selectAndBlur('Week(s)');
            await LoanHistoryForm.saveButton.click();
          });

          it('should save form successfully', () => {
            expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
          });
        });

        describe('when the duration value is negative', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('-2');
            await LoanHistoryForm.loanException.interval.selectAndBlur('Day(s)');
            await LoanHistoryForm.saveButton.click();
          });

          it('should not save the form', () => {
            expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
          });
        });

        describe('when the interval is not selected', () => {
          beforeEach(async () => {
            await LoanHistoryForm.loanException.duration.fillAndBlur('7');
            await LoanHistoryForm.saveButton.click();
          });

          it('should not save the form', () => {
            expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
          });
        });
      });
    });

    describe('clicking twice button for add exception', () => {
      beforeEach(async () => {
        await LoanHistoryForm
          .addExceptionButton.click()
          .addExceptionButton.click();
      });

      it('should appear 2 exception cards', () => {
        expect(LoanHistoryForm.loanExceptionSection.cardsCount).to.be.equal(2);
      });

      describe('selecting the same payment method for multiple exceptions', () => {
        beforeEach(async () => {
          await LoanHistoryForm.loanExceptionSection.paymentMethods(0).selectAndBlur('Cash2');
          await LoanHistoryForm.loanExceptionSection.paymentMethods(1).selectAndBlur('Cash2');
          await LoanHistoryForm.saveButton.click();
        });

        it('should not save the form', () => {
          expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
        });
      });
    });
  });
});
