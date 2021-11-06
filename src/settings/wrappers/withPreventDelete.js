import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// TODO: Add description here
const withPreventDelete = (WrappedComponent, policyType) => class withPreventDeleteComponent extends React.Component {
  static manifest = {
    ...WrappedComponent.manifest,
    selectedPolicyId: {},
    policyType: {},
    loans: {
      type: 'okapi',
      records: 'loans',
      path: 'circulation/loans',
      params: {
        query: `status.name==Open and ${policyType}Id==%{selectedPolicyId}`,
      },
    },
  };

  static propTypes = {
    mutator: PropTypes.shape({
      selectedPolicyId: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.updateSelectedPolicy = this.updateSelectedPolicy.bind(this);
    this.updateSelectedPolicy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateSelectedPolicy();
    }
  }

  updateSelectedPolicy() {
    const {
      location,
      mutator,
    } = this.props;

    const path = location.pathname;
    mutator.selectedPolicyId.replace(path.substring(path.lastIndexOf('/') + 1));
  }

  /**
   * This function is used as a prop for <EntryManager> to determine
   * whether or not a policy can be deleted -- i.e., whether or not
   * there are any active loans that are using it.
   *
   * The loans resource query returns open loan records with a loanPolicyId
   * of `selectedPolicyId`, a local resource that should be set before
   * calling this function.
   */
  isPolicyInUse = () => this.props.resources.loans.isLoading || this.props.resources.loans.records.length > 0;

  render() {
    return (
      <WrappedComponent
        {...this.props}
        checkPolicy={this.isPolicyInUse}
        updatePolicy={this.updateSelectedPolicy}
        closeText="ui-circulation.settings.common.close"
        labelText={`ui-circulation.settings.${policyType}.denyDelete.header`}
        messageText="ui-circulation.settings.policy.denyDelete.body"
      />
    );
  }
}

export default withPreventDelete;