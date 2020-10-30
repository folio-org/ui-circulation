import React from 'react';
import PropTypes from 'prop-types';

import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  ExpandAllButton,
  Row,
  AccordionSet,
} from '@folio/stripes/components';

import { NoticePolicy } from '../Models/NoticePolicy';
import {
  GeneralSection,
  LoanNoticesSection,
  RequestNoticesSection,
  FeeFineNoticesSection,
} from './components/DetailSections';

import getTemplates from './utils/get-templates';

import { patronNoticeCategoryIds } from '../../constants';

class NoticePolicyDetail extends React.Component {
  static propTypes= {
    initialValues: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      templates: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalNoticePolicy: true,
        viewLoanNotices: true,
        viewRequestNotices: true,
        viewFeeFineNotices: true,
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

  render() {
    const {
      initialValues: policy = {},
      stripes: {
        connect,
      },
      parentResources: {
        templates: {
          records: patronNoticeTemplates = [],
        },
      },
    } = this.props;

    const {
      generalNoticePolicy,
      viewLoanNotices,
      viewFeeFineNotices,
      viewRequestNotices,
    } = this.state.sections;

    const noticePolicy = new NoticePolicy(policy);

    return (
      <div data-test-notice-policy-detail>
        <Row end="xs">
          <Col
            data-test-expand-all
            xs
          >
            <ExpandAllButton
              accordionStatus={this.state.sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet
          accordionStatus={this.state.sections}
          onToggle={this.handleSectionToggle}
        >
          <GeneralSection
            isOpen={generalNoticePolicy}
            isPolicyActive={policy.active}
            policyName={policy.name}
            policyDescription={policy.description}
            metadata={policy.metadata}
            connect={connect}
          />
          <LoanNoticesSection
            isOpen={viewLoanNotices}
            policy={noticePolicy}
            templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.LOAN)}
          />
          <RequestNoticesSection
            isOpen={viewRequestNotices}
            policy={noticePolicy}
            templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.REQUEST)}
          />
          <FeeFineNoticesSection
            isOpen={viewFeeFineNotices}
            policy={noticePolicy}
            templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.AUTOMATED_FEE_FINE)}
          />
        </AccordionSet>
      </div>
    );
  }
}

export default NoticePolicyDetail;
