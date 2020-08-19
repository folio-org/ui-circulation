import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
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
    connect: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      metadata,
      connect,
    } = this.props;

    return (
      <div data-test-notice-policy-form-general-section>
        <Accordion
          id="general"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.generalInformation" />}
        >
          <Metadata
            connect={connect}
            metadata={metadata}
          />
          <div data-test-general-section-policy-name>
            <Field
              id="notice_policy_name"
              name="name"
              label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyName" />}
              required
              component={TextField}
            />
          </div>
          <div data-test-general-section-active>
            <Field
              id="notice_policy_active"
              name="active"
              type="checkbox"
              className={styles.checkbox}
              label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
              component={Checkbox}
            />
          </div>
          <div data-test-general-section-policy-description>
            <Field
              id="notice_policy_description"
              name="description"
              label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyDescription" />}
              component={TextArea}
            />
          </div>
        </Accordion>
      </div>
    );
  }
}

export default GeneralSection;
