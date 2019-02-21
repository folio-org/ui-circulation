import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

class RequestManagementSection extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isRecallsOpen: PropTypes.bool.isRequired,
    isHoldsOpen: PropTypes.bool.isRequired,
    requestManagementOptions: PropTypes.object,
    onSectionToggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    requestManagementOptions: {},
  };

  getPeriodValue = (pathToPeriod) => {
    const { requestManagementOptions } = this.props;
    const period = get(requestManagementOptions, pathToPeriod);

    return period ? `${period.duration} ${period.intervalId}` : '-';
  };

  getCheckboxValue = (pathToValue) => {
    const { requestManagementOptions } = this.props;
    const value = get(requestManagementOptions, pathToValue);
    const translationId = value ? 'yes' : 'no';

    return <FormattedMessage id={`ui-circulation.settings.loanPolicy.${translationId}`} />;
  };

  render() {
    const {
      isVisible,
      isRecallsOpen,
      isHoldsOpen,
      onSectionToggle,
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div data-test-loan-policy-detail-request-management-section>
        <h2 data-test-request-management-section-header>
          <FormattedMessage id="ui-circulation.settings.requestManagement.requestManagement" />
        </h2>
        <Accordion
          id="recalls"
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.recalls" />}
          open={isRecallsOpen}
          onToggle={onSectionToggle}
        >
          <Row>
            <Col xs={12}>
              <div data-test-request-management-section-recall-return-interval>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestManagement.recallReturnInterval" />}
                  value={this.getPeriodValue('recalls.recallReturnInterval')}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div data-test-request-management-section-minimum-guaranteed-loan-period>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestManagement.minimumGuaranteedLoanPeriod" />}
                  value={this.getPeriodValue('recalls.minimumGuaranteedLoanPeriod')}
                />
              </div>
            </Col>
          </Row>
        </Accordion>
        <Accordion
          id="holds"
          label={<FormattedMessage id="ui-circulation.settings.requestManagement.holds" />}
          open={isHoldsOpen}
          onToggle={onSectionToggle}
        >
          <Row>
            <Col xs={12}>
              <div data-test-request-management-section-alternate-checkout-loan-period>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestManagement.alternateCheckoutLoanPeriod" />}
                  value={this.getPeriodValue('holds.alternateCheckoutLoanPeriod')}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div data-test-request-management-section-renew-items-with-request>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
                  value={this.getCheckboxValue('holds.renewItemsWithRequest')}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div data-test-request-management-section-alternate-renewal-loan-period>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod" />}
                  value={this.getPeriodValue('holds.alternateRenewalLoanPeriod')}
                />
              </div>
            </Col>
          </Row>
        </Accordion>
      </div>
    );
  }
}

export default RequestManagementSection;
