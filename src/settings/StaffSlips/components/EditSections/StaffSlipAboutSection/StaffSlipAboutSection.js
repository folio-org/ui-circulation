import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Row,
  TextArea,
} from '@folio/stripes/components';

const StaffSlipAboutSection = ({ initialValues, disabled }) => {
  return (
    <div
      data-test-staff-slip-edit-about-section
      data-testid="staffSlipAboutSectionEditTestId"
    >
      <Row>
        <Col xs={12}>
          <div
            data-test-staff-slip-name
            data-testid="staffSlipName"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
              value={initialValues?.name}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          data-test-staff-slip-description
          xs={12}
        >
          <Field
            label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
            name="description"
            id="input-staff-slip-description"
            data-testid="staffSlipDescription"
            autoFocus
            component={TextArea}
            fullWidth
            disabled={disabled}
          />
        </Col>
      </Row>
    </div>
  );
};

StaffSlipAboutSection.propTypes = {
  initialValues: PropTypes.object,
  disabled: PropTypes.bool,
};

export default StaffSlipAboutSection;
