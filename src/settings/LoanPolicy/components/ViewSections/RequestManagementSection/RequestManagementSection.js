import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

const RequestManagementSection = (props) => {
  const {
    isVisible,
    isRecallsOpen,
    isHoldsOpen,
    getPeriodValue,
    getCheckboxValue,
    onSectionToggle,
  } = props;

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
                value={getPeriodValue('requestManagement.recalls.recallReturnInterval')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-request-management-section-minimum-guaranteed-loan-period>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestManagement.minimumGuaranteedLoanPeriod" />}
                value={getPeriodValue('requestManagement.recalls.minimumGuaranteedLoanPeriod')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-request-management-section-recalls-extend-overdue-loans>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestManagement.allowRecallsToExtendOverdueLoans" />}
                value={getCheckboxValue('requestManagement.recalls.allowRecallsToExtendOverdueLoans')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-request-management-section-alternate-recall-return-interval>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestManagement.alternateRecallReturnInterval" />}
                value={getPeriodValue('requestManagement.recalls.alternateRecallReturnInterval')}
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
                value={getPeriodValue('requestManagement.holds.alternateCheckoutLoanPeriod')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-request-management-section-renew-items-with-request>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestManagement.renewItemsWithRequest" />}
                value={getCheckboxValue('requestManagement.holds.renewItemsWithRequest')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-request-management-section-alternate-renewal-loan-period>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestManagement.alternateRenewalLoanPeriod" />}
                value={getPeriodValue('requestManagement.holds.alternateRenewalLoanPeriod')}
              />
            </div>
          </Col>
        </Row>
      </Accordion>
    </div>
  );
};

RequestManagementSection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isRecallsOpen: PropTypes.bool.isRequired,
  isHoldsOpen: PropTypes.bool.isRequired,
  getPeriodValue: PropTypes.func.isRequired,
  getCheckboxValue: PropTypes.func.isRequired,
  onSectionToggle: PropTypes.func.isRequired,
};

export default RequestManagementSection;
