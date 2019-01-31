import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  TextArea,
  TextField,
  Checkbox,
  Accordion,
} from '@folio/stripes/components';

import { Metadata } from '../../../../components';

import styles from './GeneralSection.css';

class GeneralSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
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
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.generalInformation" />}
        onToggle={onToggle}
      >
        <Metadata
          connect={connect}
          metadata={metadata}
        />
        <Field
          id="notice_policy_name"
          name="name"
          label={(
            <FormattedMessage id="ui-circulation.settings.noticePolicy.policyName">
              {message => `${message} *`}
            </FormattedMessage>
          )}
          component={TextField}
        />
        <Field
          id="notice_policy_active"
          name="active"
          type="checkbox"
          className={styles.checkbox}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
          component={Checkbox}
          normalize={v => !!v}
        />
        <Field
          id="notice_policy_description"
          name="description"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyDescription" />}
          component={TextArea}
        />
      </Accordion>
    );
  }
}

export default GeneralSection;
