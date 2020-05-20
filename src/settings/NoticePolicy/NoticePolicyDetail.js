import React from 'react';
import PropTypes from 'prop-types';

import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  ExpandAllButton,
  Row,
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
        generalInformation: true,
        loanNotices: true,
        requestNotices: true,
        feeFineNotices: true,
      },
    };
  }

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
      parentResources: {
        templates: {
          records: patronNoticeTemplates = [],
        },
      },
    } = this.props;

    const {
      generalInformation,
      loanNotices,
      feeFineNotices,
      requestNotices,
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
        <GeneralSection
          isOpen={generalInformation}
          isPolicyActive={policy.active}
          policyName={policy.name}
          policyDescription={policy.description}
          metadata={policy.metadata}
          connect={connect}
          onToggle={this.handleSectionToggle}
        />
        <LoanNoticesSection
          isOpen={loanNotices}
          policy={noticePolicy}
          templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.LOAN)}
          onToggle={this.handleSectionToggle}
        />
        <RequestNoticesSection
          isOpen={requestNotices}
          policy={noticePolicy}
          templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.REQUEST)}
          onToggle={this.handleSectionToggle}
        />
        <FeeFineNoticesSection
          isOpen={feeFineNotices}
          policy={noticePolicy}
          templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.AUTOMATED_FEE_FINE)}
          onToggle={this.handleSectionToggle}
        />
      </div>
    );
  }
}

export default NoticePolicyDetail;
