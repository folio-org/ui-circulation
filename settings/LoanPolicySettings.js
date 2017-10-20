import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EntrySelector from '@folio/stripes-components/lib/EntrySelector';
import Layer from '@folio/stripes-components/lib/Layer';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import queryString from 'query-string';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';

const defaultPolicy = {
  name: 'Untitled',
  loanable: true,
  loansPolicy: {
    profileId: '2',  // TODO: update when this is switched to a GUID
    closedLibraryDueDateManagementId: '4',  // TODO: update when this is switched to a GUID
  },
  renewable: true,
  renewalsPolicy: {
    unlimited: false,
    renewFromId: '2', // TODO: update when this is switched to a GUID
    differentPeriod: false,
  },
};

class LoanPolicySettings extends React.Component {

  static propTypes = {
    resources: PropTypes.object.isRequired,
    location: PropTypes.object,
    history: PropTypes.object,
    mutator: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        POST: PropTypes.func,
        DELETE: PropTypes.func,
        GET: PropTypes.func,
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
    },
  });

  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.transitionToParams = transitionToParams.bind(this);
    const path = props.location.pathname;
    const selectedId = (/loan-policies\//.test(path))
      ? /loan-policies\/(.*)$/.exec(path)[1]
      : null;

    this.state = { selectedId };
  }

  onAdd() {
    this.showLayer('add');
  }

  onEdit(policy) {
    this.setState({ selectedId: policy.id });
    this.showLayer('edit');
  }

  onRemove(policy) {
    this.props.mutator.loanPolicies.DELETE(policy);
    this.hideLayer();
  }

  onCancel(e) {
    e.preventDefault();
    this.hideLayer();
  }

  onSave(policy) {
    const action = (policy.id) ? 'PUT' : 'POST';
    this.props.mutator.loanPolicies[action](policy)
      .then(() => this.hideLayer());
  }

  showLayer(name) {
    this.props.history.push(`${this.props.location.pathname}?layer=${name}`);
  }

  hideLayer() {
    this.props.history.push(`${this.props.location.pathname}`);
  }

  render() {
    const { resources, location } = this.props;
    const loanPolicies = (resources.loanPolicies || {}).records || [];
    const policies = _.sortBy(loanPolicies, ['name']);
    const container = document.getElementById('ModuleContainer');
    const query = location.search ? queryString.parse(location.search) : {};

    const selectedItem = (query.layer === 'edit')
      ? _.find(policies, p => p.id === this.state.selectedId)
      : defaultPolicy;

    if (!container) {
      return (<div></div>);
    }

    return (
      <EntrySelector
        {...this.props}
        onAdd={this.onAdd}
        onEdit={this.onEdit}
        detailComponent={LoanPolicyDetail}
        contentData={policies}
        parentMutator={this.props.mutator}
        paneTitle="Loan policies"
        detailPaneTitle="Loan Policy Details"
        paneWidth="70%"
        addButtonTitle="Add loan policy"
      >
        <Layer isOpen={!!(query.layer)} label="Edit Loan Policy" container={container}>
          <LoanPolicyForm
            initialValues={selectedItem}
            onSubmit={record => this.onSave(record)}
            onCancel={this.onCancel}
            onRemove={this.onRemove}
          />
        </Layer>
      </EntrySelector>
    );
  }
}

export default LoanPolicySettings;
