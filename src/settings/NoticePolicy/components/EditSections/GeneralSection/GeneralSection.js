import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  TextArea,
  TextField,
  Checkbox,
  Accordion,
  AccordionSet,
} from '@folio/stripes/components';

import { Metadata } from '../../../../components';

import styles from './GeneralSection.css';

class GeneralSection extends React.Component {
  static propTypes = {
    metadata: PropTypes.shape({
      createdDate: PropTypes.string,
    }).isRequired,
    connect: PropTypes.func.isRequired,
  };

  render() {
    const {
      metadata,
      connect,
    } = this.props;

    return (
      <div data-test-notice-policy-form-general-section>
        <Accordion
          data-testid="general"
          id="general"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.generalInformation" />}
        >
          <AccordionSet>
            <Metadata
              connect={connect}
              metadata={metadata}
            />
          </AccordionSet>
          <div
            data-test-general-section-policy-name
            data-testid="nameField"
          >
            <Field
              id="notice_policy_name"
              name="name"
              label={<FormattedMessage id="ui-circulation.settings.noticePolicy.policyName" />}
              required
              autoFocus
              component={TextField}
            />
          </div>
          <div
            data-test-general-section-active
            data-testid="activeField"
          >
            <Field
              id="notice_policy_active"
              name="active"
              type="checkbox"
              className={styles.checkbox}
              label={<FormattedMessage id="ui-circulation.settings.noticePolicy.active" />}
              component={Checkbox}
            />
          </div>
          <div
            data-test-general-section-policy-description
            data-testid="descriptionField"
          >
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
