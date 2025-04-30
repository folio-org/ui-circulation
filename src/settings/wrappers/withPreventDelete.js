import React from 'react';
import PropTypes from 'prop-types';

/**
 * HOC for providing the ability to check whether a given policy of certain types (e.g., lost item fee policies)
 * is in use by any open loans. This setup should work for any policy that is specified by ID in a loan record
 * (e.g., `loanPolicyId: 'd9cd0bed-1b49-4b5e-a7bd-064b8d177231'`). The key function is `isPolicyInUse`, which is
 * provided to the wrapped component as a prop (`checkPolicy`).
 *
 * This component is intended to work with <EntryManager>, which the various policy types use for management. Thus,
 * it provides the four props that should be added to the <EntryManager> invocation in the wrapped component:
 *   1. `checkPolicy` (apply to <EntryManager>'s `isEntryInUse` prop)
 *   2. `closeText` (apply to `prohibitItemDelete.close`)
 *   3. `labelText` (apply to `prohibitItemDelete.label`)
 *   4. `messageText` (apply to `prohibitItemDelete.message`)
 *
 * The label text and loans query ID are determined by providing the right `policyType` param.
 *
 * @param {*} WrappedComponent
 * @param {string} policyType The type-specific identifier used to construct the CQL query and select translation strings, e.g. `loanPolicy`
 * @returns WrappedComponent
 */
const withPreventDelete = (WrappedComponent, policyType) => class withPreventDeleteComponent extends React.Component {
  static manifest = {
    ...WrappedComponent.manifest,
    selectedPolicyId: {},
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
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    mutator: PropTypes.shape({
      selectedPolicyId: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
    resources: PropTypes.shape({
      loans: PropTypes.shape({
        isLoading: PropTypes.bool,
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.updateSelectedPolicy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateSelectedPolicy();
    }
  }

  updateSelectedPolicy = () => {
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
        closeText="ui-circulation.settings.common.close"
        labelText={`ui-circulation.settings.${policyType}.denyDelete.header`}
        messageText="ui-circulation.settings.policy.denyDelete.body"
      />
    );
  }
};

export default withPreventDelete;
