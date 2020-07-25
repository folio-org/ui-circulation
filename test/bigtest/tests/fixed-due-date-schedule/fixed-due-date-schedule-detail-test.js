import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import FddsDetail from '../../interactors/fixed-due-date-schedule/fixed-due-date-schedule-detail';

describe('FddsFormDetail', () => {
  setupApplication();

  let fdds;

  beforeEach(async function () {
    fdds = this.server.create('fixedDueDateSchedule');

    this.visit(`/settings/circulation/fixed-due-date-schedules/${fdds.id}`);
    await FddsDetail.whenLoaded();
  });

  it('has a staff slip template', () => {
    expect(FddsDetail.containsContent(fdds.name)).to.be.true;
  });

  describe('accordions', () => {
    it('should be displayed', () => {
      expect(FddsDetail.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await FddsDetail.expandAll.click();
      });

      it('accordion should be closed', () => {
        expect(FddsDetail.generalInformationAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await FddsDetail.expandAll.click();
        });

        it('accordion should be open', () => {
          expect(FddsDetail.generalInformationAccordion.isOpen).to.be.true;
        });
      });
    });
  });

  describe('general information accordion', () => {
    it('should be displayed', () => {
      expect(FddsDetail.generalInformationAccordion.isPresent).to.be.true;
    });

    describe('collapse accordion', () => {
      beforeEach(async () => {
        await FddsDetail.generalInformationAccordion.clickHeader();
      });

      it('accordion should be closed', () => {
        expect(FddsDetail.generalInformationAccordion.isOpen).to.be.false;
      });

      describe('expand accordion', () => {
        beforeEach(async () => {
          await FddsDetail.generalInformationAccordion.clickHeader();
        });

        it('accordion should be open', () => {
          expect(FddsDetail.generalInformationAccordion.isOpen).to.be.true;
        });
      });
    });
  });
});
