import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import StaffSlipDetail from '../../interactors/staff-slip/staff-slip-detail';

describe('StaffSlipDetail', () => {
  setupApplication();

  let staffSlip;

  beforeEach(function () {
    staffSlip = this.server.create('staffSlip', {
      template: '<p>{{item.barcode}}</p>',
    });

    this.visit(`/settings/circulation/staffslips/${staffSlip.id}`);
  });

  it('has a staff slip template', () => {
    expect(StaffSlipDetail.containsContent('{{item.barcode}}')).to.be.true;
  });

  describe('preview modal', () => {
    beforeEach(async function () {
      await StaffSlipDetail.clickPreviewBtn();
      await StaffSlipDetail.previewModal.whenLoaded();
    });

    describe('open preview modal', () => {
      it('opens preview modal', () => {
        expect(StaffSlipDetail.previewModal.isPresent).to.be.true;
      });

      it('has a barcode', () => {
        expect(StaffSlipDetail.previewModal.barcodeIsPresent).to.be.true;
      });
    });

    describe('close preview modal', () => {
      beforeEach(async function () {
        await StaffSlipDetail.previewModal.clickCloseBtn();
      });

      it('closes preview modal', () => {
        expect(StaffSlipDetail.previewModalIsVisible).to.be.false;
      });
    });
  });
});
