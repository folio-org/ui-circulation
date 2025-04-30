import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';
import { Label } from '@folio/stripes/components';
import { getSourceSuppressor } from '@folio/stripes/util';

import { RECORD_SOURCE } from '../constants';

const suppress = getSourceSuppressor(RECORD_SOURCE.CONSORTIUM);

class RequestCancellationReasons extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const {
      stripes,
      intl: {
        formatMessage,
      },
    } = this.props;

    const isEditable = stripes.hasPerm('ui-circulation.settings.cancellation-reasons');

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={formatMessage({ id: 'ui-circulation.settings.title.requestCancellationReasons' })}
      >
        <this.connectedControlledVocab
          {...this.props}
          editable={isEditable}
          baseUrl="cancellation-reason-storage/cancellation-reasons"
          records="cancellationReasons"
          label={<FormattedMessage id="ui-circulation.settings.cancelReasons.label" />}
          translations={{
            cannotDeleteTermHeader: 'ui-circulation.settings.cancelReasons.cannotDeleteTermHeader',
            cannotDeleteTermMessage: 'ui-circulation.settings.cancelReasons.cannotDeleteTermMessage',
            deleteEntry: 'ui-circulation.settings.cancelReasons.deleteEntry',
            termDeleted: 'ui-circulation.settings.cancelReasons.termDeleted',
            termWillBeDeleted: 'ui-circulation.settings.cancelReasons.termWillBeDeleted',
          }}
          objectLabel=""
          visibleFields={['name', 'description', 'publicDescription']}
          hiddenFields={['lastUpdated', 'numberOfObjects']}
          columnMapping={{
            name: (
              <Label required>
                <FormattedMessage id="ui-circulation.settings.cancelReasons.labelShort" />
              </Label>
            ),
            description: <FormattedMessage id="ui-circulation.settings.cancelReasons.descriptionInternal" />,
            publicDescription: <FormattedMessage id="ui-circulation.settings.cancelReasons.descriptionPublic" />,
          }}
          actionSuppressor={{
            edit: suppress,
            delete: reason => reason.requiresAdditionalInformation || suppress(reason),
          }}
          nameKey="name"
          id="request-cancellation-reasons"
          sortby="name"
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(RequestCancellationReasons));
