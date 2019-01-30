import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
  some,
} from 'lodash';

// eslint-disable-next-line
import {
  shortTermLoansOptions,
  longTermLoansOptions,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '@folio/circulation/constants';

// eslint-disable-next-line
import LoanPolicy from '@folio/circulation/settings/Models/LoanPolicy';

function withLoansPolicyDefaults(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      policy: PropTypes.object.isRequired,
      change: PropTypes.func.isRequired,
    };

    componentDidUpdate() {
      this.setDueDateManagementSelectedId();
      this.setDefaultValues();
    }

    isValidItemSelected = (options, selectedId) => {
      return some(options, ({ id }) => id === selectedId);
    };

    setDefaultValues = () => {
      const {
        policy,
        change,
      } = this.props;

      if (policy.shouldInitLoansPolicy()) {
        const {
          loansPolicy,
          renewalsPolicy,
          requestManagement,
        } = LoanPolicy.defaultLoanPolicy();

        change('loansPolicy', loansPolicy);
        change('renewable', true);
        change('renewalsPolicy', renewalsPolicy);
        change('requestManagement', requestManagement);
      }
    };

    setDueDateManagementSelectedId = () => {
      const {
        policy,
        change,
      } = this.props;

      const pathToField = 'loansPolicy.closedLibraryDueDateManagementId';
      const isShortTermLoan = policy.isShortTermLoan();
      const selectedId = get(policy, pathToField);

      const isValidShortTermLoanValue = this.isValidItemSelected(shortTermLoansOptions, selectedId);
      const isValidLongTermLoanValue = this.isValidItemSelected(longTermLoansOptions, selectedId);

      if (isShortTermLoan && !isValidShortTermLoanValue) {
        /* Set default value for short term loan if long term loan item was selected */
        change(pathToField, CURRENT_DUE_DATE_TIME);
      }

      if (!isShortTermLoan && !isValidLongTermLoanValue) {
        /* Set default value for long term loan if short term loan item was selected */
        change(pathToField, CURRENT_DUE_DATE);
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withLoansPolicyDefaults;
