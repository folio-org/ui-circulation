import { kebabCase } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Callout, Paneset, Pane } from '@folio/stripes/components';
import fetch from 'isomorphic-fetch';

import LoanRulesForm from './lib/RuleEditor/LoanRulesForm';

// this represents a basic schema for what the loneRulesEditor expects...
const editorDefaultProps = {
  // whether or not to show the 'autocomplete' widget (pro mode)
  showAssist: true,
  completionLists: {
    patronGroups: [], // groups
    materialTypes: [],
    loanTypes: [],
  },
  policies: [],
  typeMapping: {
    g: 'patronGroups',
    m: 'materialTypes',
    t: 'loanTypes',
  },
};

class LoanRules extends React.Component {
  static manifest = Object.freeze({
    loanRules: {
      type: 'okapi',
      path: 'circulation/loan-rules',
      resourceShouldRefresh: true,
    },
    patronGroups: {
      type: 'okapi',
      path: 'groups',
      records: 'usergroups',
      resourceShouldRefresh: true,
    },
    materialTypes: {
      type: 'okapi',
      path: 'material-types',
      records: 'mtypes',
      resourceShouldRefresh: true,
    },
    loanTypes: {
      type: 'okapi',
      path: 'loan-types',
      records: 'loantypes',
      resourceShouldRefresh: true,
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
      resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
    } = nextProps.resources;

    return !patronGroups.isPending &&
      !materialTypes.isPending &&
      !loanTypes.isPending &&
      !loanPolicies.isPending;
  }

  onSubmit(values) {
    const loanRules = values.loanRulesCode.replace(/\t/g, '    ');
    this.saveLoanRules(loanRules);
  }

  getLoanRulesCode() {
    const loanRules = (this.props.resources.loanRules || {}).records || [];
    const loanRulesCode = (loanRules.length) ? loanRules[0].loanRulesAsTextFile : '';
    return this.convertIdsToNames(loanRulesCode.replace('    ', '\t'));
  }

  getEditorProps() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
    } = this.props.resources;

    return Object.assign({}, editorDefaultProps, {
      errors: this.state.errors,
      policies: loanPolicies.records.map(p => ({ name: kebabCase(p.name) })),
      completionLists: {
        patronGroups: patronGroups.records.map(g => kebabCase(g.group)),
        materialTypes: materialTypes.records.map(m => kebabCase(m.name)),
        loanTypes: loanTypes.records.map(l => kebabCase(l.name)),
      },
    });
  }

  getRecords() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
    } = this.props.resources;

    return [
      ...patronGroups.records.map(r => ({ name: kebabCase(r.group), id: r.id, prefix: 'g' })),
      ...materialTypes.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 'm' })),
      ...loanTypes.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 't' })),
      ...loanPolicies.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: ':' })),
    ];
  }

  convertNamesToIds(rulesStr) {
    const records = this.getRecords();
    return records.reduce((memo, r) => {
      // eslint-disable-next-line no-useless-escape
      const re = new RegExp(`(${r.prefix}.*?)(${r.name})(?=.*[g\s+|m\s+|t\s+|:\s*])?`, 'ig');
      return memo.replace(re, `$1${r.id}`);
    }, rulesStr);
  }

  convertIdsToNames(rulesStr) {
    const records = this.getRecords();
    return records.reduce((memo, r) => {
      const re = new RegExp(r.id, 'g');
      return memo.replace(re, r.name);
    }, rulesStr);
  }

  // TODO: refactor to use mutator after PUT is changed on the server or stripes-connect supports
  // custom PUT requests without the id attached to the end of the URL.
  saveLoanRules(rules) {
    const {
      stripes,
    } = this.props;

    const headers = Object.assign({}, {
      'X-Okapi-Tenant': stripes.okapi.tenant,
      'X-Okapi-Token': stripes.store.getState().okapi.token,
      'Content-Type': 'application/json',
    });

    const loanRulesAsTextFile = this.convertNamesToIds(rules);
    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ loanRulesAsTextFile }),
    };

    this.setState({ errors: null });
    return fetch(`${stripes.okapi.url}/circulation/loan-rules`, options).then((resp) => {
      if (resp.status >= 400) {
        resp.json().then(json => this.setState({ errors: [json] }));
      } else if (this.callout) {
        this.callout.sendCallout({ message: <FormattedMessage id="ui-circulation.settings.loanRules.rulesUpdated" /> });
      }
    });
  }

  render() {
    const {
      resources: { loanTypes },
    } = this.props;

    if (!loanTypes) {
      return (<div />);
    }

    const loanRulesCode = this.getLoanRulesCode();
    const editorProps = this.getEditorProps();

    return (
      <Paneset>
        <Pane
          data-test-loan-rules
          paneTitle={<FormattedMessage id="ui-circulation.settings.loanRules.paneTitle" />}
          defaultWidth="fill"
        >
          <LoanRulesForm
            onSubmit={this.onSubmit}
            initialValues={{ loanRulesCode }}
            editorProps={editorProps}
          />
        </Pane>
        <Callout ref={(ref) => { this.callout = ref; }} />
      </Paneset>
    );
  }
}

export default LoanRules;
