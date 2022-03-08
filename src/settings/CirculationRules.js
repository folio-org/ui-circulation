import {
  kebabCase,
  get,
} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Callout,
  Pane,
} from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import RulesForm from './lib/RuleEditor/RulesForm';
import {
  MAX_UNPAGED_RESOURCE_COUNT,
  POLICY,
  RULES_TYPE,
} from '../constants';
import replacer from './utils/with-dash-replacer';
import * as formatter from './utils/location-code-formatters';
import {
  convertIdsToNames,
  convertNamesToIds,
} from './utils/rules-string-convertors';

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
    [RULES_TYPE.PATRON_GROUP]: 'patronGroups',
    [RULES_TYPE.MATERIAL]: 'materialTypes',
    [RULES_TYPE.LOAN]: 'loanTypes',
    [RULES_TYPE.INSTITUTION]: 'institutions',
    [RULES_TYPE.CAMPUS]: 'campuses',
    [RULES_TYPE.LIBRARY]: 'libraries',
    [RULES_TYPE.LOCATION]: 'locations',
  },
  policyMapping: {
    [POLICY.LOAN]: 'loanPolicies',
    [POLICY.REQUEST]: 'requestPolicies',
    [POLICY.NOTICE]: 'noticePolicies',
    [POLICY.OVERDUE_FINE]: 'overdueFinePolicies',
    [POLICY.LOST_ITEM_FEE]: 'lostItemFeePolicies',
  },
};

