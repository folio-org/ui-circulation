import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import translation from '../../../../translations/ui-circulation/en';
import FddsForm from '../../interactors/fixed-due-date-schedule/fixed-due-date-schedule-form';
import FddsDetail from '../../interactors/fixed-due-date-schedule/fixed-due-date-schedule-detail';

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
        expect(FddsForm.generalSectionAccordion.isOpen).to.be.false;
      });

      it('scheduleSection should not be displayed', () => {
        expect(FddsForm.scheduleSectionAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await FddsForm.expandAll.click();
        });

        it('aboutSection should be displayed', () => {
          expect(FddsForm.generalSectionAccordion.isOpen).to.be.true;
        });

        it('scheduleSection should be displayed', () => {
          expect(FddsForm.scheduleSectionAccordion.isOpen).to.be.true;
        });
      });
    });

    describe('general information accordion', () => {
      it('should be displayed', () => {
        expect(FddsForm.generalSectionAccordion.isPresent).to.be.true;
      });

      describe('collapse accordion', () => {
        beforeEach(async () => {
          await FddsForm.generalSectionAccordion.clickHeader();
        });

        it('accordion should be closed', () => {
          expect(FddsForm.generalSectionAccordion.isOpen).to.be.false;
        });

        describe('expand accordion', () => {
          beforeEach(async () => {
            await FddsForm.generalSectionAccordion.clickHeader();
          });

          it('accordion should be open', () => {
            expect(FddsForm.generalSectionAccordion.isOpen).to.be.true;
          });
        });
      });
    });

    describe('general section', () => {
      it('should be displayed', () => {
        expect(FddsForm.generalSection.isPresent).to.be.true;
      });

      it('should be displayed name', () => {
        expect(FddsForm.generalSection.name.isPresent).to.be.true;
      });

      it('should have proper name label', () => {
        expect(FddsForm.generalSection.name.label).to.equal(
          `${translation['settings.fDDSform.name']}*`
        );
      });

      it('should be displayed description', () => {
        expect(FddsForm.generalSection.description.isPresent).to.be.true;
      });

      it('should have proper description label', () => {
        expect(FddsForm.generalSection.description.label).to.equal(
          translation['settings.fDDSform.description']
        );
      });
    });

    describe('schedule', () => {
      describe('date range header', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
            'Date range 1'
          );
        });
      });

      describe('date from', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateFrom.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateFrom.labelText).to.equal(
            `${translation['settings.fDDSform.dateFrom']}*`
          );
        });
      });

      describe('date to', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateTo.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dateTo.labelText).to.equal(
            `${translation['settings.fDDSform.dateTo']}*`
          );
        });
      });

      describe('due date', () => {
        it('should be displayed', () => {
          expect(FddsForm.scheduleSection.schedules(0).dueDate.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.schedules(0).dueDate.labelText).to.equal(
            `${translation['settings.fDDSform.dueDate']}*`
          );
        });
      });

      describe('schedule section', () => {
        it('should be displayed add schedule button', () => {
          expect(FddsForm.scheduleSection.addSchedule.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(FddsForm.scheduleSection.addSchedule.text).to.equal(
            translation['settings.fDDSform.new']
          );
        });
      });

      describe('schedules creation', () => {
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

          it('should have proper text', () => {
            expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
              'Date range 1'
            );
          });

          it('should have proper text', () => {
            expect(FddsForm.scheduleSection.schedules(1).dateRange.text).to.equal(
              'Date range 2'
            );
          });
        });
      });

      describe('schedules deletion', () => {
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
              await FddsForm.scheduleSection.addSchedule.click();
              await FddsForm.scheduleSection.schedules(1).remove.click();
            });

            it('should be one schedule', () => {
              expect(FddsForm.scheduleSection.schedulesCount).to.equal(1);
            });

            it('should have proper text', () => {
              expect(FddsForm.scheduleSection.schedules(0).dateRange.text).to.equal(
                'Date range 1'
              );
            });
          });
        });
      });
    });
  });

  describe('edit existing fdds', () => {
    let fdds;

    beforeEach(async function () {
      fdds = this.server.create('fixedDueDateSchedule');
      this.visit(`/settings/circulation/fixed-due-date-schedules/${fdds.id}?layer=edit`);

      await FddsForm.whenLoaded();
      await FddsForm.fillName('new schedule');
      await FddsForm.fillDescription('test');
      await FddsForm.clickSave();
    });

    it('saived ffds', () => {
      expect(FddsDetail.containsContent('new schedule')).to.be.true;
    });
  });

  describe('delete existing fdds', () => {
    let fdds;

    beforeEach(async function () {
      fdds = this.server.create('fixedDueDateSchedule');
      this.visit(`/settings/circulation/fixed-due-date-schedules/${fdds.id}?layer=edit`);
      await FddsForm.clickDelete();
    });

    it('should show confirmation modal', () => {
      expect(FddsForm.deleteConfirmationModal.isPresent).to.be.true;
    });

    describe('click cancel button', () => {
      beforeEach(async function () {
        await FddsForm.deleteConfirmationModal.clickCancel();
      });

      it('should hide confirmation modal', () => {
        expect(FddsForm.deleteConfirmationModal.isPresent).to.be.false;
      });
    });

    describe('click delete button', () => {
      beforeEach(async function () {
        await FddsForm.deleteConfirmationModal.clickDelete();
      });

      it('should hide confirmation modal', () => {
        expect(FddsDetail.isPresent).to.be.true;
      });
    });
  });
});
