import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

import {
  checkIfUserInCentralTenant,
} from '@folio/stripes/core';
import {CONSORTIUM_TITLE_LEVEL_REQUESTS} from "../../constants";

export const LAYERS = {
  EDIT: 'edit',
  CLONE: 'clone',
  ADD: 'add',
};

export const validateUniqueNameById = async ({
  currentName,
  previousId,
  getByName,
  selector,
  errorKey,
}) => {
  let error;

  if (currentName) {
    try {
      const response = await getByName(currentName);
      const responseData = await response.json();
      const data = get(responseData, selector, []);
      const matched = find(data, (item) => {
        return item.name.toLowerCase() === currentName.toLowerCase();
      });

      if (matched && matched.id !== previousId) {
        error = <FormattedMessage id={`ui-circulation.${errorKey}`} />;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  return error;
};

export const isEditLayer = (layer = '') => (layer.includes(LAYERS.EDIT));

export const getRecordName = ({
  entryList,
  location,
  formatMessage,
  optionNameId,
}) => {
  const pathParams = location.pathname.split('/');
  const recordId = pathParams[pathParams.length - 1];
  const query = new URLSearchParams(location.search);
  const layer = query.get('layer');
  const selectedRecordName = entryList.find(entry => entry.id === recordId)?.name;

  if (layer === LAYERS.EDIT) {
    return formatMessage(
      {
        id: 'ui-circulation.settings.title.editRecord',
      },
      {
        name: selectedRecordName,
      },
    );
  }

  if (layer === LAYERS.ADD || layer === LAYERS.CLONE) {
    return formatMessage(
      {
        id: 'ui-circulation.settings.title.newRecord',
      },
      {
        name: formatMessage(
          {
            id: optionNameId,
          },
          {
            optionNumber: 1,
          }
        ).toLowerCase(),
      },
    );
  }

  return selectedRecordName ||
    formatMessage(
      {
        id: optionNameId,
      },
      {
        optionNumber: 2,
      }
    );
};

export const getConsortiumTlrPermission = (stripes) => {
  if (stripes.hasInterface('consortia') && stripes.hasInterface('ecs-tlr') && checkIfUserInCentralTenant(stripes)) {
    return 'tlr.consortium-tlr.view';
  }

  return 'noPermission';
};

export const getLastRecordValue = (resource) => {
  if (resource.records) {
    return resource.records.slice(-1)[0];
  }

  return null;
};

export const getExcludeTenant = (excludeTenantId, tenants = []) => (
  excludeTenantId?.length
    ? tenants.filter(({ id }) => excludeTenantId.includes(id)).map(({ id, name }) => ({ label: name, value: id }))
    : []
);

export const getNormalizeData = (data) => {
  const ecsTlrFeatureEnabled = data?.[CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED];
  const excludeFromEcsRequestLendingTenantSearch = data?.[CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH];
  let excludeTenant = [];

  if (ecsTlrFeatureEnabled) {
    excludeTenant = excludeFromEcsRequestLendingTenantSearch?.length
      ? excludeFromEcsRequestLendingTenantSearch.map(({ value }) => value)
      : [];
  }

  return ({
    ecsTlrFeatureEnabled,
    excludeFromEcsRequestLendingTenantSearch: excludeTenant,
  });
};

export const getDataOptions = (tenants = []) => (
  tenants.map(({ id, name }) => (
    {
      label: name,
      value: id,
    }
  ))
);
