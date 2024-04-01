import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';

import StaffSlipDetail from './StaffSlipDetail';
import StaffSlipForm from './StaffSlipForm';
import { getRecordName } from '../utils/utils';

class StaffSlipManager extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      entries: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      entries: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
    }),
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      records: 'staffSlips',
      path: 'staff-slips-storage/staff-slips',
      throwErrors: false,
    },
  });

  render() {
    const {
      mutator,
      resources,
      stripes,
      intl: {
        formatMessage,
      },
      location,
    } = this.props;
    const entryList = sortBy((resources.entries || {}).records || [], ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.staffSlips',
    });
    const isEditable = stripes.hasPerm('ui-circulation.settings.edit-staff-slips');

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
        <EntryManager
          {...this.props}
          parentMutator={mutator}
          entryList={entryList}
          detailComponent={StaffSlipDetail}
          paneTitle={formatMessage({ id: 'ui-circulation.settings.index.staffSlips' })}
          entryLabel={formatMessage({ id: 'ui-circulation.settings.staffSlips.staffSlipTokenHeader' })}
          entryFormComponent={StaffSlipForm}
          nameKey="name"
          editable={isEditable}
          permissions={{
            put: 'ui-circulation.settings.staff-slips',
            post: 'ui-circulation.settings.staff-slips.post',
            delete: 'ui-circulation.settings.staff-slips.delete'
          }}
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(StaffSlipManager));
