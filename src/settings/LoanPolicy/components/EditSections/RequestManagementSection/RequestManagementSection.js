import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Accordion,
} from '@folio/stripes/components';

import optionsGenerator from '../../../../utils/options-generator';
import Period from '../../../../components/Period';
import {
  intervalPeriods,
  loanProfileMap,
} from '../../../../../constants';

class RequestManagementSection extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    policy: PropTypes.object.isRequired,
    holdsSectionOpen: PropTypes.bool.isRequired,
    recallsSectionOpen: PropTypes.bool.isRequired,
    accordionOnToggle: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  render() {
    const {
      policy,
      holdsSectionOpen,
      recallsSectionOpen,
      accordionOnToggle,
      change,
    } = this.props;

    if (!policy.loanable) {
      return null;
    }

    return (
      <div data-test-loan-policy-form-request-management-section>
        <h2 data-test-renewals-request-management-section-header>
          <FormattedMessage id="ui-circulation.settings.requestManagement.requestManagement" />
        </h2>
        <Accordion
          id="recallsSection"
          open={recallsSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.recalls" />}
        >
          <div data-test-request-management-section-recall-return-interval>
            <Period
              fieldLabel="ui-circulation.settings.requestManagement.recallReturnInterval"
              inputValuePath="requestManagement.recalls.recallReturnInterval.duration"
              selectValuePath="requestManagement.recalls.recallReturnInterval.intervalId"
              intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
            />
          </div>
          <div data-test-request-management-section-minimum-guaranteed-loan-period>
            <Period
              fieldLabel="ui-circulation.settings.requestManagement.minimumGuaranteedLoanPeriod"
              inputValuePath="requestManagement.recalls.minimumGuaranteedLoanPeriod.duration"
              selectValuePath="requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId"
              intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
            />
          </div>
          <div data-test-request-management-section-recalls-extend-overdue-loans>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.requestManagement.allowRecallsToExtendOverdueLoans" />}
              name="requestManagement.recalls.allowRecallsToExtendOverdueLoans"
              id="requestManagement.recalls.allowRecallsToExtendOverdueLoans"
              component={Checkbox}
              type="checkbox"
            />
          </div>
          <br />
          {
            policy.requestManagement?.recalls?.allowRecallsToExtendOverdueLoans &&
            <div data-test-request-management-section-alternate-recall-return-interval>
              <Period
                fieldLabel="ui-circulation.settings.requestManagement.alternateRecallReturnInterval"
                inputValuePath="requestManagement.recalls.alternateRecallReturnInterval.duration"
                selectValuePath="requestManagement.recalls.alternateRecallReturnInterval.intervalId"
                intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
                changeFormValue={change}
              />
            </div>
          }
        </Accordion>
        <Accordion
          id="holdsSection"
          open={holdsSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.holds" />}
        >
          <div data-test-request-management-section-alternate-checkout-loan-period>
            <Period
              fieldLabel="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod"
              inputValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.duration"
              selectValuePath="requestManagement.holds.alternateCheckoutLoanPeriod.intervalId"
              intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
            />
          </div>
          <div data-test-request-management-section-renew-items-with-request>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
              name="requestManagement.holds.renewItemsWithRequest"
              id="requestManagement.holds.renewItemsWithRequest"
              component={Checkbox}
              type="checkbox"
            />
          </div>
          <br />
          {
            get(policy, 'loansPolicy.profileId') === loanProfileMap.ROLLING &&
            get(policy, 'requestManagement.holds.renewItemsWithRequest') &&
            <div data-test-request-management-section-alternate-renewal-loan-period>
              <Period
                fieldLabel="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod"
                inputValuePath="requestManagement.holds.alternateRenewalLoanPeriod.duration"
                selectValuePath="requestManagement.holds.alternateRenewalLoanPeriod.intervalId"
                intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
                changeFormValue={change}
              />
            </div>
          }
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(RequestManagementSection);
