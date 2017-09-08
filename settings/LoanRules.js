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
    Campus: ['main'],
    'Patron Groups': ['visitor', 'off-campus', 'on-campus', 'undergrad'],
    Branch: ['main', 'downtown'],
    'Material Type': ['book', 'cd', 'dvd', 'newspaper', 'streaming-subscription', 'rare'],
    'Loan Type': ['special-items', 'rare'],
    Shelf: ['periodicals'],
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
    a: 'Campus',
    b: 'Branch',
    c: 'Collection',
    m: 'Material Type',
    s: 'Shelf',
    t: 'Loan Type',
  },
  // the editor will place these appropriately.
  // errors: [{ line: 9, message: 'There\'s something amiss on line 9!' },],
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
  });

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  // TODO: refactor to use mutator after PUT is changed on the server or stripes-connect supports
  // custom PUT requests without the id attached to the end of the URL.
  onSubmit(values) {
    const stripes = this.props.stripes;
    const headers = Object.assign({}, {
      'X-Okapi-Tenant': stripes.okapi.tenant,
      'X-Okapi-Token': stripes.store.getState().okapi.token,
      'Content-Type': 'application/json',
    });

    const loanRulesAsTextFile = values.loanRulesCode.replace(/\t/g, '    ');
    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ loanRulesAsTextFile }),
    };

    return fetch(`${stripes.okapi.url}/circulation/loan-rules`, options).then((data) => {
      if (data.status >= 400) {
        // TODO: handle errors when they are properly handled by the server
        this.setState({ errors: [{ line: 1, message: data.statusText }] });
      } else {
        this.setState({ errors: null });
      }
    });
  }

  getLoanRulesCode() {
    const loanRules = (this.props.resources.loanRules || {}).records || [];
    const loanRulesCode = (loanRules.length) ? loanRules[0].loanRulesAsTextFile : '';
    return loanRulesCode.replace('    ', '\t');
  }

  render() {
    const loanRulesCode = this.getLoanRulesCode();
    const editorProps = Object.assign({}, editorDefaultProps, { errors: this.state.errors });
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
