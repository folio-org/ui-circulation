import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import stripesForm from '@folio/stripes/form';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Select,
  TextField,
  Headline,
  RadioButton,
} from '@folio/stripes/components';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  closingTypes,
  intervalTypes,
} from '../../constants';
import updateClosingTypes from '../utils/updateClosingTypes';
import css from './LoanHistoryForm.css';

class LoanHistoryForm extends Component {
  onSave = data => this.props.onSubmit({ loan_history: JSON.stringify(data) });

  getLastMenu = () => {
    const { pristine, submitting } = this.props;
    return (
      <Button type="submit" disabled={pristine || submitting} id="clickable-loan-history-save-button" marginBottom0>
        <FormattedMessage id="ui-circulation.settings.loanHistory.save" />
      </Button>
    );
  }

  renderIntervalSelector = () => (
    <div className={css.intervalSelector}>
      <Row>
        <Col xs={3}>
          <div data-test-interval-value-field>
            <Field
              id="intervalValue"
              name="intervalValue"
              marginBottom0
              component={TextField}
            />
          </div>
        </Col>
        <Col xs={4}>
          <div data-test-interval-type-field>
            <Field
              id="intervalType"
              name="intervalType"
              marginBottom0
              component={Select}
              dataOptions={intervalTypes}
            />
          </div>
        </Col>
        <Col xs={5}>
          <FormattedMessage id="ui-circulation.settings.loanHistory.after" />
        </Col>
      </Row>
    </div>
  );

  renderClosingTypes = ({ meta }) => {
    const updatedClosingTypes = updateClosingTypes(
      closingTypes,
      { label: this.renderIntervalSelector(), value: 'interval' }
    );
    const items = updatedClosingTypes.map((type, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={RadioButton}
            label={type.label}
            name="closingType"
            type="radio"
            id={`${type.value}-radio-button`}
            value={type.value}
            labelClass={css.paddingLeft0}
          />
        </Col>
      </Row>
    ));

    return (
      <div>
        <p>
          <FormattedMessage id="ui-circulation.settings.loanHistory.anonymize" />
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

    return (
      <form id="loan-history-form" onSubmit={handleSubmit(this.onSave)}>
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          paneTitle={label}
          lastMenu={this.getLastMenu()}
        >
          <Headline
            size="large"
            margin="xx-large"
            tag="h5"
          >
            <FormattedMessage id="ui-circulation.settings.loanHistory.closedLoans" />
          </Headline>
          <FieldArray
            name="closingTypes"
            component={this.renderClosingTypes}
          />
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.loanHistory.treat" />}
                id="treatEnabled-checkbox"
                name="treatEnabled-checkbox"
                component={Checkbox}
                type="checkbox"
                normalize={v => !!v}
              />
            </Col>
          </Row>
        </Pane>
      </form>
    );
  }
}

LoanHistoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default stripesForm({
  form: 'loanHistoryForm',
  navigationCheck: true,
  enableReinitialize: true,
})(LoanHistoryForm);
