import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

import css from './AboutSection.css';

const AboutSection = (props) => {
  const { getValue } = props;

  return (
    <div data-test-loan-policy-detail-about-section>
      <Row>
        <Col xs={12}>
          <h2
            className={css.header}
            data-test-about-section-header
          >
            <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-name>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
              value={getValue('name')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-about-section-policy-description>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
              value={getValue('description')}
            />
          </div>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

AboutSection.propTypes = {
  getValue: PropTypes.func.isRequired,
};

export default AboutSection;
