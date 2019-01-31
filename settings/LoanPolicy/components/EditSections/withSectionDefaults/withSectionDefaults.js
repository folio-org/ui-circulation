import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
  forEach,
} from 'lodash';

function withSectionDefaults({
  component: WrappedComponent,
  checkMethodName,
  sectionsDefaults = {},
  dropdownDefaults = {},
}) {
  return class extends React.Component {
    static propTypes = {
      policy: PropTypes.object.isRequired,
      change: PropTypes.func.isRequired,
    };

    componentDidUpdate() {
      this.setDefaultValues();
      this.setEmptyDropdownDefaults();
    }

    setDefaultValues = () => {
      const {
        policy,
        change,
      } = this.props;

      if (policy[checkMethodName]()) {
        forEach(sectionsDefaults, (value, key) => {
          change(key, value);
        });
      }
    };

    setEmptyDropdownDefaults = () => {
      const {
        policy,
        change,
      } = this.props;

      forEach(dropdownDefaults, (value, key) => {
        const field = get(policy, key);

        if (!field.intervalId) {
          change(key, value);
        }
      });
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSectionDefaults;
