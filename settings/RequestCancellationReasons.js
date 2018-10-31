import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';

class RequestCancellationReasons extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <this.connectedControlledVocab
        {...this.props}
        baseUrl="cancellation-reason-storage/cancellation-reasons"
        records="cancellationReasons"
        label={formatMessage({ id: 'ui-circulation.settings.cancelReasons.label' })}
        labelSingular={formatMessage({ id: 'ui-circulation.settings.cancelReasons.labelSingular' })}
        objectLabel=""
        visibleFields={['name', 'description', 'publicDescription']}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        columnMapping={{
          name: formatMessage({ id: 'ui-circulation.settings.cancelReasons.labelShort' }),
          description: formatMessage({ id: 'ui-circulation.settings.cancelReasons.descriptionInternal' }),
          publicDescription: formatMessage({ id: 'ui-circulation.settings.cancelReasons.descriptionPublic' }),
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

export default injectIntl(RequestCancellationReasons);
