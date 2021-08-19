import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const OverdueAboutSection = (props) => {
  const { getValue } = props;

  return (
    <div
      data-test-fine-policy-detail-about-section
      data-testid="overdueAboutSectionTestId"
    >
      <Row>
        <Col xs={12}>
          <div
            data-test-about-section-policy-name
            data-testid="nameTestId"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFinePolicyName" />}
              value={getValue('name')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div
            data-test-about-section-policy-description
            data-testid="descriptionTestId"
          >
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.description" />}
              value={getValue('description') || '-'}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

OverdueAboutSection.propTypes = {
  getValue: PropTypes.func.isRequired,
};

export default OverdueAboutSection;
