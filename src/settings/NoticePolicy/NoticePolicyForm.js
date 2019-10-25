import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { get } from 'lodash';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  Row,
  Pane,
  Paneset,
  ExpandAllButton,
} from '@folio/stripes/components';

import normalize from './utils/normalize';
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

class NoticePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    policy: PropTypes.object,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    parentResources: PropTypes.shape({
      templates: PropTypes.object,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
  };

  state = {
    sections: {
      general: true,
      loanNotices: true,
      requestNotices: true,
      feeFineNotices: false,
    },
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  saveForm = (noticePolicy) => {
    const policy = normalize(noticePolicy);
    this.props.onSave(policy);
  };

  render() {
    const {
      policy,
      stripes,
      pristine,
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { sections } = this.state;

    const patronNoticeTemplates = get(this.props, 'parentResources.templates.records', []);
    const panelTitle = policy.id ? policy.name : <FormattedMessage id="ui-circulation.settings.noticePolicy.createEntryLabel" />;
    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-test-notice-policy-form
        noValidate
        onSubmit={handleSubmit(this.saveForm)}
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
            <GeneralSection
              isOpen={sections.general}
              metadata={policy.metadata}
              connect={stripes.connect}
              onToggle={this.handleSectionToggle}
              isPolicyActive={policy.active}
            />
            <LoanNoticesSection
              isOpen={sections.loanNotices}
              policy={policy}
              templates={getTemplates(patronNoticeTemplates, 'Loan')}
              onToggle={this.handleSectionToggle}
            />
            <RequestNoticesSection
              isOpen={sections.requestNotices}
              policy={policy}
              templates={getTemplates(patronNoticeTemplates, 'Request')}
              onToggle={this.handleSectionToggle}
            />
            <FeeFineNoticesSection
              isOpen={sections.feeFineNotices}
              onToggle={this.handleSectionToggle}
            />
          </Pane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new NoticePolicy(getFormValues('noticePolicyForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(NoticePolicyForm);

export default stripesForm({
  form: 'noticePolicyForm',
  navigationCheck: true,
  enableReinitialize: false,
})(connectedLoanPolicyForm);
