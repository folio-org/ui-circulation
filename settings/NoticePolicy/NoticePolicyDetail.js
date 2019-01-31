import React from 'react';

import PropTypes from 'prop-types';

import {
  ExpandAllButton,
  Col,
  Row,
} from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';

import {
  GeneralSection,
  LoanNoticesSection,
  RequestNoticesSection,
  FeeFineNoticesSection,
} from './components/DetailSections';

class NoticePolicyDetail extends React.Component {
  static propTypes= {
    initialValues: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
  };

  state = {
    sections: {
      generalInformation: true,
      loanNotices: true,
      feeFineNotices: false,
      requestNotices: false,
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

  render() {
    const {
      initialValues: policy = {},
      stripes: {
        connect,
      },
    } = this.props;
    const { sections } = this.state;
    const {
      generalInformation,
      loanNotices,
      feeFineNotices,
      requestNotices,
    } = sections;

    const {
      name: policyName = '',
      active: isPolicyActive = false,
      description: policyDescription = '-',
      metadata = {},
    } = policy;

    return (
      <div>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <GeneralSection
          isOpen={generalInformation}
          isPolicyActive={isPolicyActive}
          policyName={policyName}
          policyDescription={policyDescription}
          metadata={metadata}
          connect={connect}
          onToggle={this.handleSectionToggle}
        />
        <LoanNoticesSection
          isOpen={loanNotices}
          policy={policy}
          onToggle={this.handleSectionToggle}
        />
        <FeeFineNoticesSection
          isOpen={feeFineNotices}
          policy={policy}
          onToggle={this.handleSectionToggle}
        />
        <RequestNoticesSection
          isOpen={requestNotices}
          policy={policy}
          onToggle={this.handleSectionToggle}
        />
      </div>
    );
  }
}

export default NoticePolicyDetail;
