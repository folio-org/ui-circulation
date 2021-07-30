import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import {
  TextArea,
  TextField,
  Accordion,
  Checkbox,
  Row,
  Col,
} from '@folio/stripes/components';

import { Metadata } from '../../../../components';
import { requestPolicyTypes } from '../../../../../constants';

class GeneralSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired,
    connect: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
  };

  renderTypes = () => {
    const items = requestPolicyTypes.map((name, index) => (
      <Row key={`request-policy-type-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id={`${name.toLowerCase()}-checkbox`}
            label={name}
            name={`requestTypes[${index}]`}
          />
        </Col>
      </Row>
    ));

    return (
      <>
        <p>
          <FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes" />
        </p>
        {items}
      </>
    );
  }

  render() {
    const {
      isOpen,
      metadata,
      connect,
      validateName,
    } = this.props;

    return (
      <Accordion
        id="generalRequestPolicyForm"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.requestPolicy.generalInformation" />}
      >
        <Metadata
          connect={connect}
          metadata={metadata}
        />
        <div data-test-request-policy-name>
          <Field
            id="request_policy_name"
            name="name"
            required
            autoFocus
            label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyName" />}
            component={TextField}
            validate={validateName}
          />
        </div>
        <Field
          id="request_policy_description"
          name="description"
          label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyDescription" />}
          component={TextArea}
        />
        <FieldArray
          name="requestTypes"
          component={this.renderTypes}
        />
      </Accordion>
    );
  }
}

export default GeneralSection;
