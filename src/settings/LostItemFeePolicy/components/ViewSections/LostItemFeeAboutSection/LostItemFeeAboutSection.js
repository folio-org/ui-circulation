import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const LostItemFeeAboutSection = (props) => {
  const { getValue } = props;

  return (
    <div data-test-loan-policy-detail-about-section>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-name>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemFeePolicyName" />}
              value={getValue('name')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-description>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.description" />}
              value={getValue('description') || '-'}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

LostItemFeeAboutSection.propTypes = {
  getValue: PropTypes.func.isRequired,
};

export default LostItemFeeAboutSection;
