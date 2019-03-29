import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';


class RequestCancellationReasons extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    return (
      <this.connectedControlledVocab
        {...this.props}
        baseUrl="cancellation-reason-storage/cancellation-reasons"
        records="cancellationReasons"
        label={<FormattedMessage id="ui-circulation.settings.cancelReasons.label" />}
        labelSingular={<FormattedMessage id="ui-circulation.settings.cancelReasons.labelSingular" />}
        objectLabel=""
        visibleFields={['name', 'description', 'publicDescription']}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        columnMapping={{
          name: <FormattedMessage id="ui-circulation.settings.cancelReasons.labelShort" />,
          description: <FormattedMessage id="ui-circulation.settings.cancelReasons.descriptionInternal" />,
          publicDescription: <FormattedMessage id="ui-circulation.settings.cancelReasons.descriptionPublic" />,
        }}
        actionSuppressor={{
          edit: () => false,
          delete: reason => reason.requiresAdditionalInformation,
        }}
        nameKey="name"
        id="request-cancellation-reasons"
        sortby="name"
      />
    );
  }
}

export default stripesConnect(RequestCancellationReasons);
