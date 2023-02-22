import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const StaffSlipAboutSection = ({ staffSlip }) => {
  return (
    <div
      data-test-staff-slip-detail-about-section
      data-testid="StaffSlipAboutSectionTestId"
    >
      <Row>
        <Col xs={12}>
          <div
            data-test-staff-slip-name
            data-testid="nameTestId"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
              value={staffSlip?.name}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div
            data-test-about-section-staff-slip-description
            data-testid="descriptionTestId"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
              value={staffSlip?.description}
            />
          </div>
        </Col>
      </Row>
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
