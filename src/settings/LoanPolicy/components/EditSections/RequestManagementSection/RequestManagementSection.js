import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Accordion,
  AccordionSet,
  AccordionStatus,
} from '@folio/stripes/components';

import optionsGenerator from '../../../../utils/options-generator';
import Period from '../../../../components/Period';
import {
  intervalPeriods,
  loanProfileMap,
} from '../../../../../constants';

class RequestManagementSection extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    policy: PropTypes.shape({
      loanable: PropTypes.bool,
      loansPolicy: PropTypes.shape({
        profileId: PropTypes.string,
      }),
      requestManagement: PropTypes.shape({
        recalls: PropTypes.shape({
          allowRecallsToExtendOverdueLoans: PropTypes.bool,
        }),
        holds: PropTypes.shape({
          renewItemsWithRequest: PropTypes.bool,
        }),
      }),
    }).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  render() {
    const {
      policy,
      change,
      intl: {
        formatMessage,
      },
    } = this.props;

    if (!policy.loanable) {
      return null;
    }

    const selectIntervalPeriods = this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval');

    return (
      <div
        data-testid="requestManagementSection"
        data-test-loan-policy-form-request-management-section
      >
        <h2
          data-testid="requestManagementTitle"
          data-test-renewals-request-management-section-header
        >
          <FormattedMessage id="ui-circulation.settings.requestManagement.requestManagement" />
        </h2>
        <AccordionStatus>
          <AccordionSet>
            <Accordion
              id="recallsSection"
              label={formatMessage({ id: 'ui-circulation.settings.requestManagement.recalls' })}
            >
              <div data-test-request-management-section-recall-return-interval>
                <Period
                  fieldLabel="ui-circulation.settings.requestManagement.recallReturnInterval"
                  inputValuePath="requestManagement.recalls.recallReturnInterval.duration"
                  selectValuePath="requestManagement.recalls.recallReturnInterval.intervalId"
                  intervalPeriods={selectIntervalPeriods}
                  changeFormValue={change}
                />
              </div>
              <div data-test-request-management-section-minimum-guaranteed-loan-period>
                <Period
                  fieldLabel="ui-circulation.settings.requestManagement.minimumGuaranteedLoanPeriod"
                  inputValuePath="requestManagement.recalls.minimumGuaranteedLoanPeriod.duration"
                  selectValuePath="requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId"
                  intervalPeriods={selectIntervalPeriods}
                  changeFormValue={change}
                />
              </div>
              <div data-test-request-management-section-recalls-extend-overdue-loans>
                <Field
                  label={formatMessage({ id: 'ui-circulation.settings.requestManagement.allowRecallsToExtendOverdueLoans' })}
                  name="requestManagement.recalls.allowRecallsToExtendOverdueLoans"
                  id="requestManagement.recalls.allowRecallsToExtendOverdueLoans"
                  component={Checkbox}
                  type="checkbox"
                />
              </div>
              <br />
              {
                policy.requestManagement?.recalls?.allowRecallsToExtendOverdueLoans &&
                <div
                  data-testid="alternateRecallReturnIntervalPeriod"
                  data-test-request-management-section-alternate-recall-return-interval
                >
                  <Period
                    fieldLabel="ui-circulation.settings.requestManagement.alternateRecallReturnInterval"
                    inputValuePath="requestManagement.recalls.alternateRecallReturnInterval.duration"
                    selectValuePath="requestManagement.recalls.alternateRecallReturnInterval.intervalId"
                    intervalPeriods={selectIntervalPeriods}
                    changeFormValue={change}
                  />
                </div>
              }
            </Accordion>
            <Accordion
              id="holdsSection"
              label={formatMessage({ id: 'ui-circulation.settings.requestManagement.holds' })}
            >
              <div data-test-request-management-section-alternate-checkout-loan-period>
                <Period
                  fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
                  inputValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.duration"
                  selectValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.intervalId"
                  intervalPeriods={selectIntervalPeriods}
                  changeFormValue={change}
                />
              </div>
              <div data-test-request-management-section-renew-items-with-request>
                <Field
                  label={formatMessage({ id: 'ui-circulation.settings.requestManagement.renewItemsWithRequest' })}
                  name="requestManagement.holds.renewItemsWithRequest"
                  id="requestManagement.holds.renewItemsWithRequest"
                  component={Checkbox}
                  type="checkbox"
                />
              </div>
              <br />
              {
                policy.loansPolicy?.profileId === loanProfileMap.ROLLING &&
                policy.requestManagement?.holds?.renewItemsWithRequest &&
                <div
                  data-testid="alternateRenewalLoanPeriod"
                  data-test-request-management-section-alternate-renewal-loan-period
                >
                  <Period
                    fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
                    inputValuePath="requestManagement.holds.alternateRenewalLoanPeriod.duration"
                    selectValuePath="requestManagement.holds.alternateRenewalLoanPeriod.intervalId"
                    intervalPeriods={selectIntervalPeriods}
                    changeFormValue={change}
                  />
                </div>
              }
            </Accordion>
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default injectIntl(RequestManagementSection);
