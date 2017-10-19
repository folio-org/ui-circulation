import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EntrySelector from '@folio/stripes-components/lib/EntrySelector';
import Layer from '@folio/stripes-components/lib/Layer';

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

    this.state = { editMode: false };
  }

  onAdd() {
    this.setState({ editMode: true, editItem: defaultPolicy });
  }

  onEdit(editItem) {
    this.setState({ editMode: true, editItem });
  }

  onRemove(policy) {
    this.props.mutator.loanPolicies.DELETE(policy);
    this.hideLayer();
  }

  onCancel() {
    this.hideLayer();
  }

  onSave(policy) {
    const action = (policy.id) ? 'PUT' : 'POST';
    this.props.mutator.loanPolicies[action](Object.assign(defaultPolicy, policy));
    this.hideLayer();
  }

  hideLayer() {
    this.setState({ editMode: false });
  }

  render() {
    const loanPolicies = (this.props.resources.loanPolicies || {}).records || [];
    const policies = _.sortBy(loanPolicies, ['name']);
    const container = document.getElementById('ModuleContainer');

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
        <Layer isOpen={this.state.editMode} label="Edit Loan Policy" container={container}>
          <LoanPolicyForm
            initialValues={this.state.editItem}
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
