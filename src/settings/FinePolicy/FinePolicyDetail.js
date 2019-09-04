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

  state = {
    sections: {
      generalInformation: true,
      fineSection: true,
    },
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
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
        <Accordion
          id="generalInformation"
          label={<FormattedMessage id="ui-circulation.settings.finePolicy.generalInformation" />}
          open={sections.generalInformation}
          onToggle={this.handleSectionToggle}
        >
          <Metadata
            connect={connect}
            metadata={finePolicy.metadata}
          />
          <OverdueAboutSection getValue={this.getValue} />
          <FinesSection
            policy={finePolicy}
            getCheckboxValue={this.getCheckboxValue}
            fineSectionOpen={sections.fineSection}
            accordionOnToggle={this.handleSectionToggle}
          />
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(FinePolicyDetail);
