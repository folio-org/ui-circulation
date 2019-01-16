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
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.generalInformation" />}
        onToggle={onToggle}
      >
        <Metadata
          connect={connect}
          metadata={metadata}
        />
        <Field
          id="notice_policy_name"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyName" />}
          component={TextField}
          name="name"
        />
        <Field
          id="notice_policy_active"
          className={styles.checkbox}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
          style={{ margin: '10px 0' }}
          name="active"
          component={Checkbox}
          type="checkbox"
          normalize={v => !!v}
        />
        <Field
          id="notice_policy_description"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyDescription" />}
          name="description"
          component={TextArea}
        />
      </Accordion>
    );
  }
}

export default GeneralSection;
