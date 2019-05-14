import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import StaffSlipDetail from '../../interactors/staff-slip/staff-slip-detail';

describe('StaffSlipDetail', () => {
  setupApplication();

  let staffSlip;

  beforeEach(function () {
    staffSlip = this.server.create('staffSlip', {
      template: '<p>{{ barcode }}</p>',
    });

    this.visit(`/settings/circulation/staffslips/${staffSlip.id}`);
  });

  it('has a staff slip template', () => {
    expect(StaffSlipDetail.containsContent('{{ barcode }}')).to.be.true;
  });
});
