import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';

import StaffSlipDetail from './StaffSlipDetail';
import StaffSlipForm from './StaffSlipForm';

class StaffSlipManager extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
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
      intl: PropTypes.object.isRequired,
    }),
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      records: 'staffSlips',
      path: 'staff-slips-storage/staff-slips',
      throwErrors: false,
    },
  });

  constructor() {
    super();
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    // TODO: remove after default HOLD slip is provisioned during build process
    this.props.mutator.entries.POST({
      name: 'Hold',
      active: true,
      template: '<p></p>',
    });

    // TODO: remove after default TRANSIT slip is provisioned during build process
    this.props.mutator.entries.POST({
      name: 'Transit',
      active: true,
      template: '<p></p>',
    });
  }

  translate(id) {
    this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = this.translate('validation.required');
    }

    return errors;
  }

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={StaffSlipDetail}
        paneTitle={this.props.label}
        entryLabel={this.props.label}
        entryFormComponent={StaffSlipForm}
        validate={this.validate}
        nameKey="name"
        permissions={{
          put: 'settings.organization.enabled',
          post: 'ui-circulation.settings.staffslips.post',
          delete: 'ui-circulation.settings.staffslips.delete',
        }}
      />
    );
  }
}

export default StaffSlipManager;
