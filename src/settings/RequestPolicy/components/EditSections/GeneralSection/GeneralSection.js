import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';
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
    onToggle: PropTypes.func.isRequired,
    metadata: PropTypes.object.isRequired,
    connect: PropTypes.func.isRequired,
  };

  renderTypes = ({ fields }) => {
    const items = requestPolicyTypes.map((name, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id={`${name.toLowerCase()}-checkbox`}
            data-checked={fields.get(index)}
            label={name}
            name={`requestTypes[${index}]`}
          />
        </Col>
      </Row>
    ));

    return (
      <React.Fragment>
        <p>
          <FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes" />
        </p>
        {items}
      </React.Fragment>
    );
  }

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

        <FieldArray
          name="requestTypes"
          component={this.renderTypes}
        />

      </Accordion>
    );
  }
}

export default GeneralSection;
