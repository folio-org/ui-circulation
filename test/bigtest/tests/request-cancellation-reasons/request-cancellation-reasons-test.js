import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import RCReasons from '../../interactors/request-cancellation-reasons/request-cancellation-reasons';

describe.only('Request Cancellation reasons', () => {
  setupApplication();

  beforeEach(function () {
    this.server.createList('cancellationReasons', 3);
  });

  describe('viewing cancellation reason list', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/cancellation-reasons');
    });

    it('has a cancellation reason list', () => {
      expect(RCReasons.hasList).to.be.true;
    });

    it('has 3 items', () => {
      expect(RCReasons.rcCount).to.equal(3);
    });
  });
});
