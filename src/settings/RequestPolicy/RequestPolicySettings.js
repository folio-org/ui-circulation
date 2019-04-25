import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import RequestPolicyDetail from './RequestPolicyDetail';
import RequestPolicyForm from './RequestPolicyForm';
import { RequestPolicy as validateRequestPolicy } from '../Validation';
import RequestPolicy from '../Models/RequestPolicy';
import { requestPolicyTypes } from '../../constants';

class RequestPolicySettings extends React.Component {
  static manifest = Object.freeze({
    requestPolicies: {
      type: 'okapi',
      records: 'requestPolicies',
      path: 'request-policy-storage/request-policies',
    },
    nameUniquenessValidator: {
      type: 'okapi',
      records: 'requestPolicies',
      accumulate: 'true',
      path: 'request-policy-storage/request-policies',
      fetch: false,
    },
    circulationRules: {
      type: 'okapi',
      path: 'circulation/rules',
    },
  });

  static propTypes = {
    intl: intlShape.isRequired,
    resources: PropTypes.shape({
      requestPolicies: PropTypes.object,
      circulationRules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      requestPolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
  }

  parseInitialValues = (values = {}) => {
    const types = values.requestTypes || [];
    const typesMap = types.reduce((acc, type) => ({ ...acc, [type]: true }), {});
    const requestTypes = requestPolicyTypes.map((type) => {
      return !!typesMap[type];
    });

    return { ...values, requestTypes };
  }

  render() {
    const {
      resources,
      mutator,
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.request-policies',
      post: 'ui-circulation.settings.request-policies',
      delete: 'ui-circulation.settings.request-policies',
    };

    const entryList = sortBy((resources.requestPolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        id="request-policy-settings"
        data-test-request-policy-settings
        parentMutator={mutator}
        parseInitialValues={this.parseInitialValues}
        parentResources={resources}
        entryList={entryList}
        resourceKey="requestPolicies"
        detailComponent={RequestPolicyDetail}
        entryFormComponent={RequestPolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.requestPolicy.paneTitle" />}
        entryLabel={this.props.intl.formatMessage({ id : 'ui-circulation.settings.requestPolicy.entryLabel' })}
        nameKey="name"
        enableDetailsActionMenu
        permissions={permissions}
        validate={validateRequestPolicy}
        defaultEntry={RequestPolicy.defaultPolicy()}
      />
    );
  }
}

export default injectIntl(stripesConnect(RequestPolicySettings));
