import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import {
  get,
  sortBy,
} from 'lodash';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';

import {
  Accordion,
  ExpandAllButton,
  Col,
  Row,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import LoanPolicy from '../Models/LoanPolicy';
import { normalize } from './utils/normalize';

import {
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components/EditSections';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

import css from './LoanPolicyForm.css';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    intl: PropTypes.object,
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    policy: PropTypes.object,
    initialValues: PropTypes.object,
    change: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalSection: true,
        recallsSection: true,
        holdsSection: true,
      },
    };
  }

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

  generateScheduleOptions = () => {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;
    const records = get(this.props, 'parentResources.fixedDueDateSchedules.records', []);
    const sortedSchedules = sortBy(records, ['name']);

    const placeholder = (
      <option value="" key="x">
        {formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
      </option>
    );

    const schedules = sortedSchedules.map(({ id, name }) => {
      return (
        <option
          value={id}
          key={id}
        >
          {name}
        </option>
      );
    });

    return [placeholder, ...schedules];
  };

  saveForm = (loanPolicy) => {
    const policy = normalize(loanPolicy);
    this.props.onSave(policy);
  };

  render() {
    const {
      pristine,
      policy,
      stripes,
      submitting,
      handleSubmit,
      change,
      onCancel,
    } = this.props;

    const { sections } = this.state;

    const schedules = this.generateScheduleOptions();
    const panelTitle = policy.id ? policy.name : <FormattedMessage id="ui-circulation.settings.loanPolicy.createEntryLabel" />;
    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        noValidate
        className={css.loanPolicyForm}
        data-test-loan-policy-form
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
            <Accordion
              id="generalSection"
              open={sections.generalSection}
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
              onToggle={this.handleSectionToggle}
            >
              <Metadata
                connect={stripes.connect}
                metadata={policy.metadata}
              />
              <AboutSection />
              <LoansSection
                policy={policy}
                schedules={schedules}
                change={change}
              />
              <RenewalsSection
                policy={policy}
                schedules={schedules}
                change={change}
              />
              <RequestManagementSection
                policy={policy}
                holdsSectionOpen={sections.holdsSection}
                recallsSectionOpen={sections.recallsSection}
                accordionOnToggle={this.handleSectionToggle}
                change={change}
              />
            </Accordion>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new LoanPolicy(getFormValues('loanPolicyForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(injectIntl(LoanPolicyForm));

export default stripesForm({
  form: 'loanPolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedLoanPolicyForm);
