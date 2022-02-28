import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
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
    intl: PropTypes.object.isRequired,
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
      intl: {
        formatMessage,
      },
    } = this.props;

    return (
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        entryList={sortBy((resources.entries || {}).records || [], ['name'])}
        detailComponent={StaffSlipDetail}
        paneTitle={formatMessage({ id: 'ui-circulation.settings.index.staffSlips' })}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.staffSlips.staffSlipTokenHeader' })}
        entryFormComponent={StaffSlipForm}
        nameKey="name"
        permissions={{
          put: 'ui-circulation.settings.staff-slips',
          post: 'ui-circulation.settings.staff-slips.post',
          delete: 'ui-circulation.settings.staff-slips.delete'
        }}
      />
    );
  }
}

export default stripesConnect(injectIntl(StaffSlipManager));
