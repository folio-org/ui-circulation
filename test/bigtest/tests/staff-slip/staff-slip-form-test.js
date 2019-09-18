import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import StaffSlipForm from '../../interactors/staff-slip/staff-slip-form';
import StaffSlipDetail from '../../interactors/staff-slip/staff-slip-detail';

describe('StaffSlipForm', () => {
  setupApplication();

  let staffSlip;

  beforeEach(async function () {
    staffSlip = this.server.create('staffSlip', {
      name: 'Hold',
      description: 'staff slip 1',
    });

    this.visit(`/settings/circulation/staffslips/${staffSlip.id}?layer=edit`);

    await StaffSlipForm.whenLoaded();
  });

  it('has a staff slip description field', () => {
    expect(StaffSlipForm.descValue).to.equal(staffSlip.description);
  });

  describe('saving updated policy', () => {
    beforeEach(async function () {
      await StaffSlipForm
        .fillDescription('updated request policy description')
        .fillEditor('<p>{{Item barcode}}</p>')
        .save();
    });

    it('renders updated policy name', () => {
      expect(StaffSlipDetail.name.value.text).to.equal('Hold');
    });
  });
});
