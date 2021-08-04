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

  describe.skip('Schedules overlapping error', () => {
    let schedule;

    beforeEach(async function () {
      schedule = await this.server.create('fixed-due-date-schedule', {
        schedules: [
          {
            from: '2020-07-14T04:00:00.000+00:00',
            to: '2020-07-15T03:59:59.000+00:00',
            due: '2020-07-15T03:59:59.000+00:00',
          },
          {
            from: '2020-07-14T04:00:00.000+00:00',
            to: '2020-07-15T03:59:59.000+00:00',
            due: '2020-07-15T03:59:59.000+00:00',
          },
        ]
      });
    });

    beforeEach(async function () {
      this.visit(`settings/circulation/fixed-due-date-schedules/${schedule.id}?layer=edit`);
      await FddsForm.whenLoaded();
      await FddsForm.fillName('test');
      await FddsForm.clickSave();
    });

    it('has validation error', () => {
      expect(FddsForm.hasSchedulesArrayError).to.be.true;
    });
  });
});
