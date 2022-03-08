import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';
import {
  get,
  sortBy,
} from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import { stripesShape } from '@folio/stripes/core';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
  Col,
  Row,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import LoanPolicy from '../Models/LoanPolicy';

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

import { LoanPolicy as validateLoanPolicy } from '../Validation';

import css from './LoanPolicyForm.css';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalLoanPolicyForm: true,
        recallsSection: true,
        holdsSection: true,
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

  render() {
    const {
      pristine,
      stripes,
      submitting,
      handleSubmit,
      form: {
        change,
        getState,
      },
      onCancel,
      intl: {
        formatMessage,
      },
    } = this.props;

    const { sections } = this.state;

    const { values } = getState();
    const policy = new LoanPolicy(values);

    const schedules = this.generateScheduleOptions();
    const panelTitle = policy.id ? policy.name : formatMessage({ id: 'ui-circulation.settings.loanPolicy.createEntryLabel' });
    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-testid="loanPolicyForm"
        noValidate
        className={css.loanPolicyForm}
        data-test-loan-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            id="loan-policy-pane"
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
            <AccordionSet>
              <Accordion
                data-testid="mainAccordion"
                id="generalLoanPolicyForm"
                open={sections.generalLoanPolicyForm}
                label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.generalInformation' })}
                onToggle={this.handleSectionToggle}
              >
                <Metadata
                  connect={stripes.connect}
                  metadata={policy.metadata}
                />
                <AboutSection />
                <LoansSection
                  data-testid="loanSection"
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                <RenewalsSection
                  data-testid="renewalsSection"
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                <RequestManagementSection
                  data-testid="requestManagementSection"
                  policy={policy}
                  holdsSectionOpen={sections.holdsSection}
                  recallsSectionOpen={sections.recallsSection}
                  accordionOnToggle={this.handleSectionToggle}
                  change={change}
                />
              </Accordion>
            </AccordionSet>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: validateLoanPolicy,
  subscription: { values: true },
})(injectIntl(LoanPolicyForm));
