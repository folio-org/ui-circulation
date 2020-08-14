import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

import { Metadata } from '../../../../components';

const GeneralSection = (props) => {
  const {
    isOpen,
    connect,
    metadata,
    policyName,
    isPolicyActive,
    policyDescription,
  } = props;

  const active = isPolicyActive
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.yes" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.no" />;

  return (
    <Accordion
      data-test-notice-policy-detail-general-section
      open={isOpen}
      id="generalInformation"
      label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
    >
      <Metadata
        connect={connect}
        metadata={metadata}
      />
      <Row>
        <Col
          xs={12}
          data-notice-policy-name
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyName" />}
            value={policyName}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-notice-policy-active
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
            value={active}
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-notice-policy-description
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
            value={policyDescription}
          />
        </Col>
      </Row>
    </Accordion>
  );
};


GeneralSection.propTypes = {
  metadata: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isPolicyActive: PropTypes.bool,
  policyName: PropTypes.string.isRequired,
  policyDescription: PropTypes.string,
  connect: PropTypes.func.isRequired,
};

GeneralSection.defaultProps = {
  policyDescription: '',
  isPolicyActive: false,
};

export default GeneralSection;
