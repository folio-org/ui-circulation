import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Pane,
  Paneset,
  Row,
  TextArea
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';
import { Field } from 'react-final-form';
import { TemplateEditor } from '@folio/stripes-template-editor';

import tokens from './tokens';
import TokensList from './TokensList';

import {
  CancelButton,
  FooterPane,
} from '../components';

import css from './StaffSlipForm.css';

class StaffSlipForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  static defaultProps = {
    initialValues: {},
  };

  render() {
    const {
      stripes,
      handleSubmit,
      initialValues,
      pristine,
      submitting,
      onCancel,
    } = this.props;

    const disabled = !stripes.hasPerm('settings.organizations.enabled');
    const panelTitle = initialValues.id
      ? initialValues.name
      : <FormattedMessage id="ui-circulation.settings.staffSlips.new" />;

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        id="form-staff-slip"
        className={css.staffSlipForm}
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
            <Row>
              <Col xs={8}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
                  value={initialValues.name}
                />
              </Col>
            </Row>
            <Row>
              <Col
                data-test-staff-slip-description
                xs={8}
              >
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
                  name="description"
                  id="input-staff-slip-description"
                  autoFocus
                  component={TextArea}
                  fullWidth
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.display" />}
                  component={TemplateEditor}
                  tokens={tokens}
                  name="template"
                  previewModalHeader={<FormattedMessage id="ui-circulation.settings.staffSlips.form.previewLabel" />}
                  tokensList={TokensList}
                  printable
                />
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
})(StaffSlipForm);
