import React from 'react';

import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';

import {
  ExpandAllButton,
  Col,
  Row,
} from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';

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

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalInformation: true,
        loanNotices: true,
        feeFineNotices: false,
        requestNotices: false,
      },
    };

    this.connectedViewMetaData = props.stripes.connect(ViewMetaData);
  }

  handleExpandAll = (sections) => {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  };

  handleSectionToggle = ({ id }) => {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  };

  render() {
    const { initialValues: policy = {} } = this.props;
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
    } = policy;

    return (
      <div>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        {policy.metadata && policy.metadata.createdDate &&
          <Row>
            <Col xs={12}>
              <this.connectedViewMetaData metadata={policy.metadata} />
            </Col>
          </Row>
        }
        <GeneralSection
          isOpen={generalInformation}
          policyName={policyName}
          isPolicyActive={isPolicyActive}
          policyDescription={policyDescription}
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
