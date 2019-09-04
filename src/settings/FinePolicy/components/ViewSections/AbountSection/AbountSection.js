import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const AboutSection = (props) => {
  const { getValue } = props;

  return (
    <div data-test-fine-policy-detail-about-section>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-name>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFinePolicyName" />}
              value={getValue('name')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-description>
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

AboutSection.propTypes = {
  getValue: PropTypes.func.isRequired,
};

export default AboutSection;
