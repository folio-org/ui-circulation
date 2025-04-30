import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { IfInterface } from '@folio/stripes/core';

import {
  Checkbox,
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
      {/* Version 1.1 of the `staff-slips-storage` interface added the `isRawHtml` field */}
      <IfInterface name="staff-slips-storage" version="1.1">
        <Row>
          <Col
            data-test-staff-slip-isRawHtml
            xs={12}
          >
            <Field
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.isRawHtml" />}
              name="isRawHtml"
              id="input-staff-slip-isRawHtml"
              data-testid="staffSlipDescriptionIsRawHtml"
              component={Checkbox}
              type="checkbox"
              disabled={disabled}
            />
          </Col>
        </Row>
      </IfInterface>
    </div>
  );
};

StaffSlipAboutSection.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};

export default StaffSlipAboutSection;
