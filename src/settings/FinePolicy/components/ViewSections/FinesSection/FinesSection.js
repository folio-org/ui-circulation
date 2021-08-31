import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

export const getQuantityValue = (fine) => (
  fine.quantity >= 0
    ? (<FormattedMessage
      id="ui-circulation.settings.finePolicy.perPeriod"
      values={{
        number: parseFloat(fine.quantity).toFixed(2),
        period: fine.intervalId,
      }}
    />)
    : '-'
);

export const getFormatedValue = (fine) => parseFloat(fine || 0).toFixed(2);

const FinesSection = (props) => {
  const {
    policy,
    getCheckboxValue,
    fineSectionOpen,
  } = props;
  const { overdueFine, overdueRecallFine } = policy;

  return (
    <div
      data-test-fine-policy-detail-fines-section
      data-testid="detailFinesSection"
    >
      <Accordion
        data-testid="viewFineSectionTestId"
        id="viewFineSection"
        label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFineTitle" />}
        open={fineSectionOpen}
      >
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-overdue
              data-testid="sectionOverdue"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFine" />}
                value={getQuantityValue(overdueFine)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-count-closed
              data-testid="sectionCountClosed"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.countClosedDHM" />}
                value={getCheckboxValue(policy.countClosed)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-max-overdue
              data-testid="sectionMaxOverdue"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumOverdueFine" />}
                value={getFormatedValue(policy.maxOverdueFine)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-forgive-overdue
              data-testid="sectionForgiveOverdue"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.forgiveOverdueFine" />}
                value={getCheckboxValue(policy.forgiveOverdueFine)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-overdue-recall
              data-testid="sectionOverdueRecall"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueRecallFine" />}
                value={getQuantityValue(overdueRecallFine)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-grace-period
              data-testid="sectionGracePeriod"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls" />}
                value={getCheckboxValue(policy.gracePeriodRecall)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-test-fines-section-max-overdue-recall
              data-testid="sectionMaxOverdueRecall"
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumRecallOverdueFine" />}
                value={getFormatedValue(policy.maxOverdueRecallFine)}
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
};

export default FinesSection;
