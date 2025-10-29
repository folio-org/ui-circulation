import React from 'react';
import stripesFinalForm from '@folio/stripes/final-form';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes/core';
import { injectIntl } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
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
    initialValues: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    parentResources: PropTypes.shape({
      noticeTemplates: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
      blockTemplates: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
    }).isRequired,
  };

  static defaultProps = {
    initialValues: {},
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
      parentResources: {
        noticeTemplates: { records: noticeTemplates },
        blockTemplates: { records: blockTemplates },
      },
    } = this.props;

    const { values } = getState();
    const policy = new FinePolicy(values);

    const panelTitle = policy.id
      ? policy.name
      : formatMessage({ id: 'ui-circulation.settings.finePolicy.createEntryLabel' });

    const footerPaneProps = {
      isSaveButtonDisabled: pristine || submitting,
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
            <AccordionStatus>
              <Row end="xs">
                <Col
                  data-test-expand-all
                  xs
                >
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet data-testid="generalSectionSet">
                <Accordion
                  id="overdueGeneralSection"
                  label={formatMessage({ id: 'ui-circulation.settings.finePolicy.generalInformation' })}
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
                  change={change}
                />
                <ReminderFeesSection
                  initialValues={initialValues}
                  policy
                  noticeTemplates={noticeTemplates}
                  blockTemplates={blockTemplates}
                  change={change}
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
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  validate: validateFinePolicy,
})(injectIntl(FinePolicyForm));
