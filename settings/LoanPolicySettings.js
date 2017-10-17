import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import EntrySelector from '@folio/stripes-components/lib/EntrySelector';
import Route from 'react-router-dom/Route';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Button from '@folio/stripes-components/lib/Button';
import LoanPolicyDetail from './LoanPolicyDetail';


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
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
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

    this.createNew = this.createNew.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onClickAddNew = this.onClickAddNew.bind(this);
    this.onCloseDetails = this.onCloseDetails.bind(this);
    this.connectedLoanPolicyDetail = props.stripes.connect(LoanPolicyDetail);

    const pathname = this.props.location.pathname;
    const selectedItem = (/loan-policies\/(.*)$/.test(pathname))
      ? /loan-policies\/(.*)$/.exec(pathname)[1]
      : null;

    this.state = {
      selectedItem
    };
  }

  onSelectRow(e, meta) {
    const policyId = meta.id;
    this.setState({ selectedItem: policyId });
    this.props.history.push(`${this.props.match.path}/${policyId}`);
  }

  createNew() {
    this.props.mutator.loanPolicies.POST({
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
    });
  }

  onClickAddNew() {
  }

  onCloseDetails() {
    this.setState({ selectedItem: {} });
    this.props.history.push(`${this.props.match.path}`);
  }

  getSelectedPolicy() {
    const loanPolicies = (this.props.resources.loanPolicies || {}).records || [];
    if (loanPolicies.length && this.state.selectedItem) {
      return loanPolicies.filter(p => p.id == this.state.selectedItem)[0];
    }
  }

  render() {
    const { stripes, resources: { loanPolicies } } = this.props;
    const records = (loanPolicies || {}).records || [];
    const policies = _.sortBy(records, ['name']);
    const count = loanPolicies && loanPolicies.hasLoaded ? loanPolicies.other.totalRecords : '';
    const resultsFormatter = {
      name: policy => policy.name,
    };

    const loanPolicy = this.getSelectedPolicy();
    const addNewButton = (
      <PaneMenu>
        <Button
          id="clickable-newpolicy"
          title="Add New User"
          onClick={this.onClickAddNew}
          buttonStyle="primary paneHeaderNewButton">+ New
        </Button>
      </PaneMenu>
    );

    const paneTitle = (
      <div style={{ textAlign: 'center' }}>
        <strong>Loan policies</strong>
        <div>
          <em>{stripes.intl.formatMessage({ id: 'ui-users.resultCount' }, { count })}</em>
        </div>
      </div>
    );

    return (
      <Paneset>
        <Pane
          id="policies"
          defaultWidth="fill"
          paneTitle={paneTitle}
          lastMenu={addNewButton}
          noOverflow>
          <MultiColumnList
            contentData={policies}
            selectedRow={{ id: this.state.selectedItem }}
            rowMetadata={['id']}
            formatter={resultsFormatter}
            onRowClick={this.onSelectRow}
            visibleColumns={['name']}
            isEmptyMessage={`No loan policies found`}
            loading={loanPolicies ? loanPolicies.isPending : false}
            autosize
            virtualize
            ariaLabel={'Loan policies'}
          />
        </Pane>

        <Route
          path={`${this.props.match.path}/:policyId`}
          render={props => <this.connectedLoanPolicyDetail policy={loanPolicy} stripes={stripes} okapi={this.okapi} paneWidth="60%" onClose={this.onCloseDetails} {...props} />}
        />
      </Paneset>
    );
  }

}

export default LoanPolicySettings;
