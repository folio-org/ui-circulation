import React from 'react';
import stripesFinalForm from '@folio/stripes/final-form';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes/core';
import { injectIntl } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
  Col,
  Row,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import FinePolicy from '../Models/FinePolicy';

import {
  FinesSection,
  OverdueAboutSection,
  ReminderFeesSection,
} from './components/EditSections';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

import { FinePolicy as validateFinePolicy } from '../Validation';

import css from './FineSection.css';

class FinePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        overdueGeneralSection: true,
        editFineSection: true,
        editReminderFeesSection: true,
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
      pristine,
      initialValues,
      stripes,
      submitting,
      handleSubmit,
      onCancel,
      form: {
        change,
        getState,
      },
      intl: {
        formatMessage,
      },
    } = this.props;

    const { sections } = this.state;

    const { values } = getState();
    const policy = new FinePolicy(values);

    const panelTitle = policy.id
      ? policy.name
      : formatMessage({ id: 'ui-circulation.settings.finePolicy.createEntryLabel' });

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-testid="finePolicyForm"
        noValidate
        className={css.finePolicyForm}
        data-test-fine-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            id="overdue-fine-policy-pane"
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <>
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
                data-testid="generalSectionSet"
                accordionStatus={sections}
                onToggle={this.handleSectionToggle}
              >
                <Accordion
                  id="overdueGeneralSection"
                  label={formatMessage({ id: 'ui-circulation.settings.finePolicy.generalInformation' })}
                  open={sections.overdueGeneralSection}
                >
                  <Metadata
                    connect={stripes.connect}
                    metadata={policy.metadata}
                  />
                  <OverdueAboutSection />
                </Accordion>
                <FinesSection
                  initialValues={initialValues}
                  policy
                  fineSectionOpen={sections.editFineSection}
                  change={change}
                />
                <ReminderFeesSection
                  initialValues={initialValues}
                  policy
                  sectionOpen={sections.editReminderFeesSection}
                  change={change}
                />
              </AccordionSet>
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: validateFinePolicy,
})(injectIntl(FinePolicyForm));
