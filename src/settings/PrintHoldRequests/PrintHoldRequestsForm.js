import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field } from 'react-final-form';

import stripesFinalForm from '@folio/stripes/final-form';
import { stripesConnect } from '@folio/stripes/core';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  PaneFooter,
} from '@folio/stripes/components';

import {
  PRINT_HOLD_REQUESTS,
} from '../../constants';

import css from './PrintHoldRequestsForm.css';

const PrintHoldRequestsForm = (props) => {
  const {
    handleSubmit,
    intl: {
      formatMessage,
    },
    label,
    pristine,
    submitting,
  } = props;

  const renderFooter = () => (
    <PaneFooter
      renderEnd={(
        <Button
          type="submit"
          buttonStyle="primary paneHeaderNewButton"
          disabled={pristine || submitting}
          marginBottom0
        >
          {formatMessage({ id: 'stripes-core.button.save' })}
        </Button>
        )}
    />
  );

  return (
    <form
      id="printHoldRequestsForm"
      data-testid="printHoldRequestsFormSubmit"
      className={css.printHoldRequestsForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <Pane
        id="printHoldRequestsFormPane"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        footer={renderFooter()}
      >
        <Row>
          <Col xs={12}>
            <Field
              data-testid="printHoldRequestsCheckbox"
              name={PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED}
              type="checkbox"
              label={formatMessage({ id: 'ui-circulation.settings.PrintHoldRequests.allow' })}
              component={Checkbox}
            />
          </Col>
        </Row>
      </Pane>
    </form>
  );
};

PrintHoldRequestsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const withStripes = stripesConnect(PrintHoldRequestsForm);

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(withStripes));
