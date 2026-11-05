import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { Field } from 'react-final-form';

import {
  Label,
  Layout,
} from '@folio/stripes/components';

import AnonymizingTypeSelect from './AnonymizingTypeSelect';
import Period from '../Period';
import optionsGenerator from '../../utils/options-generator';
import {
  closingTypesMap,
  intervalPeriods,
  anonymizingIntervals,
  closedLoansRules,
} from '../../../constants';

import css from './AnonymizingTypeSelectContainer.css';

export const afterCloseTranslationKey = (name) => (name === closedLoansRules.WITH_FEES_FINES
  ? 'ui-circulation.settings.loanHistory.retainAfterCloseOrSuspended'
  : 'ui-circulation.settings.loanHistory.retainAfterClose');

class AnonymizingTypeSelectContainer extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, props.intl.formatMessage);
    this.selectedPeriods = intervalPeriods.filter(period => anonymizingIntervals.includes(period.value));
  }

  renderPeriod(path) {
    return (
      <Layout
        data-testid="period"
        data-test-period-section
        className={`margin-start-gutter ${css.periodContainer}`}
      >
        <Period
          inputValuePath={`${path}.duration`}
          selectValuePath={`${path}.intervalId`}
          intervalPeriods={this.generateOptions(this.selectedPeriods, 'ui-circulation.settings.loanHistory.selectInterval')}
          inputLabel="ui-circulation.settings.loanHistory.length"
          selectLabel="ui-circulation.settings.loanHistory.interval"
          inputSize={4}
          selectSize={7}
          disabled={this.props.disabled}
        />
      </Layout>
    );
  }

  getClosingTypes(name, path) {
    return this.props.types.map(type => {
      if (type.value !== closingTypesMap.INTERVAL) {
        return {
          ...type,
          label: (
            <FormattedMessage
              id={type.label}
              values={{ name: <FormattedMessage id={`ui-circulation.settings.loanHistory.${name}`} /> }}
            />
          ),
        };
      }

      return {
        label: (
          <FormattedMessage
            id={afterCloseTranslationKey(name)}
            values={{ name: <FormattedMessage id={`ui-circulation.settings.loanHistory.${name}`} /> }}
          />
        ),
        value: closingTypesMap.INTERVAL,
        details: this.renderPeriod(path),
      };
    });
  }

  render() {
    const {
      disabled,
      label,
      name,
      path,
    } = this.props;

    return (
      <fieldset>
        {label && (
          <Label tagName="legend">
            <FormattedMessage id={label} />
          </Label>
        )}
        <AnonymizingTypeSelect
          name={path}
          types={this.getClosingTypes(name, path)}
          disabled={disabled}
        />
        <Field
          name={`${path}Selected`}
          component={({ meta }) => {
            return meta.touched && meta.error ? <span className={css.error}>{meta.error}</span> : null;
          }}
        />
      </fieldset>
    );
  }
}

export default injectIntl(AnonymizingTypeSelectContainer);
