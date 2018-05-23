import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import { FormattedMessage } from 'react-intl';

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
      records: 'staffslips',
      path: 'staffslips',
      throwErrors: false,
    },
  });

  constructor() {
    super();
    this.validate = this.validate.bind(this);
    this.state = { records: [] };
  }

  translate(id) {
    this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  // TODO: remove after server side is done
  componentDidMount() {
    let staffSlips;

    try {
      staffSlips = JSON.parse(LocalStorage.getItem('staffSlips'));
    } catch(e) {
      staffSlips = [{ id: 1, name: 'Hold' }];
    }
    this.setState({ records: staffSlips });
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
        //entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        entryList={sortBy(this.state.records || [], ['name'])}
        detailComponent={StaffSlipDetail}
        paneTitle={this.props.label}
        entryLabel={this.props.label}
        entryFormComponent={StaffSlipForm}
        validate={this.validate}
        nameKey="name"
        permissions={{
          put: 'settings.organization.enabled',
          post: 'settings.organization.enabled',
          delete: 'settings.organization.enabled',
        }}
      />
    );
  }
}

export default StaffSlipManager;
