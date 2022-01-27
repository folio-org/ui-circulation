import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import { stripesShape } from '@folio/stripes/core';
import {
  AccordionSet,
  Col,
  Row,
  Pane,
  Paneset,
  ExpandAllButton,
} from '@folio/stripes/components';

import getTemplates from './utils/get-templates';
import { NoticePolicy } from '../Models/NoticePolicy';
import {
  FooterPane,
  CancelButton,
} from '../components';
import {
  GeneralSection,
  LoanNoticesSection,
  FeeFineNoticesSection,
  RequestNoticesSection,
} from './components';

import { NoticePolicy as validateNoticePolicy } from '../Validation';

import { patronNoticeCategoryIds } from '../../constants';

import css from './NoticePolicyForm.css';

class NoticePolicyForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    parentResources: PropTypes.shape({
      templates: PropTypes.object,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        general: true,
        editLoanNotices: true,
        editRequestNotices: true,
        editFeeFineNotices: true,
      },
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
    const {
      form: { getState },
      stripes,
      pristine,
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { sections } = this.state;
    const { values } = getState();
    const policy = new NoticePolicy(values);

    const patronNoticeTemplates = get(this.props, 'parentResources.templates.records', []);
    const panelTitle = policy.id
      ? policy.name
      : <FormattedMessage id="ui-circulation.settings.noticePolicy.createEntryLabel" />;

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-testid="form"
        data-test-notice-policy-form
        className={css.noticePolicyForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <Row end="xs">
              <Col
                data-test-expand-all
                xs
              >
                <ExpandAllButton
                  accordionStatus={sections}
                  onToggle={this.handleExpandAll}
                />
              </Col>
            </Row>
            <AccordionSet
              data-testid="accordionSet"
              accordionStatus={sections}
              onToggle={this.handleSectionToggle}
            >
              <GeneralSection
                isOpen={sections.general}
                metadata={policy.metadata}
                connect={stripes.connect}
                isPolicyActive={policy.active}
              />
              <LoanNoticesSection
                isOpen={sections.editLoanNotices}
                policy={policy}
                templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.LOAN])}
              />
              <RequestNoticesSection
                isOpen={sections.editRequestNotices}
                policy={policy}
                templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.REQUEST])}
              />
              <FeeFineNoticesSection
                isOpen={sections.editFeeFineNotices}
                policy={policy}
                templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE, patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT])}
              />
            </AccordionSet>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: validateNoticePolicy,
  subscription: { values: true },
})(NoticePolicyForm);