class CirculationRules extends React.Component {
  static manifest = Object.freeze({
    circulationRules: {
      type: 'okapi',
      path: 'circulation/rules',
      resourceShouldRefresh: true,
      throwErrors: false,
    },
    patronGroups: {
      type: 'okapi',
      path: 'groups',
      records: 'usergroups',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    materialTypes: {
      type: 'okapi',
      path: 'material-types',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      records: 'mtypes',
      resourceShouldRefresh: true,
    },
    loanTypes: {
      type: 'okapi',
      path: 'loan-types',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      records: 'loantypes',
      resourceShouldRefresh: true,
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    requestPolicies: {
      type: 'okapi',
      records: 'requestPolicies',
      path: 'request-policy-storage/request-policies',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    noticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    overdueFinePolicies: {
      type: 'okapi',
      records: 'overdueFinePolicies',
      path: 'overdue-fines-policies',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    lostItemFeePolicies: {
      type: 'okapi',
      records: 'lostItemFeePolicies',
      path: 'lost-item-fees-policies',
      params: {
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    locations: {
      type: 'okapi',
      records: 'locations',
      path: 'locations',
      params: {
        query: 'cql.allRecords=1 sortby code name',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    institutions: {
      type: 'okapi',
      records: 'locinsts',
      path: 'location-units/institutions',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    campuses: {
      type: 'okapi',
      records: 'loccamps',
      path: 'location-units/campuses',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
    libraries: {
      type: 'okapi',
      records: 'loclibs',
      path: 'location-units/libraries',
      params: {
        query: 'cql.allRecords=1 sortby name',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      circulationRules: PropTypes.shape({
        PUT: PropTypes.func.isRequired
      })
    })
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
      overdueFinePolicies,
      lostItemFeePolicies,
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
      !overdueFinePolicies.isPending &&
      !lostItemFeePolicies.isPending &&
      !locations.isPending &&
      !institutions.isPending &&
      !campuses.isPending &&
      !libraries.isPending;
  }

  onSubmit(values) {
    const rules = values.rules.replace(/\t/g, '    ');

    this.save(rules);
    this.setState({ rules: values.rules });
  }

  getRules() {
    const rules = (this.props.resources.circulationRules || {}).records || [];
    const rulesStr = (rules.length) ? rules[0].rulesAsText : '';

    return convertIdsToNames(rulesStr.replace('    ', '\t'), this.getRecords());
  }

  getEditorProps() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
      noticePolicies,
      requestPolicies,
      overdueFinePolicies,
      lostItemFeePolicies,
      institutions,
      campuses,
      libraries,
      locations,
    } = this.props.resources;

    return { ...editorDefaultProps,
      errors: this.state.errors,
      completionLists: {
        // types
        patronGroups: patronGroups.records.map(g => kebabCase(g.group)),
        materialTypes: materialTypes.records.map(m => kebabCase(m.name)),
        loanTypes: loanTypes.records.map(t => kebabCase(t.name)),
        institutions: institutions.records.map(institution => ({
          id: institution.id,
          code: replacer(institution.code),
          displayCode: replacer(institution.code),
        })),
        campuses: campuses.records.map(campus => ({
          id: campus.id,
          code: formatter.formatCampusCode(campus, institutions),
          displayCode: formatter.formatCampusDisplayCode(campus, institutions),
          parentId: campus.institutionId,
        })),
        libraries: libraries.records.map(library => ({
          id: library.id,
          code: formatter.formatLibraryCode(library, institutions, campuses),
          displayCode: formatter.formatLibraryDisplayCode(library, institutions, campuses),
          parentId: library.campusId,
        })),
        locations: locations.records.map(location => ({
          id: location.id,
          code: formatter.formatLocationCode(location, institutions, campuses, libraries),
          displayCode: formatter.formatLocationDisplayCode(location),
          parentId: location.libraryId,
        })),
        // policies
        loanPolicies: loanPolicies.records.map(l => kebabCase(l.name)),
        requestPolicies: requestPolicies.records.map(r => kebabCase(r.name)),
        noticePolicies: noticePolicies.records.map(n => kebabCase(n.name)),
        overdueFinePolicies: overdueFinePolicies.records.map(o => kebabCase(o.name)),
        lostItemFeePolicies: lostItemFeePolicies.records.map(i => kebabCase(i.name)),
      } };
  }

  getRecords() {
    const {
      patronGroups,
      materialTypes,
      loanTypes,
      loanPolicies,
      requestPolicies,
      noticePolicies,
      overdueFinePolicies,
      lostItemFeePolicies,
      institutions,
      campuses,
      libraries,
      locations,
    } = this.props.resources;

    const reduceHandler = (memo, code, id) => {
      memo[code] = id;

      return memo;
    };

    const reducePolicyHandler = (memo, policy) => {
      return reduceHandler(memo, kebabCase(policy.name), policy.id);
    };

    return {
      [RULES_TYPE.PATRON_GROUP]: patronGroups.records.reduce((memo, patronGroup) => {
        return reduceHandler(memo, kebabCase(patronGroup.group), patronGroup.id);
      }, {}),
      [RULES_TYPE.MATERIAL]: materialTypes.records.reduce((memo, materialType) => {
        return reduceHandler(memo, kebabCase(materialType.name), materialType.id);
      }, {}),
      [RULES_TYPE.LOAN]: loanTypes.records.reduce((memo, loanType) => {
        return reduceHandler(memo, kebabCase(loanType.name), loanType.id);
      }, {}),
      [RULES_TYPE.INSTITUTION]: institutions.records.reduce((memo, institution) => {
        return reduceHandler(memo, replacer(institution.code), institution.id);
      }, {}),
      [RULES_TYPE.CAMPUS]: campuses.records.reduce((memo, campus) => {
        return reduceHandler(memo, formatter.formatCampusCode(campus, institutions), campus.id);
      }, {}),
      [RULES_TYPE.LIBRARY]: libraries.records.reduce((memo, library) => {
        return reduceHandler(memo, formatter.formatLibraryCode(library, institutions, campuses), library.id);
      }, {}),
      [RULES_TYPE.LOCATION]: locations.records.reduce((memo, location) => {
        return reduceHandler(memo, formatter.formatLocationCode(location, institutions, campuses, libraries), location.id);
      }, {}),
      [POLICY.LOAN]: loanPolicies.records.reduce(reducePolicyHandler, {}),
      [POLICY.REQUEST]: requestPolicies.records.reduce(reducePolicyHandler, {}),
      [POLICY.NOTICE]: noticePolicies.records.reduce(reducePolicyHandler, {}),
      [POLICY.OVERDUE_FINE]: overdueFinePolicies.records.reduce(reducePolicyHandler, {}),
      [POLICY.LOST_ITEM_FEE]: lostItemFeePolicies.records.reduce(reducePolicyHandler, {}),
    };
  }

  save(rules) {
    const { mutator: { circulationRules: { PUT } } } = this.props;
    const rulesAsText = convertNamesToIds(rules, this.getRecords());

    this.setState({ errors: null });

    PUT({ rulesAsText }).then(() => {
      if (this.callout) {
        this.callout.sendCallout({ message: <FormattedMessage id="ui-circulation.settings.circulationRules.rulesUpdated" /> });
      }
    }).catch((resp) => {
      if (resp.status && resp.status > 400) {
        resp.json().then(json => this.setState({ errors: [json] }));
      }
    });
  }

  render() {
    const {
      resources,
    } = this.props;

    if (!get(resources, 'loanTypes.hasLoaded', false)) {
      return (<div />);
    }

    const rules = this.state.rules || this.getRules();
    const editorProps = this.getEditorProps();

    return (
      <>
        <Pane
          id="circulation-rules-pane"
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
      </>
    );
  }
}

export default stripesConnect(CirculationRules);
