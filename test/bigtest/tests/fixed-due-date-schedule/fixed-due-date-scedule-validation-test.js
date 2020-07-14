import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import FddsForm from '../../interactors/fixed-due-date-schedule/fixed-due-date-schedule-form';

import translation from '../../../../translations/ui-circulation/en';

describe('Fixed Due Date Schedule Validation', () => {
  setupApplication();
  let schedules;

  describe('onBlur schedule name', () => {
    beforeEach(async function () {
      schedules = await this.server.createList('fixed-due-date-schedule', 2);
    });

    beforeEach(function () {
      this.visit(`settings/circulation/fixed-due-date-schedules/${schedules[0].id}?layer=edit`);
    });

    beforeEach(async () => {
      await FddsForm.whenLoaded();
    });

    beforeEach(async () => {
      await FddsForm
        .focusName()
        .fillName(schedules[1].name)
        .blurName();
    });

    it('has validation error', () => {
      expect(FddsForm.hasValidationError).to.be.true;
    });

    it('has proper validation message', () => {
      expect(FddsForm.validationMessage).to.equal(translation['settings.fDDS.validate.uniqueName']);
    });
  });
});
