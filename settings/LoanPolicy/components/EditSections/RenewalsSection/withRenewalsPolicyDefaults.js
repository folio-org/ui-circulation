import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
import LoanPolicy from '@folio/circulation/settings/Models/LoanPolicy';

function withRenewalsPolicyDefaults(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      policy: PropTypes.object.isRequired,
      change: PropTypes.func.isRequired,
    };

    componentDidUpdate() {
      this.setDefaultValues();
    }

    setDefaultValues = () => {
      const {
        policy,
        change,
      } = this.props;

      if (policy.shouldInitRenewalsPolicies()) {
        const { renewalsPolicy } = LoanPolicy.defaultLoanPolicy();

        change('renewalsPolicy', renewalsPolicy);
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withRenewalsPolicyDefaults;
