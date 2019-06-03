import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import LoanHistoryForm from '../../interactors/loan-history/loan-history-form';

describe('Loan History Form', () => {
  setupApplication();

  beforeEach(function () {
    this.visit('/settings/circulation/loan-history');
  });

  it('save button is present', () => {
    expect(LoanHistoryForm.saveButton.isPresent).to.be.true;
  });

  describe('when click save button', () => {
    beforeEach(async function () {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm
        .clickImmediatelyRadioButton()
        .clickIntervalRadioButton()
        .clickNeverRadioButton()
        .clickTreatEnabledCheckbox();

      await LoanHistoryForm.saveButton.click();
    });

    it('form successfully saves', () => {
      expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
    });
  });

  describe('when form is loaded', () => {
    beforeEach(async () => {
      await LoanHistoryForm.whenLoaded();
      await LoanHistoryForm.clickIntervalRadioButton();
    });

    describe('and "interval closing type" field completely filled', () => {
      beforeEach(async () => {
        await LoanHistoryForm.intervalValue.fillAndBlur('2');
        await LoanHistoryForm.intervalType.selectAndBlur('Week(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form successfully saves', () => {
        expect(LoanHistoryForm.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('when the interval value is empty', () => {
      beforeEach(async () => {
        await LoanHistoryForm.intervalType.selectAndBlur('Day(s)');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });

    describe('when the interval type is not selected', () => {
      beforeEach(async () => {
        await LoanHistoryForm.intervalValue.fillAndBlur('3');
        await LoanHistoryForm.saveButton.click();
      });

      it('form doesn\'t save', () => {
        expect(LoanHistoryForm.callout.anyCalloutIsPresent).to.be.false;
      });
    });
  });
});
