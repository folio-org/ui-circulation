import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import TextField from '@folio/stripes-components/lib/TextField';
import stripesForm from '@folio/stripes-form';
import Pane from '@folio/stripes-components/lib/Pane';
import { Field, FieldArray, getFormValues } from 'redux-form';
import Select from '@folio/stripes-components/lib/Select';
import { patronIdentifierTypes } from '../constants';
import css from './CheckoutSettingsForm.css';

class CheckoutSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getLastMenu = this.getLastMenu.bind(this);
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

  getCurrentValues() {
    const { stripes: { store } } = this.props;
    const state = store.getState();
    return getFormValues('checkoutForm')(state) || {};
  }
  // eslint-disable-next-line class-methods-use-this
  renderList({ fields, meta }) {
    if (!fields.length) return (<div />);

    const items = patronIdentifierTypes.map((iden, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            id={`${iden.queryKey}-checkbox`}
            data-checked={fields.get(index)}
            label={iden.label}
            key={`item-${index}`}
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
        {meta.error && <div className={css.error}>{meta.error}</div>}
        {items}
      </div>
    );
  }

  render() {
    const { handleSubmit, label, stripes } = this.props;
    const checkoutValues = this.getCurrentValues();
    return (
      <form id="checkout-form" onSubmit={handleSubmit(this.onSave)}>
        <Pane defaultWidth="fill" fluidContentWidth paneTitle={label} lastMenu={this.getLastMenu()}>
          <FieldArray name="idents" component={this.renderList} />
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.timeout' })}
                id="checkoutTimeout"
                name="checkoutTimeout"
                component={Checkbox}
                normalize={v => !!v}
              />
            </Col>
          </Row>
          { checkoutValues.checkoutTimeout &&
            <Row>
              <div className={css.indentSection}>
                <Col xs={5}>
                  <Field
                    id="checkoutTimeoutDuration"
                    name="checkoutTimeoutDuration"
                    component={TextField}
                  />
                </Col>
                <Col xs={7}>
                  <div>{stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.minutes' })}</div>
                </Col>
              </div>
            </Row>
          }
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.audioAlerts' })}
                name="audioAlertsEnabled"
                component={Select}
                dataOptions={[
                  {
                    label: stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.no' }),
                    value: false,
                  },
                  {
                    label: stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.yes' }),
                    value: true,
                  },
                ]}
              />
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
