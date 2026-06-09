import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { IfInterface } from '@folio/stripes/core';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
  TextArea,
} from '@folio/stripes/components';
import { staffSlipNameI18nMap } from '../../../../../constants';


const StaffSlipAboutSection = ({ initialValues, disabled }) => {
  const { formatMessage } = useIntl();
  const localizedName = staffSlipNameI18nMap[initialValues?.name]
    ? formatMessage({ id: staffSlipNameI18nMap[initialValues.name] })
    : initialValues?.name;

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
              value={localizedName}
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
