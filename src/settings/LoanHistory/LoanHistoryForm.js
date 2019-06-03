import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';

import stripesForm from '@folio/stripes/form';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Headline,
  RadioButton,
} from '@folio/stripes/components';

import { Period } from '../components';
import optionsGenarator from '../utils/options-genarator';
import {
  closingTypes,
  closingTypesMap,
  intervalPeriods,
} from '../../constants';

import css from './LoanHistoryForm.css';

class LoanHistoryForm extends Component {
  constructor(props) {
    super(props);
    this.genarateOptions = optionsGenarator.bind(null, props.intl.formatMessage);
    this.selectedPeriods = intervalPeriods.filter(period => props.initialValues.selectedPeriodsValues.includes(period.value));
  }

  onSave = data => this.props.onSubmit({ loan_history: JSON.stringify(data) });

  getLastMenu = () => {
    const { pristine, submitting } = this.props;

    return (
      <Button
        type="submit"
        disabled={pristine || submitting}
        id="clickable-loan-history-save-button"
        marginBottom0
      >
        <FormattedMessage id="ui-circulation.settings.loanHistory.save" />
      </Button>
    );
  }

  renderPeriod = () => {
    return (
      <div
        data-test-loans-section-loan-period
        className={css.periodContainer}
      >
        <Period
          inputValuePath="intervalValue"
          selectValuePath="intervalType"
          intervalPeriods={this.genarateOptions(this.selectedPeriods, 'ui-circulation.settings.loanHistory.selectInterval')}
          inputSize={4}
          selectSize={6}
        />
      </div>
    );
  }

  updateClosingTypes = types => {
    const updatedType = { label: this.renderPeriod(), value: closingTypesMap.INTERVAL };
    return types.map(type => (type.value === closingTypesMap.INTERVAL ? updatedType : type));
  };

  renderClosingTypes = ({ meta }) => {
    const updatedClosingTypes = this.updateClosingTypes(closingTypes);
    const items = updatedClosingTypes.map((type, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={RadioButton}
            label={<FormattedMessage id={type.label} />}
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
      <form
        id="loan-history-form"
        onSubmit={handleSubmit(this.onSave)}
      >
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
                name="treatEnabled"
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
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  initialValues: PropTypes.oneOfType([PropTypes.array]),
};

export default injectIntl(
  stripesForm({
    form: 'loanHistoryForm',
    navigationCheck: true,
    enableReinitialize: true,
  })(LoanHistoryForm)
);
