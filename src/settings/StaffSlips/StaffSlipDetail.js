import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  Row,
  ExpandAllButton,
  Accordion,
  AccordionSet,
  AccordionStatus,
} from '@folio/stripes/components';

import { Metadata } from '../components';
import {
  StaffSlipAboutSection,
  StaffSlipTemplateContentSection,
} from './components/ViewSections';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
  };

  render() {
    const {
      initialValues: staffSlip,
      stripes: {
        connect,
      },
    } = this.props;

    return (
      <div data-test-staff-slip-details>
        <AccordionStatus>
          <Row end="xs">
            <Col data-test-expand-all>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet>
            <Accordion label={<FormattedMessage id="ui-circulation.settings.staffSlips.generalInformation" />} >
              <Metadata
                connect={connect}
                metadata={staffSlip.metadata}
              />
              <StaffSlipAboutSection staffSlip={staffSlip} />
            </Accordion>
            <Accordion label={<FormattedMessage id="ui-circulation.settings.staffSlips.templateContent" />} >
              <StaffSlipTemplateContentSection staffSlip={staffSlip} />
            </Accordion>
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default StaffSlipDetail;
