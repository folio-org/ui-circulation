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
    connect,
    metadata,
    policyName,
    isPolicyActive = false,
    policyDescription = '',
  } = props;

  const active = isPolicyActive
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.yes" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.no" />;

  return (
    <div data-test-notice-policy-detail-general-section>
      <Accordion
        data-testid="generalInformationTestId"
        id="generalNoticePolicy"
        label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
      >
        <Metadata
          connect={connect}
          metadata={metadata}
        />
        <Row data-testid="policyNameTestId">
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
        <Row data-testid="policyActiveTestId">
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
        <Row data-testid="policyDescriptionTestId">
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
    </div>
  );
};

GeneralSection.propTypes = {
  metadata: PropTypes.object.isRequired,
  isPolicyActive: PropTypes.bool,
  policyName: PropTypes.string.isRequired,
  policyDescription: PropTypes.string,
  connect: PropTypes.func.isRequired,
};

export default GeneralSection;
