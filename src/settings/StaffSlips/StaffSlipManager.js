import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import StaffSlipDetail from './StaffSlipDetail';
import StaffSlipForm from './StaffSlipForm';

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
    } = this.props;

    return (
      <FormattedMessage id="ui-circulation.settings.staffSlips.staffSlipTokenHeader">
        {(entryLabel) => (
          <EntryManager
            {...this.props}
            parentMutator={mutator}
            entryList={sortBy((resources.entries || {}).records || [], ['name'])}
            detailComponent={StaffSlipDetail}
            paneTitle={<FormattedMessage id="ui-circulation.settings.index.staffSlips" />}
            entryLabel={entryLabel}
            entryFormComponent={StaffSlipForm}
            nameKey="name"
            permissions={{
              put: 'ui-circulation.settings.staff-slips',
              post: 'ui-circulation.settings.staff-slips.post',
              delete: 'ui-circulation.settings.staff-slips.delete'
            }}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default stripesConnect(StaffSlipManager);
