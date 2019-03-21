import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies, import/no-unresolved
import translation from '@folio/circulation/translations/ui-circulation/en.json';

import FddsForm from '../../interactors/fixed-due-date-schedule/fixed-due-date-schedule-form';
import setupApplication from '../../helpers/setup-application';

describe('FddsForm', () => {
  setupApplication();

  describe('accordions', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fixed-due-date-schedules?layer=add');
    });

    it('should be displayed', () => {
      expect(FddsForm.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await FddsForm.expandAll.click();
      });

      it('aboutSection should not be displayed', () => {
        expect(FddsForm.generalSection.isHidden).to.be.true;
      });

      it('scheduleSection should not be displayed', () => {
        expect(FddsForm.scheduleSection.isHidden).to.be.true;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await FddsForm.expandAll.click();
        });

        it('aboutSection should be displayed', () => {
          expect(FddsForm.generalSection.isVisible).to.be.true;
        });

        it('scheduleSection should be displayed', () => {
          expect(FddsForm.scheduleSection.isVisible).to.be.true;
        });
      });
    });
  });

  describe('general section', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fixed-due-date-schedules?layer=add');
    });

    it('should be displayed', () => {
      expect(FddsForm.generalSection.isPresent).to.be.true;
    });

    describe('name', () => {
      it('should be displayed', () => {
        expect(FddsForm.generalSection.name.isPresent).to.be.true;
      });

      it('should have proper label', () => {
        expect(FddsForm.generalSection.name.label).to.equal(
          `${translation['settings.fDDSform.name']}*`
        );
      });
    });

    describe('description', () => {
      it('should be displayed', () => {
        expect(FddsForm.generalSection.description.isPresent).to.be.true;
      });

      it('should have proper label', () => {
        expect(FddsForm.generalSection.description.label).to.equal(
          translation['settings.fDDSform.description']
        );
      });
    });
  });

  describe('schedule section', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fixed-due-date-schedules?layer=add');
    });

    describe('add schedule', () => {
      it('should be displayed', () => {
        expect(FddsForm.scheduleSection.addSchedule.isPresent).to.be.true;
      });

      it('should have proper text', () => {
        expect(FddsForm.scheduleSection.addSchedule.text).to.equal(
          translation['settings.fDDSform.new']
        );
      });
    });

    describe('schedule', () => {
      describe('date range', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
            `${translation['settings.fDDSform.dateRange']} 1`
          );
        });
      });

      describe('date from', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateFrom.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateFrom.labelText).to.equal(
            translation['settings.fDDSform.dateFrom']
          );
        });
      });

      describe('date to', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateTo.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateTo.labelText).to.equal(
            translation['settings.fDDSform.dateTo']
          );
        });
      });

      describe('due date', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dueDate.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dueDate.labelText).to.equal(
            translation['settings.fDDSform.dueDate']
          );
        });
      });
    });
  });

  describe('schedules creation', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fixed-due-date-schedules?layer=add');
    });

    it('should be one schedule', () => {
      expect(FddsForm.scheduleSection.schedulesCount).to.equal(1);
    });

    describe('adding additional schedule', () => {
      beforeEach(async () => {
        await FddsForm.scheduleSection.addSchedule.click();
      });

      it('should be two schedules', () => {
        expect(FddsForm.scheduleSection.schedulesCount).to.equal(2);
      });

      describe('first schedule', () => {
        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
            `${translation['settings.fDDSform.dateRange']} 1`
          );
        });
      });

      describe('second schedule', () => {
        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(1).dateRange.text).to.equal(
            `${translation['settings.fDDSform.dateRange']} 2`
          );
        });
      });
    });
  });

  describe('schedules deletion', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/fixed-due-date-schedules?layer=add');
    });

    it('should be one schedule', () => {
      expect(FddsForm.scheduleSection.schedulesCount).to.equal(1);
    });

    describe('adding additional schedule', () => {
      beforeEach(async () => {
        await FddsForm.scheduleSection.addSchedule.click();
      });

      it('should be two schedules', () => {
        expect(FddsForm.scheduleSection.schedulesCount).to.equal(2);
      });

      describe('deleting additional schedule', () => {
        beforeEach(async () => {
          await FddsForm.scheduleSection.schedules(1).remove.click();
        });

        it('should be one schedule', () => {
          expect(FddsForm.scheduleSection.schedulesCount).to.equal(1);
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
            `${translation['settings.fDDSform.dateRange']} 1`
          );
        });
      });
    });
  });
});
