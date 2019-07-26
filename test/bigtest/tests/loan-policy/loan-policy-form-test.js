import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import translation from '../../../../translations/ui-circulation/en';

import {
  shortTermLoansOptions,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  CURRENT_DUE_DATE_TIME,
} from '../../../../src/constants';
import setupApplication from '../../helpers/setup-application';
import LoanPolicyForm from '../../interactors/loan-policy/loan-policy-form';
import LoanPolicyDetail from '../../interactors/loan-policy/loan-policy-detail';
import {
  getOptionsRepresentation,
} from '../../helpers/messageConverters';

describe('LoanPolicyForm', () => {
  setupApplication();

  describe('accordions', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/loan-policies?layer=add');
    });

    it('should be displayed', () => {
      expect(LoanPolicyForm.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await LoanPolicyForm.expandAll.click();
      });

      it('aboutSection should not be displayed', () => {
        expect(LoanPolicyForm.aboutSection.isHidden).to.be.true;
      });

      it('loansSection should not be displayed', () => {
        expect(LoanPolicyForm.loansSection.isHidden).to.be.true;
      });

      it('renewalsSection should not be displayed', () => {
        expect(LoanPolicyForm.renewalsSection.isHidden).to.be.true;
      });

      it('requestManagement should not be displayed', () => {
        expect(LoanPolicyForm.requestManagementSection.isHidden).to.be.true;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await LoanPolicyForm.expandAll.click();
        });

        it('aboutSection should be displayed', () => {
          expect(LoanPolicyForm.aboutSection.isVisible).to.be.true;
        });

        it('loansSection should be displayed', () => {
          expect(LoanPolicyForm.loansSection.isVisible).to.be.true;
        });

        it('renewalsSection should be displayed', () => {
          expect(LoanPolicyForm.renewalsSection.isVisible).to.be.true;
        });

        it('requestManagement should be displayed', () => {
          expect(LoanPolicyForm.requestManagementSection.isVisible).to.be.true;
        }).timeout(3000);
      });
    });
  });

  describe('create a new loan policy', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/loan-policies?layer=add');
    });

    describe('\n\tabout section\n', () => {
      it('should be displayed', () => {
        expect(LoanPolicyForm.aboutSection.isPresent).to.be.true;
      });

      describe('header', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.aboutSection.header.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(LoanPolicyForm.aboutSection.header.text).to.equal(translation['settings.loanPolicy.about']);
        });
      });

      describe('loan policy name', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.aboutSection.policyName.isPresent).to.be.true;
        });

        it('should have proper label', () => {
          expect(LoanPolicyForm.aboutSection.policyName.label).to.contain(translation['settings.loanPolicy.policyName']);
        });
      });

      describe('loan policy description', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.aboutSection.policyDescription.isPresent).to.be.true;
        });

        it('should have proper label', () => {
          expect(LoanPolicyForm.aboutSection.policyDescription.label).to.equal(
            translation['settings.loanPolicy.policyDescription']
          );
        });
      });

      describe('\n\tloans section\n', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.loansSection.isPresent).to.be.true;
        });

        describe('header', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.header.isPresent).to.be.true;
            });

            it('should have proper text', () => {
              expect(LoanPolicyForm.loansSection.header.text).to.equal(translation['settings.loanPolicy.loans']);
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.header.isPresent).to.be.true;
            });

            it('should have proper text', () => {
              expect(LoanPolicyForm.loansSection.header.text).to.equal(translation['settings.loanPolicy.loans']);
            });
          });
        });

        describe('loanable', () => {
          it('should be displayed', () => {
            expect(LoanPolicyForm.loansSection.loanable.isPresent).to.be.true;
          });

          it('should have proper label', () => {
            expect(LoanPolicyForm.loansSection.loanable.text).to.equal(translation['settings.loanPolicy.loanable']);
          });

          it('should be checked by default', () => {
            expect(LoanPolicyForm.loansSection.loanable.isChecked).to.be.true;
          });
        });

        describe('loan profile', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.loanProfile.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.loanProfile.label).to.contain(translation['settings.loanPolicy.loanProfile']);
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.loanProfile.isPresent).to.be.false;
            });
          });
        });

        describe('loan period', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-rolling\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.loanPeriod.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.loanPeriod.label).to.contain(translation['settings.loanPolicy.loanPeriod']);
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-fixed\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.fixed']);
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.loanPeriod.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.loanPeriod.isPresent).to.be.false;
            });
          });
        });

        describe('fixed due date schedule', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-rolling\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.fixedDueDateScheduleId.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.fixedDueDateScheduleId.label).to.equal(
                translation['settings.loanPolicy.fDDSlimit']
              );
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-fixed\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.fixed']);
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.fixedDueDateScheduleId.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.fixedDueDateScheduleId.label).to.contain(translation['settings.loanPolicy.fDDS']);
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.fixedDueDateScheduleId.isPresent).to.be.false;
            });
          });
        });

        describe('closed due date management', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.closedDueDateMgmt.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.closedDueDateMgmt.label).to.equal(`${translation['settings.loanPolicy.closedDueDateMgmt']} *`);
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.closedDueDateMgmt.isPresent).to.be.false;
            });
          });
        });

        describe('opening time offset', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.openingTimeOffset.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.openingTimeOffset.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-short term loan\n\t\t-closed library due date management - beginning of the next open service point hours\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
              await LoanPolicyForm.loansSection.loanPeriod.fillAndBlurDuration(2);
              await LoanPolicyForm.loansSection.loanPeriod.selectAndBlurInterval(translation['settings.common.hours']);
              await LoanPolicyForm.loansSection.closedDueDateMgmt.selectAndBlur(
                getOptionsRepresentation(shortTermLoansOptions, BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS)
              );
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.openingTimeOffset.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.openingTimeOffset.label).to.contain(translation['settings.loanPolicy.openingTimeOffset']);
            });
          });
        });

        describe('grace period', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.loansSection.gracePeriod.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.loansSection.gracePeriod.label).to.equal(translation['settings.loanPolicy.gracePeriod']);
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.loansSection.gracePeriod.isPresent).to.be.false;
            });
          });
        });
      });

      describe('\n\trenewals section\n', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.renewalsSection.isPresent).to.be.true;
        });

        describe('loan policy:\n\t\tnot loanable\n', () => {
          beforeEach(async () => {
            await LoanPolicyForm.loansSection.loanable.clickAndBlur();
          });

          it('should not be displayed', () => {
            expect(LoanPolicyForm.renewalsSection.isPresent).to.be.false;
          });
        });

        describe('header', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.header.isPresent).to.be.true;
            });

            it('should have proper text', () => {
              expect(LoanPolicyForm.renewalsSection.header.text).to.equal(
                translation['settings.loanPolicy.renewals']
              );
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.header.isPresent).to.be.false;
            });
          });
        });

        describe('renewable', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewable.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.renewable.text).to.equal(
                translation['settings.loanPolicy.renewable']
              );
            });

            it('should be checked by default', () => {
              expect(LoanPolicyForm.renewalsSection.renewable.isChecked).to.be.true;
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewable.isPresent).to.be.false;
            });
          });
        });

        describe('unlimited renewals', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.unlimitedRenewals.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.unlimitedRenewals.text).to.equal(
                translation['settings.loanPolicy.unlimitedRenewals']
              );
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.unlimitedRenewals.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\tloanable\n\t\tnot renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.unlimitedRenewals.isPresent).to.be.false;
            });
          });
        });

        describe('number renewals allowed', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-limited renewals\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.numRenewalsAllowed.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.numRenewalsAllowed.label).to.contain(translation['settings.loanPolicy.numRenewalsAllowed']);
            });
          });

          describe('loan policy:\n\t\tnot loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.numRenewalsAllowed.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\tloanable\n\t\tnot renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.numRenewalsAllowed.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-unlimited renewals\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.unlimitedRenewals.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.numRenewalsAllowed.isPresent).to.be.false;
            });
          });
        });

        describe('renew from', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-rolling\n\t\t-renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewFrom.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.renewFrom.label).to.equal(
                `${translation['settings.loanPolicy.renewFrom']} *`
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n\t\t-renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewFrom.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-not renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewFrom.isPresent).to.be.false;
            });
          });
        });

        describe('renewal period different', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewalPeriodDifferent.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.renewalPeriodDifferent.text).to.equal(
                translation['settings.loanPolicy.renewalPeriodDifferent']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n\t\t-renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewalPeriodDifferent.isPresent).to.be.false;
            });
          });


          describe('loan policy:\n\t\t-loanable\n\t\t-not renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.renewalPeriodDifferent.isPresent).to.be.false;
            });
          });
        });

        describe('alternate loan period renewals', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n', () => {
            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-not loanable\n\t\t-renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-not renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-fixed\n\t\t-different period\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.fixed']);
              await LoanPolicyForm.renewalsSection.renewalPeriodDifferent.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-rolling\n\t\t-different period\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
              await LoanPolicyForm.renewalsSection.renewalPeriodDifferent.clickAndBlur();
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.alternateLoanPeriodRenewals.label).to.contain(translation['settings.loanPolicy.alternateLoanPeriodRenewals']);
            });
          });
        });

        describe('alternate fixed due date schedule', () => {
          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n', () => {
            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-not loanable\n\t\t-renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-not renewable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.renewalsSection.renewable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.isPresent).to.be.false;
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-fixed\n\t\t-different period\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.fixed']);
              await LoanPolicyForm.renewalsSection.renewalPeriodDifferent.clickAndBlur();
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.label).to.equal(
                translation['settings.loanPolicy.altFDDSforRenewals']
              );
            });
          });

          describe('loan policy:\n\t\t-loanable\n\t\t-renewable\n\t\t-rolling\n\t\t-different period\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling']);
              await LoanPolicyForm.renewalsSection.renewalPeriodDifferent.clickAndBlur();
            });

            it('should be displayed', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.renewalsSection.alternateFixedDueDateSchedule.label).to.equal(
                translation['settings.loanPolicy.altFDDSDueDateLimit']
              );
            });
          });
        });
      });
    });

    describe('\n\trequest management section\n', () => {
      describe('loan policy:\n\t\t-loanable\n', () => {
        it('should be displayed', () => {
          expect(LoanPolicyForm.requestManagementSection.isPresent).to.be.true;
        });
      });

      describe('loan policy:\n\t\t-not loanable\n', () => {
        beforeEach(async () => {
          await LoanPolicyForm.loansSection.loanable.clickAndBlur();
        });

        it('should not be displayed', () => {
          expect(LoanPolicyForm.requestManagementSection.isPresent).to.be.false;
        });
      });

      describe('header', () => {
        describe('loan policy:\n\t\t-loanable\n', () => {
          it('should be displayed', () => {
            expect(LoanPolicyForm.requestManagementSection.header.isPresent).to.be.true;
          });

          it('should have proper text', () => {
            expect(LoanPolicyForm.requestManagementSection.header.text).to.equal(
              translation['settings.requestManagement.requestManagement']
            );
          });
        });

        describe('loan policy:\n\t\tnot loanable\n', () => {
          beforeEach(async () => {
            await LoanPolicyForm.loansSection.loanable.clickAndBlur();
          });

          it('should not be displayed', () => {
            expect(LoanPolicyForm.renewalsSection.header.isPresent).to.be.false;
          });
        });
      });

      describe('recalls', () => {
        describe('recall return interval', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.recallReturnInterval.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.requestManagementSection.recallReturnInterval.label).to.equal(
                translation['settings.requestManagement.recallReturnInterval']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.recallReturnInterval.isPresent).to.be.false;
            });
          });
        });

        describe('minimum guaranteed loan period', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.minimumGuaranteedLoanPeriod.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.requestManagementSection.minimumGuaranteedLoanPeriod.label).to.equal(
                translation['settings.requestManagement.minimumGuaranteedLoanPeriod']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.minimumGuaranteedLoanPeriod.isPresent).to.be.false;
            });
          });
        });
      });

      describe('holds', () => {
        describe('alternate checkout loan period', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateCheckoutLoanPeriod.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateCheckoutLoanPeriod.label).to.equal(
                translation['settings.requestManagement.alternateCheckoutLoanPeriod']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateCheckoutLoanPeriod.isPresent).to.be.false;
            });
          });
        });

        describe('renew items with request', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.renewItemsWithRequest.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.requestManagementSection.renewItemsWithRequest.text).to.equal(
                translation['settings.requestManagement.renewItemsWithRequest']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.renewItemsWithRequest.isPresent).to.be.false;
            });
          });
        });

        describe('alternate renewal loan period', () => {
          describe('loan policy:\n\t\t-loanable\n', () => {
            it('should be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateRenewalLoanPeriod.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateRenewalLoanPeriod.label).to.equal(
                translation['settings.requestManagement.alternateRenewalLoanPeriod']
              );
            });
          });

          describe('loan policy:\n\t\t-not loanable\n', () => {
            beforeEach(async () => {
              await LoanPolicyForm.loansSection.loanable.clickAndBlur();
            });

            it('should not be displayed', () => {
              expect(LoanPolicyForm.requestManagementSection.alternateRenewalLoanPeriod.isPresent).to.be.false;
            });
          });
        });
      });
    });

    describe('filling form and saving new policy', () => {
      const newLoanPolicyName = 'new loan policy';

      beforeEach(async function () {
        await LoanPolicyForm
          .aboutSection.policyName.fillAndBlur(newLoanPolicyName)
          .loansSection.loanProfile.selectAndBlur(translation['settings.loanPolicy.profileType.rolling'])
          .loansSection.loanPeriod.duration.fillAndBlur(2)
          .loansSection.loanPeriod.selectAndBlurInterval(translation['settings.common.hours'])
          .loansSection.closedDueDateMgmt.selectAndBlur(
            getOptionsRepresentation(shortTermLoansOptions, CURRENT_DUE_DATE_TIME)
          )
          .renewalsSection.numRenewalsAllowed.fillAndBlur(1)
          .renewalsSection.renewFrom.selectAndBlur(translation['settings.loanPolicy.renewFrom.systemDate'])
          .save();
      });

      it('renders updated policy name', function () {
        expect(LoanPolicyDetail.aboutSection.policyName.value.text).to.equal(newLoanPolicyName);
      });
    });
  });
});
