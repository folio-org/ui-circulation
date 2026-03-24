import {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { Field } from 'react-final-form';
import isEqual from 'lodash/isEqual';

import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  Checkbox,
  Col,
  Label,
  Layout,
  MessageBanner,
  MultiSelection,
  Pane,
  PaneFooter,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import {
  IfPermission,
} from '@folio/stripes/core';

import { CheckoutSettings as validateCheckoutSettings } from '../Validation';

const DEFAULT_PATRON_IDENTIFIERS = ['barcode', 'externalSystemId', 'id', 'username'];

const CheckoutSettingsForm = ({
  form,
  form: { getState },
  handleSubmit,
  label,
  pristine,
  submitting,
  customFieldsOptions,
  customFieldPatronIdentifiers,
}) => {
  const { formatMessage } = useIntl();

  const { values: checkoutValues } = getState();

  const audioThemeOptions = [
    // One entry (here and in the translations files) for each theme in ../../../sound
    { value: 'classic', label: formatMessage({ id: 'ui-circulation.settings.checkout.audioTheme.classic' }) },
    { value: 'modern', label: formatMessage({ id: 'ui-circulation.settings.checkout.audioTheme.modern' }) },
    { value: 'future', label: formatMessage({ id: 'ui-circulation.settings.checkout.audioTheme.future' }) },
  ];

  const handleSaveAndReset = useCallback(() => {
    handleSubmit();
    form.setConfig('keepDirtyOnReinitialize', false);
    form.reset();
    form.setConfig('keepDirtyOnReinitialize', true);
  }, [handleSubmit, form]);

  const renderMultiSelectionField = ({
    name,
    dataOptions,
    ...rest
  }) => {
    return (
      <Field
        name={name}
        component={MultiSelection}
        dataOptions={dataOptions}
        isEqual={isEqual}
        itemToString={option => (option ? option.value : '')}
        {...rest}
      />
    );
  };

  return (
    <Pane
      id="other-settings-pane"
      defaultWidth="fill"
      fluidContentWidth
      paneTitle={label}
      footer={(
        <IfPermission perm="ui-circulation.settings.other-settings">
          <PaneFooter
            renderEnd={(
              <Button
                data-testid="otherSettingsFormSubmit"
                buttonStyle="primary paneHeaderNewButton"
                disabled={pristine || submitting}
                id="clickable-savescanid"
                marginBottom0
                onClick={handleSaveAndReset}
                type="submit"
              >
                <FormattedMessage id="ui-circulation.settings.checkout.save" />
              </Button>
            )}
          />
        </IfPermission>
      )}
    >
      <form id="checkout-form">
        <Field name="identifiers">
          {({ meta }) => (
            <div>
              <Label required>
                <FormattedMessage id="ui-circulation.settings.checkout.patronIds" />
              </Label>
              {meta.error && <MessageBanner type="error">{meta.error}</MessageBanner>}
              {DEFAULT_PATRON_IDENTIFIERS.map(identifier => (
                <Field
                  data-testid={identifier}
                  component={Checkbox}
                  id={`${identifier}-checkbox`}
                  key={`${identifier}-checkbox`}
                  label={<FormattedMessage id={`ui-circulation.settings.checkout.identifiers.${identifier}`} />}
                  name={`identifiers.${identifier}`}
                  type="checkbox"
                />
              ))}
              <Field
                data-testid="useCustomFields"
                component={Checkbox}
                id="useCustomFieldsAsIdentifiers"
                label={<FormattedMessage id="ui-circulation.settings.checkout.userCustomFields" />}
                name="useCustomFieldsAsIdentifiers"
                type="checkbox"
              />
              {checkoutValues.useCustomFieldsAsIdentifiers &&
                <Layout className="margin-start-gutter">
                  {renderMultiSelectionField({
                    name: 'identifiers.custom',
                    dataOptions: customFieldPatronIdentifiers,
                    'data-testid': 'customFieldPatronIdentifiers',
                    emptyMessage: formatMessage({ id: 'ui-circulation.settings.checkout.userCustomFields.noValidFieldsAreDefined' }),
                    placeholder: formatMessage({ id: 'ui-circulation.settings.checkout.userCustomFields.none' }),
                  })}
                </Layout>
              }
            </div>
          )}
        </Field>
        <hr />
        <Field
          data-testid="timeout"
          label={<FormattedMessage id="ui-circulation.settings.checkout.checkin.timeout" />}
          id="checkoutTimeout"
          name="checkoutTimeout"
          component={Checkbox}
          type="checkbox"
        />
        {checkoutValues.checkoutTimeout &&
          <Layout className="margin-start-gutter">
            <Row>
              <Col xs={3}>
                <Field
                  data-testid="timeoutDuration"
                  aria-label={formatMessage({ id: 'ui-circulation.settings.checkout.timeout.duration' })}
                  id="checkoutTimeoutDuration"
                  type="number"
                  component={TextField}
                  name="checkoutTimeoutDuration"
                  parse={value => Number(value)}
                />
              </Col>
              <Col xs={9}>
                <FormattedMessage id="ui-circulation.settings.checkout.minutes" />
              </Col>
            </Row>
          </Layout>
        }
        <hr />
        <Field
          data-testid="audioAlerts"
          component={Checkbox}
          label={<FormattedMessage id="ui-circulation.settings.checkout.audioAlerts" />}
          name="audioAlertsEnabled"
          type="checkbox"
        />
        <Field
          data-testid="audioTheme"
          component={Select}
          label={<FormattedMessage id="ui-circulation.settings.checkout.audioTheme" />}
          name="audioTheme"
          dataOptions={audioThemeOptions}
        />
        <hr />
        <Field
          data-testid="wildcardLookup"
          component={Checkbox}
          label={<FormattedMessage id="ui-circulation.settings.checkout.wildcardLookup" />}
          name="wildcardLookupEnabled"
          type="checkbox"
        />
        <hr />
        {renderMultiSelectionField({
          name: 'allowedCustomFieldRefIds',
          dataOptions: customFieldsOptions,
          label: formatMessage({ id: 'ui-circulation.settings.checkout.customFieldsAtCheckout' }),
          usePortal: true,
          emptyMessage: formatMessage({ id: 'ui-circulation.settings.checkout.customFieldsAtCheckout.noCustomFields' }),
        })}
      </form>
    </Pane>
  );
};

CheckoutSettingsForm.propTypes = {
  customFieldsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  customFieldPatronIdentifiers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.node,
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
  }).isRequired,
};

export default stripesFinalForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  validate: validateCheckoutSettings,
  subscription: { values: true },
})(CheckoutSettingsForm);
