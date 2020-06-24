import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RequestPolicyForm from '../../interactors/request-policy/request-policy-form';

import translation from '../../../../translations/ui-circulation/en';

describe('RequestPolicyForm validation', () => {
  setupApplication();
  let requestPolicies;

  describe('onBlur request policy name', () => {
    beforeEach(async function () {
      requestPolicies = await this.server.createList('requestPolicy', 2);
    });

    beforeEach(function () {
      this.visit(`/settings/circulation/request-policies/${requestPolicies[0].id}?layer=edit`);
    });

    beforeEach(async () => {
      await RequestPolicyForm.whenLoaded();
    });

    beforeEach(async () => {
      await RequestPolicyForm
        .focusName()
        .fillName(requestPolicies[1].name)
        .blurName();
    });

    it('has validation error', () => {
      expect(RequestPolicyForm.hasValidationError).to.be.true;
    });

    it('has proper validation message', () => {
      expect(RequestPolicyForm.validationMessage).to.equal(translation['settings.requestPolicy.errors.nameExists']);
    });
  });
});
