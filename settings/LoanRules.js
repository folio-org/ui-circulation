import React from 'react';
import PropTypes from 'prop-types';
import { Paneset, Pane } from '@folio/stripes-components';
import fetch from 'isomorphic-fetch';

import LoanRulesForm from './lib/RuleEditor/LoanRulesForm';

// this represents a basic schema for what the loneRulesEditor expects...
const editorDefaultProps = {
  // whether or not to show the 'autocomplete' widget (pro mode)
  showAssist: true,
  completionLists: {
    'Patron Groups': [],
    'Material Type': [],
    'Loan Type': [],
  },
  policies: [ // these will probably include other info about the policy - perhaps a URL or other info about the rule.
    { name: 'policy-a' },
    { name: 'policy-b' },
    { name: 'policy-c' },
    { name: 'policy-d' },
    { name: 'in-house' },
    { name: 'no-circulation' },
    { name: 'locked' },
  ],
  typeMapping: { // these letters are hard-wired atm... but the labels have to correspond with completion lists.
    g: 'Patron Groups',
    m: 'Material Type',
    t: 'Loan Type',
  },
};

class LoanRules extends React.Component {

  static propTypes = {
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  static manifest = Object.freeze({
    loanRules: {
      type: 'okapi',
      path: 'circulation/loan-rules',
    },
    patronGroups: {
      type: 'okapi',
      path: 'groups',
      records: 'usergroups',
    },
    materialTypes: {
      type: 'okapi',
      path: 'material-types',
      records: 'mtypes',
    },
    loanTypes: {
      type: 'okapi',
      path: 'loan-types',
      records: 'loantypes',
    },
  });

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const { resources: { patronGroups, materialTypes, loanTypes } } = nextProps;
    return patronGroups.hasLoaded && materialTypes.hasLoaded && loanTypes.hasLoaded;
  }

  onSubmit(values) {
    const loanRules = values.loanRulesCode.replace(/\t/g, '    ');
    this.saveLoanRules(loanRules);
  }

  getLoanRulesCode() {
    const loanRules = (this.props.resources.loanRules || {}).records || [];
    const loanRulesCode = (loanRules.length) ? loanRules[0].loanRulesAsTextFile : '';
    return loanRulesCode.replace('    ', '\t');
  }

  getEditorProps() {
    const { resources: { patronGroups, materialTypes, loanTypes } } = this.props;

    return Object.assign({}, editorDefaultProps, {
      errors: this.state.errors,
      completionLists: {
        'Patron Groups': patronGroups.records.map(g => g.group),
        'Material Type': materialTypes.records.map(m => m.name),
        'Loan Type': loanTypes.records.map(l => l.name),
      },
    });
  }

  // TODO: refactor to use mutator after PUT is changed on the server or stripes-connect supports
  // custom PUT requests without the id attached to the end of the URL.
  saveLoanRules(loanRulesAsTextFile) {
    const stripes = this.props.stripes;
    const headers = Object.assign({}, {
      'X-Okapi-Tenant': stripes.okapi.tenant,
      'X-Okapi-Token': stripes.store.getState().okapi.token,
      'Content-Type': 'application/json',
    });

    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ loanRulesAsTextFile }),
    };

    this.setState({ errors: null });
    return fetch(`${stripes.okapi.url}/circulation/loan-rules`, options).then((resp) => {
      if (resp.status >= 400) {
        resp.json().then(json => this.setState({ errors: [json] }));
      }
    });
  }

  render() {
    if (!this.props.resources.patronGroups) {
      return (<div />);
    }

    const loanRulesCode = this.getLoanRulesCode();
    const editorProps = this.getEditorProps();

    return (
      <Paneset>
        <Pane paneTitle="Loan Rules Editor" defaultWidth="fill">
          <LoanRulesForm
            onSubmit={this.onSubmit}
            initialValues={{ loanRulesCode }}
            editorProps={editorProps}
          />
        </Pane>
      </Paneset>
    );
  }
}

export default LoanRules;
