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

  onSubmit(values) {
    const loanRules = values.loanRulesCode.replace(/\t/g, '    ');
    this.saveLoanRules(loanRules);
  }

  getLoanRulesCode() {
    const loanRules = (this.props.resources.loanRules || {}).records || [];
    const loanRulesCode = (loanRules.length) ? loanRules[0].loanRulesAsTextFile : '';
    return loanRulesCode.replace('    ', '\t');
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

    return fetch(`${stripes.okapi.url}/circulation/loan-rules`, options).then((resp) => {
      if (resp.status >= 400) {
        // TODO: replace with JSON errors when CIRC-34 is ready on the server
        resp.text().then((text) => {
          const message = text.replace(/^(.+?):\s+/, '').split(' in line')[0];
          let line;
          try {
            line = parseInt(text.match(/ in line ([0-9]+)/, '')[1], 10);
          } catch (e) {
            line = 0;
          }
          this.setState({ errors: [{ line, message }] });
        });
      } else {
        this.setState({ errors: null });
      }
    });
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
