import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes/core';
import { Button, Checkbox, Col, Pane, Row, Select, TextField } from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { Field, FieldArray, getFormValues } from 'redux-form';

import { patronIdentifierTypes } from '../constants';
import css from './CheckoutSettingsForm.css';

class CheckoutSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getLastMenu = this.getLastMenu.bind(this);
    this.handleCheckoutTimeout = this.handleCheckoutTimeout.bind(this);
    this.state = { checked: false };
  }

  onSave(data) {
    const { idents, audioAlertsEnabled, checkoutTimeout, checkoutTimeoutDuration } = data;
    const values = idents.reduce((vals, ident, index) => {
      if (ident) vals.push(patronIdentifierTypes[index].key);
      return vals;
    }, []);

    const otherSettings = JSON.stringify({
      audioAlertsEnabled: audioAlertsEnabled === 'true',
      prefPatronIdentifier: values.join(','),
      checkoutTimeout,
      checkoutTimeoutDuration,
    });

    this.props.onSubmit({ other_settings: otherSettings });
  }

  getLastMenu() {
    const { pristine, submitting } = this.props;
    return (
      <Button type="submit" disabled={(pristine || submitting)} id="clickable-savescanid">
        <FormattedMessage id="ui-circulation.settings.checkout.save" />
      </Button>
    );
  }

  handleCheckoutTimeout() {
    this.setState(({ checked }) => ({
      checked: !checked
    }));
  }

  getCurrentValues() {
    const { store } = this.props.stripes;
    const state = store.getState();
    return getFormValues('checkoutForm')(state) || {};
  }

  // eslint-disable-next-line class-methods-use-this
  renderList({ fields, meta }) {
    const items = patronIdentifierTypes.map((iden, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id={`${iden.queryKey}-checkbox`}
            data-checked={fields.get(index)}
            label={iden.label}
            name={`idents[${index}]`}
          />
        </Col>
      </Row>
    ));

    return (
      <div>
        <p className={css.label}>
          <FormattedMessage id="ui-circulation.settings.checkout.patronIds" />
        </p>
        {items}
        {meta.error && <div className={css.error}>{meta.error}</div>}
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      label,
    } = this.props;

    const checkoutValues = this.getCurrentValues();
    const hidden = this.state.checked ? '' : 'hidden';
    return (
      <form id="checkout-form" onSubmit={handleSubmit(this.onSave)}>
        <Pane defaultWidth="fill" fluidContentWidth paneTitle={label} lastMenu={this.getLastMenu()}>
          <FieldArray name="idents" component={this.renderList} />
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.checkout.timeout" />}
                id="checkoutTimeout"
                name="checkoutTimeout"
                component={Checkbox}
                type="checkbox"
                onChange={this.handleCheckoutTimeout}
                normalize={v => !!v}
              />
            </Col>

          </Row>
          { checkoutValues.checkoutTimeout &&
            <Row className={hidden}>
              <div className={css.indentSection}>
                <Col xs={5}>
                  <Field
                    id="checkoutTimeoutDuration"
                    name="checkoutTimeoutDuration"
                    component={TextField}
                  />
                </Col>
                <Col xs={7}>
                  <FormattedMessage id="ui-circulation.settings.checkout.minutes" />
                </Col>
              </div>
            </Row>
          }
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.checkout.audioAlerts" />}
                name="audioAlertsEnabled"
                component={Select}
              >
                <FormattedMessage id="ui-circulation.settings.checkout.no">
                  {(message) => <option value="false">{message}</option>}
                </FormattedMessage>
                <FormattedMessage id="ui-circulation.settings.checkout.yes">
                  {(message) => <option value="true">{message}</option>}
                </FormattedMessage>
              </Field>
            </Col>
          </Row>
        </Pane>
      </form>
    );
  }
}

CheckoutSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.string,
  stripes: stripesShape.isRequired,
};

export default stripesForm({
  form: 'checkoutForm',
  navigationCheck: true,
  enableReinitialize: true,
})(CheckoutSettingsForm);
