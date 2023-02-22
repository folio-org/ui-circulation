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

class StaffSlipForm extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalInformation: true,
        templateContent: true
      }
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
      stripes,
      handleSubmit,
      initialValues,
      pristine,
      submitting,
      onCancel,
      intl,
    } = this.props;
    const {
      formatMessage,
      locale,
    } = intl;
    const { sections } = this.state;

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
            <Row end="xs">
              <Col
                data-test-expand-all
              >
                <ExpandAllButton
                  accordionStatus={sections}
                  onToggle={this.handleExpandAll}
                />
              </Col>
            </Row>
            <AccordionSet>
              <Accordion
                id="generalInformation"
                label={formatMessage({ id: 'ui-circulation.settings.staffSlips.generalInformation' })}
                open={sections.generalInformation}
                onToggle={this.handleSectionToggle}
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
                id="templateContent"
                label={formatMessage({ id:'ui-circulation.settings.staffSlips.templateContent' })}
                open={sections.templateContent}
                onToggle={this.handleSectionToggle}
              >
                <StaffSlipTemplateContentSection locale={locale} />
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
})(injectIntl(StaffSlipForm));
