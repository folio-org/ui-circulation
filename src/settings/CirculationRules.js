import { kebabCase } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Callout, Paneset, Pane } from '@folio/stripes/components';
import fetch from 'isomorphic-fetch';
import { stripesConnect } from '@folio/stripes/core';

import RulesForm from './lib/RuleEditor/RulesForm';

const editorDefaultProps = {
  // whether or not to show the 'autocomplete' widget (pro mode)
  showAssist: true,
  completionLists: {
    patronGroups: [],
    materialTypes: [],
    loanTypes: [],
    locations: [],
    institutions: [],
    campuses: [],
    libraries: [],
  },
  typeMapping: {
    g: 'patronGroups',
    m: 'materialTypes',
    t: 'loanTypes',
    a: 'institutions'
  },
  policyMapping: {
    l: 'loanPolicies',
    r: 'requestPolicies',
    n: 'noticePolicies',
  },
};

class CirculationRules extends React.Component {
  static manifest = Object.freeze({
    circulationRules: {
      type: 'okapi',
      path: 'circulation/rules',
      resourceShouldRefresh: true,
    },
    patronGroups: {
      type: 'okapi',
      path: 'groups',
      records: 'usergroups',
      params: {
        limit: '100',
      },
      resourceShouldRefresh: true,
    },
    materialTypes: {
      type: 'okapi',
      path: 'material-types',
      params: {
        limit: '100',
      },
      records: 'mtypes',
      resourceShouldRefresh: true,
    },
    loanTypes: {
      type: 'okapi',
      path: 'loan-types',
      params: {
        limit: '100',
      },
      records: 'loantypes',
      resourceShouldRefresh: true,
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
      params: {
        limit: '100',
      },
      resourceShouldRefresh: true,
    },
    requestPolicies: {
      type: 'okapi',
      records: 'requestPolicies',
      path: 'request-policy-storage/request-policies',
      params: {
        limit: '100',
      },
      resourceShouldRefresh: true,
    },
    noticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
      params: {
        limit: '100',
      },
      resourceShouldRefresh: true,
    },
    locations: {
      type: 'okapi',
      records: 'locations',
      path: 'locations',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: '1000',
      },
      resourceShouldRefresh: true,
    },
    institutions: {
      type: 'okapi',
      records: 'locinsts',
      path: 'location-units/institutions',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: '1000',
      },
      resourceShouldRefresh: true,
    },
    campuses: {
      type: 'okapi',
      records: 'loccamps',
      path: 'location-units/campuses',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: '1000',
      },
      resourceShouldRefresh: true,
    },
    libraries: {
      type: 'okapi',
      records: 'loclibs',
      path: 'location-units/libraries',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: '1000',
      },
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
      requestPolicies,
      noticePolicies,
      locations,
      institutions,
      campuses,
      libraries,
    } = nextProps.resources;

    return !patronGroups.isPending &&
      !materialTypes.isPending &&
      !loanTypes.isPending &&
      !loanPolicies.isPending &&
      !requestPolicies.isPending &&
      !noticePolicies.isPending &&
      !locations.isPending &&
      !institutions.isPending &&
      !campuses.isPending &&
      !libraries.isPending;
  }

  onSubmit(values) {
    const rules = values.rules.replace(/\t/g, '    ');
    this.save(rules);
  }

  getRules() {
    const rules = (this.props.resources.circulationRules || {}).records || [];
    const rulesStr = (rules.length) ? rules[0].rulesAsText : '';

    return this.convertIdsToNames(rulesStr.replace('    ', '\t'));
  }

  getEditorProps() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
      noticePolicies,
      requestPolicies,
      institutions,
    } = this.props.resources;

    return Object.assign({}, editorDefaultProps, {
      errors: this.state.errors,
      completionLists: {
        // types
        patronGroups: patronGroups.records.map(g => kebabCase(g.group)),
        materialTypes: materialTypes.records.map(m => kebabCase(m.name)),
        loanTypes: loanTypes.records.map(t => kebabCase(t.name)),
        // TODO: The codes should be normalized in the scope of https://issues.folio.org/browse/UICIRC-260
        institutions: institutions.records.map(a => a.code),
        // policies
        loanPolicies: loanPolicies.records.map(l => kebabCase(l.name)),
        requestPolicies: requestPolicies.records.map(r => kebabCase(r.name)),
        noticePolicies: noticePolicies.records.map(n => kebabCase(n.name)),
      },
    });
  }

  getRecords() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
      requestPolicies,
      noticePolicies,
      institutions,
    } = this.props.resources;

    return [
      ...patronGroups.records.map(r => ({ name: kebabCase(r.group), id: r.id, prefix: 'g', divider: '.' })),
      ...materialTypes.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 'm', divider: '.' })),
      ...loanTypes.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 't', divider: '.' })),
      // TODO: The codes should be normalized in the scope of https://issues.folio.org/browse/UICIRC-260
      ...institutions.records.map(r => ({ name: r.code, id: r.id, prefix: 'a', divider: '.' })),
      ...loanPolicies.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 'l', divider: '\\s' })),
      ...requestPolicies.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 'r', divider: '\\s' })),
      ...noticePolicies.records.map(r => ({ name: kebabCase(r.name), id: r.id, prefix: 'n', divider: '\\s' })),
    ];
  }

  convertNamesToIds(rulesStr) {
    const records = this.getRecords();
    return records.reduce((memo, r) => {
      // eslint-disable-next-line no-useless-escape
      const re = new RegExp(`(${r.prefix}${r.divider}+)(${r.name})(?=\\s+[g\s+|m\s+|t\s+|l\s+|r\s+|n\s+|:\s*])?`, 'igm');
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
  save(rules) {
    const {
      stripes,
    } = this.props;

    const headers = Object.assign({}, {
      'X-Okapi-Tenant': stripes.okapi.tenant,
      'X-Okapi-Token': stripes.store.getState().okapi.token,
      'Content-Type': 'application/json',
    });

    const rulesAsText = this.convertNamesToIds(rules);
    const body = JSON.stringify({ rulesAsText });
    const options = {
      method: 'PUT',
      headers,
      body,
    };

    this.setState({ errors: null });
    return fetch(`${stripes.okapi.url}/circulation/rules`, options).then((resp) => {
      if (resp.status >= 400) {
        resp.json().then(json => this.setState({ errors: [json] }));
      } else if (this.callout) {
        this.callout.sendCallout({ message: <FormattedMessage id="ui-circulation.settings.circulationRules.rulesUpdated" /> });
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

    const rules = this.getRules();
    const editorProps = this.getEditorProps();

    return (
      <Paneset>
        <Pane
          data-test-circulation-rules
          paneTitle={<FormattedMessage id="ui-circulation.settings.circulationRules.paneTitle" />}
          defaultWidth="fill"
        >
          <RulesForm
            onSubmit={this.onSubmit}
            initialValues={{ rules }}
            editorProps={editorProps}
          />
        </Pane>
        <Callout ref={(ref) => { this.callout = ref; }} />
      </Paneset>
    );
  }
}

export default stripesConnect(CirculationRules);
