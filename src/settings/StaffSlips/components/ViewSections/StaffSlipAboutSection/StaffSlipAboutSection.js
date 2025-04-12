import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IfInterface } from '@folio/stripes/core';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const StaffSlipAboutSection = ({ staffSlip }) => {
  return (
    <div
      data-test-staff-slip-detail-about-section
      data-testid="staffSlipAboutSectionTestId"
    >
      <Row>
        <Col xs={12}>
          <div
            data-test-staff-slip-name
            data-testid="staffSlipName"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
              value={staffSlip.name}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div
            data-test-about-section-staff-slip-description
            data-testid="staffSlipDescription"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
              value={staffSlip.description}
            />
          </div>
        </Col>
      </Row>
      {/* Version 1.1 of the `staff-slips-storage` interface added the `isRawHtml` field */}
      <IfInterface name="staff-slips-storage" version="1.1">
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.isRawHtml" />}
              value={staffSlip.isRawHtml ?
                     <FormattedMessage id="ui-circulation.settings.common.yes" /> :
                     <FormattedMessage id="ui-circulation.settings.common.no" />}
            />
          </Col>
        </Row>
      </IfInterface>
    </div>
  );
};

StaffSlipAboutSection.propTypes = {
  staffSlip: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default StaffSlipAboutSection;
