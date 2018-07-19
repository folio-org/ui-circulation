import React from 'react';
import PropTypes from 'prop-types';
import ControlledVocab from '@folio/stripes-smart-components/lib/ControlledVocab';

class RequestCancellationReasons extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
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
        label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.label' })}
        labelSingular={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.labelSingular' })}
        objectLabel={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.objectLabel' })}
        visibleFields={['name', 'description', 'publicDescription']}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        columnMapping={{
          name: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.labelShort' }),
          description: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.descriptionInternal' }),
          publicDescription: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.cancelReasons.descriptionPublic' }),
        }}
        actionSuppressor={{
          edit: () => false,
          delete: reason => reason.requiresAdditionalInformation,
        }}
        nameKey="name"
        id="request-cancellation-reasons"
      />
    );
  }
}

export default RequestCancellationReasons;
