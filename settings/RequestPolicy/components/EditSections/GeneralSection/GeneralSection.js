import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  TextArea,
  TextField,
  Accordion,
} from '@folio/stripes/components';

// eslint-disable-next-line
import { Metadata } from '@folio/circulation/settings/components';

class GeneralSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    metadata: PropTypes.object.isRequired,
    connect: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      metadata,
      connect,
      onToggle,
    } = this.props;

    return (
      <Accordion
        id="general"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.requestPolicy.generalInformation" />}
        onToggle={onToggle}
      >
        <Metadata
          connect={connect}
          metadata={metadata}
        />
        <Field
          id="request_policy_name"
          name="name"
          label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyName" />}
          component={TextField}
        />

        <Field
          id="request_policy_description"
          name="description"
          label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyDescription" />}
          component={TextArea}
        />
      </Accordion>
    );
  }
}

export default GeneralSection;
