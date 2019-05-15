import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import CheckoutForm from '../../interactors/other-settings/checkout-form';

describe('CheckoutForm', () => {
  setupApplication();

  beforeEach(async function () {
    this.visit('/settings/circulation/checkout');

    await CheckoutForm.whenLoaded();
    await CheckoutForm
      .clickBarcodeCheckout()
      .clickExternalSystemIdCheckbox()
      .clickIdCheckbox()
      .clickUsernameCheckbox();

    await CheckoutForm.save();
  });

  it('saves checkout form', () => {
    expect(CheckoutForm.calloutIsPresent).to.be.true;
  });
});
