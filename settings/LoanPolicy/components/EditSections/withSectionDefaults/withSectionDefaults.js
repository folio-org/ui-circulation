import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
  upperFirst,
} from 'lodash';

import LoanPolicy from '../../../../Models/LoanPolicy';

function withSectionDefaults(WrappedComponent, sectionName) {
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

      if (policy[`shouldInit${upperFirst(sectionName)}`]()) {
        const defaultPolicy = LoanPolicy.defaultLoanPolicy();
        const sectionDefaults = get(defaultPolicy, sectionName, {});

        change(sectionName, sectionDefaults);
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSectionDefaults;
