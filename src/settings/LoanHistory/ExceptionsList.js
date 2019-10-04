import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  uniqBy,
  get,
} from 'lodash';
import { arrayRemove } from 'redux-form';

import {
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';

import ExceptionCard from './ExceptionCard';

import css from './ExceptionsList.css';

@stripesConnect
class ExceptionsList extends Component {
  static manifest = Object.freeze({
    paymentMethods: {
      type: 'okapi',
      path: 'payments',
      throwsErrors: false,
    },
  });

  static propTypes = {
    fields: PropTypes.object.isRequired,
    resources: PropTypes.shape({
      paymentMethods: PropTypes.object,
    }).isRequired,
    stripes: stripesShape.isRequired,
  }

  handleAddField = () => {
    this.props.fields.push({});
  };

  handleRemoveField = index => {
    const {
      fields,
      stripes,
    } = this.props;

    stripes.store.dispatch(arrayRemove('loanHistoryForm', 'closingType.loanExceptions', index));
    fields.remove(index);
  };

  render() {
    const payments = get(this.props.resources, 'paymentMethods.records[0].payments', []);
    const paymentMethods = payments.map(item => ({ value: item.nameMethod, label: item.nameMethod }));

    return (
      <div>
        <FormattedMessage
          tagName="h4"
          id="ui-circulation.settings.loanHistory.exceptionSectionHeader"
        />
        <div className={css.exceptionSection}>
          <div data-test-exception-list>
            {this.props.fields.map((pathToException, exceptionIndex) => (
              <ExceptionCard
                key={pathToException}
                pathToException={pathToException}
                paymentMethods={uniqBy(paymentMethods, 'label')}
                exceptionIndex={exceptionIndex}
                onRemoveException={this.handleRemoveField}
              />))}
          </div>
          <div className={css.exceptionAddButton}>
            <Button
              type="button"
              buttonStyle="default"
              data-test-add-exception-button
              onClick={this.handleAddField}
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.addExceptionButton" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExceptionsList;
