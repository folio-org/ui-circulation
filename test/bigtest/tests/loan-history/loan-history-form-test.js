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
  setupApplication();

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

      it('"closed loans with associated fees/fines" section is shown', () => {
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


  describe('when form is loaded and "loan interval radio button" selected', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.loan.selectRadio(closingTypesMap.INTERVAL);
    });

    it('save button is active', () => {
      expect(LoanHistoryForm.disabledSaveButton).to.be.false;
    });

    describe('when "interval closing type" field completely filled', () => {
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

  describe('when form is loaded and "fee/fine interval radio button" selected', () => {
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

    describe('when "interval closing type" field completely filled', () => {
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
});
