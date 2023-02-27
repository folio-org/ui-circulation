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

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalInformation: true,
        templateContent: true,
      }
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];

      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  render() {
    const { sections } = this.state;
    const {
      initialValues: staffSlip,
      stripes: {
        connect,
      },
    } = this.props;

    return (
      <div data-test-staff-slip-details>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet>
          <Accordion
            id="generalInformation"
            label={<FormattedMessage id="ui-circulation.settings.staffSlips.generalInformation" />}
            open={sections.generalInformation}
            onToggle={this.handleSectionToggle}
          >
            <Metadata
              connect={connect}
              metadata={staffSlip.metadata}
            />
            <StaffSlipAboutSection staffSlip={staffSlip} />
          </Accordion>
          <Accordion
            id="templateContent"
            label={<FormattedMessage id="ui-circulation.settings.staffSlips.templateContent" />}
            open={sections.templateContent}
            onToggle={this.handleSectionToggle}
          >
            <StaffSlipTemplateContentSection staffSlip={staffSlip} />
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default StaffSlipDetail;
