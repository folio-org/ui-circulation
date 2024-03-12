import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import { stripesShape } from '@folio/stripes/core';
import {
  AccordionSet,
  AccordionStatus,
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

  render() {
    const {
      form: { getState },
      stripes,
      pristine,
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { values } = getState();
    const policy = new NoticePolicy(values);

    const patronNoticeTemplates = get(this.props, 'parentResources.templates.records', []);
    const panelTitle = policy.id
      ? policy.name
      : <FormattedMessage id="ui-circulation.settings.noticePolicy.createEntryLabel" />;

    const footerPaneProps = {
      isSaveButtonDisabled: pristine || submitting,
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
            id="patron-notice-policy-pane"
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <AccordionStatus>
              <Row end="xs">
                <Col
                  data-test-expand-all
                  xs
                >
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet data-testid="accordionSet">
                <GeneralSection
                  metadata={policy.metadata}
                  connect={stripes.connect}
                  isPolicyActive={policy.active}
                />
                <LoanNoticesSection
                  policy={policy}
                  templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.LOAN])}
                />
                <RequestNoticesSection
                  policy={policy}
                  templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.REQUEST])}
                />
                <FeeFineNoticesSection
                  policy={policy}
                  templates={getTemplates(patronNoticeTemplates, [patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE, patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT])}
                />
              </AccordionSet>
            </AccordionStatus>
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
