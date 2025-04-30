import React from 'react';
import PropTypes from 'prop-types';

import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  ExpandAllButton,
  Row,
  AccordionSet,
  AccordionStatus,
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
    initialValues: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      active: PropTypes.bool,
      description: PropTypes.string,
      metadata: PropTypes.shape({
        createdDate: PropTypes.string,
      }),
    }).isRequired,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      templates: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }).isRequired,
    }).isRequired,
  };

  render() {
    const {
      initialValues: policy,
      stripes: {
        connect,
      },
      parentResources: {
        templates: {
          records: patronNoticeTemplates,
        },
      },
    } = this.props;

    const noticePolicy = new NoticePolicy(policy);

    return (
      <div data-test-notice-policy-detail>
        <AccordionStatus>
          <Row end="xs">
            <Col
              data-test-expand-all
              xs
            >
              <ExpandAllButton data-testid="expandAllButton" />
            </Col>
          </Row>
          <AccordionSet data-testid="accordionSet">
            <GeneralSection
              isPolicyActive={policy.active}
              policyName={policy.name}
              policyDescription={policy.description}
              metadata={policy.metadata}
              connect={connect}
            />
            <LoanNoticesSection
              policy={noticePolicy}
              templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.LOAN)}
            />
            <RequestNoticesSection
              policy={noticePolicy}
              templates={getTemplates(patronNoticeTemplates, patronNoticeCategoryIds.REQUEST)}
            />
            <FeeFineNoticesSection
              policy={noticePolicy}
              templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE, patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT])}
            />
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default NoticePolicyDetail;
