import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';

const GeneralSection = (props) => {
  const {
    isOpen,
    onToggle,
    policyName,
    isPolicyActive,
    policyDescription,
  } = props;

  const active = isPolicyActive
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.yes" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.no" />;

  return (
    <Accordion
      open={isOpen}
      id="generalInformation"
      onToggle={onToggle}
      label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
    >
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
            value={policyName}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
            value={active}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
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
  isOpen: PropTypes.bool.isRequired,
  isPolicyActive: PropTypes.bool.isRequired,
  policyName: PropTypes.string.isRequired,
  policyDescription: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default GeneralSection;
