import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Select,
  TextField,
  Label,
  PaneFooter,
} from '@folio/stripes/components';

import { patronIdentifierTypes } from '../../constants';
import { CheckoutSettings as validateCheckoutSettings } from '../Validation';

import css from './CheckoutSettingsForm.css';

class CheckoutSettingsForm extends Component {
  renderFooter = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <PaneFooter
        renderEnd={(
          <Button
            id="clickable-savescanid"
            type="submit"
            buttonStyle="primary paneHeaderNewButton"
            disabled={pristine || submitting}
            marginBottom0
          >
            <FormattedMessage id="ui-circulation.settings.checkout.save" />
          </Button>
        )}
      />
    );
  }

  renderList = ({ fields, meta }) => {
    const items = patronIdentifierTypes.map((iden, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id={`${iden.queryKey}-checkbox`}
            data-checked={fields.value[index]}
            label={iden.label}
            name={`idents[${index}]`}
          />
        </Col>
      </Row>
    ));

    return (
      <div>
        <p>
          <Label required>
            <FormattedMessage id="ui-circulation.settings.checkout.patronIds" />
          </Label>
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
      form: { getState },
      intl: { formatMessage },
    } = this.props;

    const { values: checkoutValues } = getState();

    return (
      <form
        id="checkout-form"
        className={css.checkoutForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          paneTitle={label}
          footer={this.renderFooter()}
        >
          <FieldArray
            name="idents"
            component={this.renderList}
          />
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.checkout.checkin.timeout" />}
                id="checkoutTimeout"
                name="checkoutTimeout"
                component={Checkbox}
                type="checkbox"
              />
            </Col>

          </Row>
          { checkoutValues.checkoutTimeout &&
            <Row>
              <div className={css.indentSection}>
                <Col xs={5}>
                  <Field
                    aria-label={formatMessage({ id: 'ui-circulation.settings.checkout.timeout.duration' })}
                    id="checkoutTimeoutDuration"
                    type="number"
                    component={TextField}
                    name="checkoutTimeoutDuration"
                    parse={value => Number(value)}
                  />
                </Col>
                <Col xs={7}>
                  <FormattedMessage id="ui-circulation.settings.checkout.minutes" />
                </Col>
              </div>
            </Row>}
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
  intl: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.string,
  form: PropTypes.object.isRequired,
};

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  validate: validateCheckoutSettings,
  subscription: { values: true },
})(CheckoutSettingsForm));
