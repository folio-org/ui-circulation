import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';
import {
  Checkbox,
  Accordion,
} from '@folio/stripes/components';
import {
  intervalPeriods,
  loanProfileMap,
} from '../../../../../constants';
import Period from '../../../../components/Period';
import RequestManagementSection from './RequestManagementSection';

jest.mock('../../../../utils/options-generator', () => jest.fn((
  formatMessage,
  periods,
  label,
) => ({
  periods,
  label,
})));

jest.mock('../../../../components/Period', () => jest.fn(() => null));

describe('RequestManagementSection', () => {
  const testIds = {
    alternateRecallReturnIntervalPeriod: 'alternateRecallReturnIntervalPeriod',
    alternateRenewalLoanPeriod: 'alternateRenewalLoanPeriod',
    requestManagementSection: 'requestManagementSection',
  };
  const labelIds = {
    requestManagement: 'ui-circulation.settings.requestManagement.requestManagement',
    recalls: 'ui-circulation.settings.requestManagement.recalls',
    holds: 'ui-circulation.settings.requestManagement.holds',
    recallReturnInterval: 'ui-circulation.settings.requestManagement.recallReturnInterval',
    selectInterval: 'ui-circulation.settings.loanPolicy.selectInterval',
    minimumGuaranteedLoanPeriod: 'ui-circulation.settings.requestManagement.minimumGuaranteedLoanPeriod',
    alternateCheckoutLoanPeriod: 'ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod',
    allowRecallsToExtendOverdueLoans: 'ui-circulation.settings.requestManagement.allowRecallsToExtendOverdueLoans',
    renewItemsWithRequest: 'ui-circulation.settings.requestManagement.renewItemsWithRequest',
    alternateRecallReturnInterval: 'ui-circulation.settings.requestManagement.alternateRecallReturnInterval',
    alternateRenewalLoanPeriod: 'ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod',
  };
  const changeMock = jest.fn();
  const defaultTestProps = {
    policy: {},
    change: changeMock,
  };
  const periodCallOrderByPlace = {
    recallReturnInterval: 1,
    minimumGuaranteedLoan: 2,
    alternateRecallReturnInterval: 3,
    alternateCheckoutLoan: 3,
    alternateRenewalLoan: 4,
  };
  const accordionCallOrderByPlace = {
    recallsSection: 1,
    holdsSection: 2,
  };
  const fieldCallOrderByPlace = {
    allowRecallsToExtendOverdueLoans: 1,
    renewItemsWithRequest: 2,
  };
  const intervarPeriodsExpectedValue = {
    periods: intervalPeriods,
    label: labelIds.selectInterval,
  };
  const periodCommonExpectedProps = {
    intervalPeriods: intervarPeriodsExpectedValue,
    changeFormValue: changeMock,
  };
  const fieldCommonExpectedProps = {
    component: Checkbox,
    type: 'checkbox',
  };

  afterEach(() => {
    Accordion.mockClear();
    changeMock.mockClear();
    Period.mockClear();
    Field.mockClear();
    Checkbox.mockClear();
  });

  describe('when "policy.loanable" is absent', () => {
    it('should not render component', () => {
      render(
        <RequestManagementSection
          {...defaultTestProps}
        />
      );

      expect(screen.queryByTestId(testIds.requestManagementSection)).not.toBeInTheDocument();
    });
  });

  describe('when "policy.loanable" is true', () => {
    beforeEach(() => {
      render(
        <RequestManagementSection
          {...defaultTestProps}
          policy={{
            loanable: true,
          }}
        />
      );
    });

    it('should render component', () => {
      expect(screen.getByTestId(testIds.requestManagementSection)).toBeVisible();
    });

    it('should render request management title', () => {
      expect(within(screen.getByTestId(testIds.requestManagementSection))
        .getByText(labelIds.requestManagement)).toBeVisible();
    });

    it('should render "recall return interval" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.recallReturnInterval,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.recallReturnInterval,
          inputValuePath: 'requestManagement.recalls.recallReturnInterval.duration',
          selectValuePath: 'requestManagement.recalls.recallReturnInterval.intervalId',
        }, {}
      );
    });

    it('should render "minimum guaranteed loan" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.minimumGuaranteedLoan,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.minimumGuaranteedLoanPeriod,
          inputValuePath: 'requestManagement.recalls.minimumGuaranteedLoanPeriod.duration',
          selectValuePath: 'requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId',
        }, {}
      );
    });

    it('should render "alternate checkout loan" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.alternateCheckoutLoan,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.alternateCheckoutLoanPeriod,
          inputValuePath: 'requestManagement.holds.alternateCheckoutLoanPeriod.duration',
          selectValuePath: 'requestManagement.holds.alternateCheckoutLoanPeriod.intervalId',
        }, {}
      );
    });

    it('should render "allow recalls to extend overdue loans" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.allowRecallsToExtendOverdueLoans,
        {
          ...fieldCommonExpectedProps,
          label: labelIds.allowRecallsToExtendOverdueLoans,
          name: 'requestManagement.recalls.allowRecallsToExtendOverdueLoans',
          id: 'requestManagement.recalls.allowRecallsToExtendOverdueLoans',
        }, {}
      );
    });

    it('should render "renew items with request" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.renewItemsWithRequest,
        {
          ...fieldCommonExpectedProps,
          label: labelIds.renewItemsWithRequest,
          name: 'requestManagement.holds.renewItemsWithRequest',
          id: 'requestManagement.holds.renewItemsWithRequest',
        }, {}
      );
    });
  });

  describe('"recalls section" accordion', () => {
    it('should render accordion', () => {
      render(
        <RequestManagementSection
          {...defaultTestProps}
          policy={{
            loanable: true,
          }}
        />
      );

      expect(Accordion).toHaveBeenNthCalledWith(
        accordionCallOrderByPlace.recallsSection,
        expect.objectContaining({
          id: 'recallsSection',
          label: labelIds.recalls,
        }), {}
      );
    });
  });

  describe('"holds section" accordion', () => {
    it('should render accordion', () => {
      render(
        <RequestManagementSection
          {...defaultTestProps}
          policy={{
            loanable: true,
          }}
        />
      );

      expect(Accordion).toHaveBeenNthCalledWith(
        accordionCallOrderByPlace.holdsSection,
        expect.objectContaining({
          id: 'holdsSection',
          label: labelIds.holds,
        }), {}
      );
    });
  });

  describe('"alternate recall return interval" period', () => {
    [
      {
        describeTitle: 'when "allowRecallsToExtendOverdueLoans" property value is undefined"',
        requestManagement: {
          recalls: {},
        },
      },
      {
        describeTitle: 'when "allowRecallsToExtendOverdueLoans" property value is false',
        requestManagement: {
          recalls: {
            allowRecallsToExtendOverdueLoans: false,
          },
        },
      },
      {
        describeTitle: 'when "allowRecallsToExtendOverdueLoans" property value is true',
        requestManagement: {
          recalls: {
            allowRecallsToExtendOverdueLoans: true,
          },
        },
      },
    ].forEach(({ describeTitle, requestManagement }) => {
      describe(describeTitle, () => {
        beforeEach(() => {
          render(
            <RequestManagementSection
              {...defaultTestProps}
              policy={{
                loanable: true,
                requestManagement,
              }}
            />
          );
        });

        if (requestManagement?.recalls?.allowRecallsToExtendOverdueLoans) {
          it('should render period', () => {
            expect(screen.getByTestId(testIds.alternateRecallReturnIntervalPeriod)).toBeVisible();
            expect(Period).toHaveBeenNthCalledWith(
              periodCallOrderByPlace.alternateRecallReturnInterval,
              {
                ...periodCommonExpectedProps,
                fieldLabel: labelIds.alternateRecallReturnInterval,
                inputValuePath: 'requestManagement.recalls.alternateRecallReturnInterval.duration',
                selectValuePath: 'requestManagement.recalls.alternateRecallReturnInterval.intervalId',
              }, {}
            );
          });
        } else {
          it('should not render period', () => {
            expect(screen.queryByTestId(testIds.alternateRecallReturnIntervalPeriod)).not.toBeInTheDocument();
          });
        }
      });
    });
  });

  describe('"alternate renewal loan" period', () => {
    const testRequestManagement = (loansPolicy) => {
      [
        {
          describeTitle: 'when "renewItemsWithRequest" property value is undefined',
          requestManagement: {
            holds: {},
          },
        },
        {
          describeTitle: 'when "renewItemsWithRequest" property value is false',
          requestManagement: {
            holds: {
              renewItemsWithRequest: false,
            },
          },
        },
        {
          describeTitle: 'when "renewItemsWithRequest" property value is true',
          requestManagement: {
            holds: {
              renewItemsWithRequest: true,
            },
          },
        },
      ].forEach(({ describeTitle, requestManagement }) => {
        describe(describeTitle, () => {
          beforeEach(() => {
            render(
              <RequestManagementSection
                {...defaultTestProps}
                policy={{
                  loanable: true,
                  loansPolicy,
                  requestManagement,
                }}
              />
            );
          });

          if (
            loansPolicy?.profileId === loanProfileMap.ROLLING &&
            requestManagement?.holds?.renewItemsWithRequest
          ) {
            it('should render period', () => {
              expect(screen.getByTestId(testIds.alternateRenewalLoanPeriod)).toBeVisible();
              expect(Period).toHaveBeenNthCalledWith(
                periodCallOrderByPlace.alternateRenewalLoan,
                {
                  ...periodCommonExpectedProps,
                  fieldLabel: labelIds.alternateRenewalLoanPeriod,
                  inputValuePath: 'requestManagement.holds.alternateRenewalLoanPeriod.duration',
                  selectValuePath: 'requestManagement.holds.alternateRenewalLoanPeriod.intervalId',
                }, {}
              );
            });
          } else {
            it('should not render period', () => {
              expect(screen.queryByTestId(testIds.alternateRenewalLoanPeriod)).not.toBeInTheDocument();
            });
          }
        });
      });
    };

    [
      {
        describeTitle: 'when "profileId" property value is undefined',
        loansPolicy: {},
      },
      {
        describeTitle: `when "profileId" property value is "${loanProfileMap.FIXED}"`,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        },
      },
      {
        describeTitle: `when "profileId" property value is "${loanProfileMap.ROLLING}"`,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
        },
      },
    ].forEach(({ describeTitle, loansPolicy }) => {
      describe(describeTitle, () => {
        testRequestManagement(loansPolicy);
      });
    });
  });
});
