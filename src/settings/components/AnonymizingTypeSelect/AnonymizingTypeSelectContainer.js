import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { Field } from 'react-final-form';

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
  ? 'ui-circulation.settings.loanHistory.afterCloseOrSuspended'
  : 'ui-circulation.settings.loanHistory.afterClose');

class AnonymizingTypeSelectContainer extends Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
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

  renderPeriod(name, path) {
    return (
      <div
        data-testid="period"
        data-test-period-section
        className={css.periodContainer}
      >
        <Period
          inputValuePath={`${path}.duration`}
          selectValuePath={`${path}.intervalId`}
          intervalPeriods={this.generateOptions(this.selectedPeriods, 'ui-circulation.settings.loanHistory.selectInterval')}
          inputSize={4}
          selectSize={7}
        />
        <FormattedMessage
          tagName="div"
          id={afterCloseTranslationKey(name)}
          values={{ name: <FormattedMessage id={`ui-circulation.settings.loanHistory.${name}`} /> }}
        />
      </div>
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
        label: this.renderPeriod(name, path),
        value: closingTypesMap.INTERVAL,
      };
    });
  }

  render() {
    const {
      name,
      path,
    } = this.props;

    return (
      <>
        <AnonymizingTypeSelect
          name={path}
          types={this.getClosingTypes(name, path)}
        />
        <Field
          name={`${path}Selected`}
          component={({ meta }) => {
            return meta.touched && meta.error ? <span className={css.error}>{meta.error}</span> : null;
          }}
        />
      </>
    );
  }
}

export default injectIntl(AnonymizingTypeSelectContainer);
