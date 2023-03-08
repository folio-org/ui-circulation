import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import {
  Col,
  Pane,
  Paneset,
  Row,
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';
import {
  StaffSlipAboutSection,
  StaffSlipTemplateContentSection,
} from './components/EditSections';

import css from './StaffSlipForm.css';

const StaffSlipForm = (props) => {
  const {
    stripes,
    handleSubmit,
    initialValues,
    pristine,
    submitting,
    onCancel,
    intl,
  } = props;
  const {
    formatMessage,
    locale,
  } = intl;

  const disabled = !stripes.hasPerm('ui-circulation.settings.edit-staff-slips');
  const panelTitle = initialValues.id
    ? initialValues.name
    : formatMessage({ id: 'ui-circulation.settings.staffSlips.new' });

  const footerPaneProps = {
    pristine,
    submitting,
    onCancel,
  };

  return (
    <form
      data-testid="formStaffSlip"
      id="form-staff-slip"
      className={css.staffSlipForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <Paneset isRoot>
        <Pane
          id="staff-slip-pane"
          defaultWidth="100%"
          paneTitle={panelTitle}
          firstMenu={<CancelButton onCancel={onCancel} />}
          footer={<FooterPane {...footerPaneProps} />}
        >
          <AccordionSet>
            <Row end="xs">
              <Col
                data-test-expand-all
              >
                <ExpandAllButton />
              </Col>
            </Row>
            <Accordion
              label={formatMessage({ id: 'ui-circulation.settings.staffSlips.generalInformation' })}
            >
              <Metadata
                connect={stripes.connect}
                metadata={initialValues.metadata}
              />
              <StaffSlipAboutSection
                initialValues={initialValues}
                disabled={disabled}
              />
            </Accordion>
            <Accordion
              label={formatMessage({ id:'ui-circulation.settings.staffSlips.templateContent' })}
            >
              <StaffSlipTemplateContentSection locale={locale} />
            </Accordion>
          </AccordionSet>
        </Pane>
      </Paneset>
    </form>
  );
};

StaffSlipForm.propTypes = {
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
    connect:PropTypes.func,
  }).isRequired,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

StaffSlipForm.defaultProps = {
  initialValues: {},
};

export default stripesFinalForm({
  navigationCheck: true,
})(injectIntl(StaffSlipForm));
