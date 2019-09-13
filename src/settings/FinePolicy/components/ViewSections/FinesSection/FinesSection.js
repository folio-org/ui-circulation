import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

const FinesSection = (props) => {
  const {
    policy,
    getCheckboxValue,
    fineSectionOpen,
    accordionOnToggle,
  } = props;

  const { overdueFine, overdueRecallFine } = policy;

  return (
    <div data-test-fine-policy-detail-fines-section>
      <Accordion
        id="fineSection"
        label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFine" />}
        open={fineSectionOpen}
        onToggle={accordionOnToggle}
      >
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-overdue>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFine" />}
                value={overdueFine.quantity >= 0 ? `${parseFloat(overdueFine.quantity).toFixed(2)}  per ${overdueFine.intervalId}` : '-'}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-count-closed>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.countClosedDHM" />}
                value={getCheckboxValue(policy.countClosed)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-max-overdue>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumOverdueFine" />}
                value={parseFloat(policy.maxOverdueFine || 0.00).toFixed(2)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div data-test-fines-section-forgive-overdue>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.forgiveOverdueFine" />}
                value={getCheckboxValue(policy.forgiveOverdueFine)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-overdue-recall>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueRecallFine" />}
                value={overdueRecallFine.quantity >= 0 ? `${parseFloat(overdueRecallFine.quantity).toFixed(2)}   per  ${overdueRecallFine.intervalId}` : '-'}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-grace-period>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls" />}
                value={getCheckboxValue(policy.gracePeriodRecall)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-fines-section-max-overdue-recall>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumRecallOverdueFine" />}
                value={parseFloat(policy.maxOverdueRecallFine || 0.00).toFixed(2)}
              />
            </div>
          </Col>
        </Row>
      </Accordion>
    </div>
  );
};

FinesSection.propTypes = {
  policy: PropTypes.object.isRequired,
  getCheckboxValue: PropTypes.func.isRequired,
  fineSectionOpen: PropTypes.bool.isRequired,
  accordionOnToggle: PropTypes.func,
};

export default FinesSection;
