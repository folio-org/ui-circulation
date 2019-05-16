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
});
