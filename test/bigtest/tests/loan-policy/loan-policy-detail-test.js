import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import translation from '../../../../translations/ui-circulation/en';

import {
  shortTermLoansOptions,
  longTermLoansOptions,
  renewFromOptions,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  loanProfileMap,
} from '../../../../src/constants';
import { getPeriod } from '../../network/factories/loan-policy';
import setupApplication from '../../helpers/setup-application';
import LoanPolicyDetail from '../../interactors/loan-policy/loan-policy-detail';
import {
  getBooleanRepresentation,
  getOptionsRepresentation,
  getPeriodRepresentation,
} from '../../helpers/messageConverters';

describe('LoanPolicyDetail', () => {
  setupApplication();

  let loanPolicy;

  describe('viewing loan policy', () => {
    describe('accordions', () => {
      beforeEach(function () {
        loanPolicy = this.server.create('loanPolicy', {
          loanable: true,
        });

        this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
      });

      it('should be displayed', () => {
        expect(LoanPolicyDetail.expandAll.isPresent).to.be.true;
      });

      describe('collapse all', () => {
        beforeEach(async () => {
          await LoanPolicyDetail.expandAll.click();
        });

        it('content should be hidden', () => {
          expect(LoanPolicyDetail.content.isHidden).to.be.true;
        });

        describe('expand all', () => {
          beforeEach(async () => {
            await LoanPolicyDetail.expandAll.click();
          });

          it('content should be visible', () => {
            expect(LoanPolicyDetail.content.isVisible).to.be.true;
          });
        });
      });
    });

    describe('\n\tabout section\n', () => {
      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.aboutSection.header.text).to.equal(translation['settings.loanPolicy.about']);
          });
        });

        describe('loan policy name', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.label.text).to.equal(translation['settings.loanPolicy.policyName']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.aboutSection.policyName.value.text).to.equal(loanPolicy.name);
          });
        });

        describe('loan policy description', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.label.text).to.equal(translation['settings.loanPolicy.policyDescription']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.aboutSection.policyDescription.value.text).to.equal(loanPolicy.description);
          });
        });
      });
    });

    describe('\n\tloans section\n', () => {
      describe('loan policy:\n\t-not loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: false,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('loans section', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.loansSection.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.loansSection.header.text).to.equal(translation['settings.loanPolicy.loans']);
          });
        });

        describe('loan profile', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.label.text).to.equal(translation['settings.loanPolicy.loanProfile']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.loanProfile.value.text).to.equal(loanPolicy.loansPolicy.profileId);
          });
        });

        describe('closed library due date management', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.label.text).to.contain(translation['settings.loanPolicy.closedDueDateMgmt']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.closedDueDateMgmt.value.text).to.equal(
              getOptionsRepresentation(
                [
                  ...longTermLoansOptions,
                  ...shortTermLoansOptions,
                ],
                loanPolicy.loansPolicy.closedLibraryDueDateManagementId
              )
            );
          });
        });

        describe('grace period', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.gracePeriod.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.gracePeriod.label.text).to.equal(translation['settings.loanPolicy.gracePeriod']);
          });

          it('should have a proper value', () => {
            const period = getPeriodRepresentation(loanPolicy.loansPolicy.gracePeriod);
            expect(LoanPolicyDetail.loansSection.gracePeriod.value.text).to.equal(period);
          });
        });
      });

      describe('loan policy:\n\t-loanable\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.ROLLING,
              period: getPeriod,
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('loan period', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.label.text).to.equal(translation['settings.loanPolicy.loanPeriod']);
          });

          it('should have a proper value', () => {
            const period = getPeriodRepresentation(loanPolicy.loansPolicy.period);
            expect(LoanPolicyDetail.loansSection.loanPeriod.value.text).to.equal(period);
          });
        });

        describe('loan due date schedule', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.label.text).to.equal(translation['settings.loanPolicy.fDDSlimit']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.value.text).to.equal('-');
          });
        });
      });

      describe('loan policy:\n\t-loanable\n\t-fixed\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.FIXED,
              period: getPeriod,
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('loan period', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.loansSection.loanPeriod.isPresent).to.be.false;
          });
        });

        describe('loan due date schedule', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.label.text).to.equal(translation['settings.loanPolicy.fDDS']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.loansSection.dueDateSchedule.value.text).to.equal('-');
          });
        });
      });

      describe('loan policy:\n\t-rolling\n\t-loanable\n\t-short term period\n\t-closed library due date management - beginning of the next open service point hours\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.ROLLING,
              closedLibraryDueDateManagementId: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
              period: {
                intervalId: 'Minutes',
                duration: 12,
              },
              openingTimeOffset: getPeriod,
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('opening time offset', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.loansSection.openingTimeOffset.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.loansSection.openingTimeOffset.label.text).to.equal(translation['settings.loanPolicy.openingTimeOffset']);
          });

          it('should have a proper value', () => {
            const period = getPeriodRepresentation(loanPolicy.loansPolicy.openingTimeOffset);
            expect(LoanPolicyDetail.loansSection.openingTimeOffset.value.text).to.equal(period);
          });
        });
      });

      describe('loan policy:\n\t-rolling\n\t-loanable\n\t-long term period\n\t-closed library due date management - beginning of the next open service point hours\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loansPolicy: {
              loanable: true,
              profileId: loanProfileMap.ROLLING,
              closedLibraryDueDateManagementId: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
              period: {
                intervalId: 'Month',
                duration: 12,
              },
            },
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('opening time offset', () => {
          it('should not be displayed', () => {
            expect(LoanPolicyDetail.loansSection.openingTimeOffset.isPresent).to.be.false;
          });
        });
      });
    });

    describe('\n\trenewals section\n', () => {
      describe('loan policy:\n\t-non renewable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: false,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('renewals section', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-with limited renewals\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            renewalsPolicy: {
              unlimited: false,
              numberAllowed: 666,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('number renewals allowed', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.label.text).to.equal(translation['settings.loanPolicy.numRenewalsAllowed']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.value.text).to.equal(loanPolicy.renewalsPolicy.numberAllowed.toString());
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-unlimited renewals\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            renewalsPolicy: {
              unlimited: true,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('number renewals allowed', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.numRenewalsAllowed.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-different period\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.ROLLING,
            },
            renewalsPolicy: {
              differentPeriod: true,
              period: getPeriod,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('alternate loan period renewals', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.label.text).to.equal(translation['settings.loanPolicy.alternateLoanPeriodRenewals']);
          });

          it('should have a proper value', () => {
            const period = getPeriodRepresentation(loanPolicy.renewalsPolicy.period);
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.value.text).to.equal(period);
          });
        });

        describe('alternate fixed due date schedule id', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.label.text).to.equal(translation['settings.loanPolicy.altFDDSDueDateLimit']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.value.text).to.equal('-');
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-different period\n\t-fixed\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.FIXED,
            },
            renewalsPolicy: {
              differentPeriod: true,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('Alternate fixed due date schedule for renewals', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.label.text).to.contain(translation['settings.loanPolicy.altFDDSforRenewals']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateFixedDueDateScheduleId.value.text).to.equal('-');
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n\t-same period\n\t-rolling\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
            loansPolicy: {
              profileId: loanProfileMap.ROLLING,
            },
            renewalsPolicy: {
              differentPeriod: false,
              period: getPeriod,
            }
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('alternate loan period renewals', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-renewable\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            renewable: true,
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.renewalsSection.header.text).to.equal(translation['settings.loanPolicy.renewals']);
          });
        });

        describe('unlimited renewals', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.label.text).to.equal(translation['settings.loanPolicy.unlimitedRenewals']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.unlimitedRenewals.value.text).to.equal(
              getBooleanRepresentation(loanPolicy.renewalsPolicy.unlimited)
            );
          });
        });

        describe('renew from', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.label.text).to.equal(translation['settings.loanPolicy.renewFrom']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.renewFrom.value.text).to.equal(
              getOptionsRepresentation(renewFromOptions, loanPolicy.renewalsPolicy.renewFromId)
            );
          });
        });

        describe('renewal period different', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.isPresent).to.be.true;
          });

          it('should have a proper label', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.label.text).to.equal(translation['settings.loanPolicy.renewalPeriodDifferent']);
          });

          it('should have a proper value', () => {
            expect(LoanPolicyDetail.renewalsSection.renewalPeriodDifferent.value.text).to.equal(
              getBooleanRepresentation(loanPolicy.renewalsPolicy.differentPeriod)
            );
          });
        });
      });
    });

    describe('\n\trequest management section\n', () => {
      describe('loan policy:\n\t-non loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: false,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });
        describe('request management section', () => {
          it.always('should not be displayed', () => {
            expect(LoanPolicyDetail.requestManagement.isPresent).to.be.false;
          });
        });
      });

      describe('loan policy:\n\t-loanable\n', () => {
        beforeEach(function () {
          loanPolicy = this.server.create('loanPolicy', {
            loanable: true,
          });

          this.visit(`/settings/circulation/loan-policies/${loanPolicy.id}`);
        });

        describe('header', () => {
          it('should be displayed', () => {
            expect(LoanPolicyDetail.requestManagement.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyDetail.requestManagement.header.text).to.equal(translation['settings.requestManagement.requestManagement']);
          });
        });

        describe('recalls', () => {
          describe('recall return interval', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.label.text).to.equal(translation['settings.requestManagement.recallReturnInterval']);
            });

            it('should have a proper value', () => {
              const period = getPeriodRepresentation(loanPolicy.requestManagement.recalls.recallReturnInterval);
              expect(LoanPolicyDetail.requestManagement.recallReturnInterval.value.text).to.equal(period);
            });
          });

          describe('minimum guaranteed loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.label.text).to.equal(translation['settings.requestManagement.minimumGuaranteedLoanPeriod']);
            });

            it('should have a proper value', () => {
              const period = getPeriodRepresentation(loanPolicy.requestManagement.recalls.minimumGuaranteedLoanPeriod);
              expect(LoanPolicyDetail.requestManagement.minimumGuaranteedLoanPeriod.value.text).to.equal(period);
            });
          });
        });

        describe('holds', () => {
          describe('alternate checkout loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.label.text).to.equal(translation['settings.requestManagement.alternateCheckoutLoanPeriod']);
            });

            it('should have a proper value', () => {
              const period = getPeriodRepresentation(loanPolicy.requestManagement.holds.alternateCheckoutLoanPeriod);
              expect(LoanPolicyDetail.requestManagement.alternateCheckoutLoanPeriod.value.text).to.equal(period);
            });
          });

          describe('renew items with request', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.label.text).to.equal(translation['settings.requestManagement.renewItemsWithRequest']);
            });

            it('should have a proper value', () => {
              expect(LoanPolicyDetail.requestManagement.renewItemsWithRequest.value.text).to.equal(
                getBooleanRepresentation(loanPolicy.requestManagement.holds.renewItemsWithRequest)
              );
            });
          });

          describe('alternate renewal loan period', () => {
            it('should be displayed', () => {
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.isPresent).to.be.true;
            });

            it('should have a proper label', () => {
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.label.text).to.equal(translation['settings.requestManagement.alternateRenewalLoanPeriod']);
            });

            it('should have a proper value', () => {
              const period = getPeriodRepresentation(loanPolicy.requestManagement.holds.alternateRenewalLoanPeriod);
              expect(LoanPolicyDetail.requestManagement.alternateRenewalLoanPeriod.value.text).to.equal(period);
            });
          });
        });
      });
    });
  });
});
