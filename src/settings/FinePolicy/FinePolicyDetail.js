import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  get,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Col,
  Row,
  ExpandAllButton,
} from '@folio/stripes/components';

import {
  FinesSection,
  OverdueAboutSection,
} from './components/ViewSections';

import { Metadata } from '../components';
import FinePolicy from '../Models/FinePolicy';

class FinePolicyDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalFeePolicy: true,
        viewFineSection: true,
      },
    };
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  };

  getValue = (pathToValue) => {
    const { initialValues: policy } = this.props;

    return get(policy, pathToValue);
  };

  getCheckboxValue = (seletedValue) => {
    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.finePolicy.yes" />
      : <FormattedMessage id="ui-circulation.settings.finePolicy.no" />;
  };

  render() {
    const {
      initialValues: policy = {},
      stripes: {
        connect,
      }
    } = this.props;

    const { sections } = this.state;

    const finePolicy = new FinePolicy(policy);

    return (
      <div data-test-fine-policy-detail>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet
          accordionStatus={sections}
          onToggle={this.handleSectionToggle}
        >
          <Accordion
            id="generalFeePolicy"
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.generalInformation" />}
            open={sections.generalFeePolicy}
          >
            <Metadata
              connect={connect}
              metadata={finePolicy.metadata}
            />
            <OverdueAboutSection getValue={this.getValue} />
          </Accordion>
          <FinesSection
            policy={finePolicy}
            getCheckboxValue={this.getCheckboxValue}
            fineSectionOpen={sections.viewFineSection}
          />
        </AccordionSet>
      </div>
    );
  }
}

export default injectIntl(FinePolicyDetail);
