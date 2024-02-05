import React from 'react';
import PropTypes from 'prop-types';
import { sortBy, get } from 'lodash';
import { injectIntl } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';

import RequestPolicyDetail from './RequestPolicyDetail';
import RequestPolicyForm from './RequestPolicyForm';
import RequestPolicy from '../Models/RequestPolicy';
import normalize from './utils/normalize';
import { getRecordName } from '../utils/utils';

import {
  requestPolicyTypes,
  MAX_UNPAGED_RESOURCE_COUNT,
  REQUEST_TYPE_RULES,
  MAX_RECORDS,
} from '../../constants';

export const findServicePointById = (servicePoints, id) => servicePoints.records.find(servicePoint => servicePoint.id === id);
export const parseInitialValues = (servicePoints) => (values = {}) => {
  const types = values.requestTypes || [];
  const typesMap = types.reduce((acc, type) => ({ ...acc, [type]: true }), {});
  const requestTypes = requestPolicyTypes.map((type) => {
    return !!typesMap[type];
  });
  const allowedServicePoints = {};
  const requestTypesRules = {};

  requestPolicyTypes.forEach(name => {
    if (values.allowedServicePoints?.[name]) {
      requestTypesRules[name] = REQUEST_TYPE_RULES.ALLOW_SOME;
      allowedServicePoints[name] = values.allowedServicePoints[name]
        .filter((id) => findServicePointById(servicePoints, id))
        .map((id) => ({
          label: findServicePointById(servicePoints, id)?.name,
          value: id,
        }));
    } else {
      requestTypesRules[name] = REQUEST_TYPE_RULES.ALLOW_ALL;
    }
  });

  return {
    ...values,
    requestTypes,
    allowedServicePoints,
    requestTypesRules,
  };
};

class RequestPolicySettings extends React.Component {
  static manifest = Object.freeze({
    requestPolicies: {
      type: 'okapi',
      records: 'requestPolicies',
      path: 'request-policy-storage/request-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: MAX_UNPAGED_RESOURCE_COUNT,
      },
      throwErrors: false,
    },
    circulationRules: {
      type: 'okapi',
      path: 'circulation/rules',
    },
    servicePoints: {
      type: 'okapi',
      records: 'servicepoints',
      path: 'service-points',
      params: {
        query: 'query=(pickupLocation==true) sortby name',
        limit: MAX_RECORDS,
      },
    },
  });

  static propTypes = {
    intl: PropTypes.object,
    resources: PropTypes.shape({
      requestPolicies: PropTypes.object,
      circulationRules: PropTypes.object,
      servicePoints: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      requestPolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
  }

  isPolicyInUse = (policyId) => {
    const { resources } = this.props;
    const circulationRules = get(resources, 'circulationRules.records[0].rulesAsText', '');

    return circulationRules.match(policyId);
  };

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
      location,
    } = this.props;
    const permissions = {
      put: 'ui-circulation.settings.request-policies',
      post: 'ui-circulation.settings.request-policies',
      delete: 'ui-circulation.settings.request-policies',
    };
    const entryList = sortBy((resources.requestPolicies || {}).records, ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.requestPolicies',
    });

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
        <EntryManager
          {...this.props}
          id="request-policy-settings"
          data-test-request-policy-settings
          parentMutator={mutator}
          parseInitialValues={parseInitialValues(resources.servicePoints)}
          parentResources={resources}
          entryList={entryList}
          resourceKey="requestPolicies"
          detailComponent={RequestPolicyDetail}
          entryFormComponent={RequestPolicyForm}
          paneTitle={formatMessage({ id : 'ui-circulation.settings.requestPolicy.paneTitle' })}
          entryLabel={formatMessage({ id : 'ui-circulation.settings.requestPolicy.entryLabel' })}
          nameKey="name"
          enableDetailsActionMenu
          permissions={permissions}
          onBeforeSave={normalize}
          defaultEntry={RequestPolicy.defaultPolicy()}
          isEntryInUse={this.isPolicyInUse}
          prohibitItemDelete={{
            close: formatMessage({ id : 'ui-circulation.settings.common.close' }),
            label: formatMessage({ id : 'ui-circulation.settings.requestPolicy.cannotDelete.label' }),
            message: formatMessage({ id : 'ui-circulation.settings.requestPolicy.cannotDelete.message' }),
          }}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(stripesConnect(RequestPolicySettings));
