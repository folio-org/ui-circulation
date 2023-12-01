import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import {
  TextArea,
  TextField,
  Accordion,
  Checkbox,
  RadioButton,
  MultiSelection,
  RadioButtonGroup,
  Row,
  Col,
  InfoPopover,
} from '@folio/stripes/components';

import { Metadata } from '../../../../components';
import {
  requestPolicyTypes,
  REQUEST_POLICY_TYPES,
  REQUEST_TYPE_RULES,
} from '../../../../../constants';

export const getDataOptions = (servicePoints = []) => {
  return servicePoints.map(({
    name,
    id,
  }) => ({
    label: name,
    value: id,
  }));
};

export const validateServicePointsList = (servicePoints) => {
  let error;

  if (isEmpty(servicePoints)) {
    error = <FormattedMessage id="ui-circulation.settings.requestPolicy.errors.selectServicePoint" />;
  }

  return error;
};

export const getRequestPolicyLabel = (name) => (
  name === REQUEST_POLICY_TYPES.HOLD
    ? (
      <>
        {name}
        <InfoPopover
          content={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes.hold.infoPopover.content" />}
          iconSize="medium"
        />
      </>
    )
    : name
);

export const renderTypes = (props) => {
  const {
    handleChangeRequestTypesRules,
    requestTypesRules,
    servicePoints,
    isLoading,
  } = props;
  const dataOptions = getDataOptions(servicePoints);
  const onChangeRequestTypeRules = (name) => (e) => {
    handleChangeRequestTypesRules(e, name);
  };
  const items = requestPolicyTypes.map((name, index) => {
    const isAllowedSomeServicePoints = requestTypesRules[name] === REQUEST_TYPE_RULES.ALLOW_SOME;

    return (
      <Row key={`request-policy-type-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            type="checkbox"
            id={`${name.toLowerCase()}-checkbox`}
            label={getRequestPolicyLabel(name)}
            name={`requestTypes[${index}]`}
          />
        </Col>
        {props.fields.value[index] &&
        <>
          <Col xs={12}>
            <RadioButtonGroup>
              <Field
                type="radio"
                name={`requestTypesRules.${name}`}
                component={RadioButton}
                id={`${name}AllowAllRadioButton`}
                label={<FormattedMessage id="ui-circulation.settings.requestPolicy.requestTypes.allowAll" />}
                value={REQUEST_TYPE_RULES.ALLOW_ALL}
                onChange={onChangeRequestTypeRules(name)}
                disabled={isLoading}
              />
              <Field
                type="radio"
                name={`requestTypesRules.${name}`}
                component={RadioButton}
                id={`${name}AllowSomeRadioButton`}
                label={<FormattedMessage id="ui-circulation.settings.requestPolicy.requestTypes.allowSome" />}
                value={REQUEST_TYPE_RULES.ALLOW_SOME}
                onChange={onChangeRequestTypeRules(name)}
                disabled={isLoading}
              />
            </RadioButtonGroup>
          </Col>
          {
            isAllowedSomeServicePoints &&
              <Col xs={4}>
                <Field
                  component={MultiSelection}
                  name={`allowedServicePoints.${name}`}
                  id={`${name}MultiSelect`}
                  dataOptions={dataOptions}
                  validate={validateServicePointsList}
                  disabled={isLoading}
                />
              </Col>
          }
        </>
        }
      </Row>
    );
  });

  return (
    <>
      <p data-testid="policyTypes">
        <FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes" />
      </p>
      {items}
    </>
  );
};

class GeneralSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired,
    connect: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
    requestTypesRules: PropTypes.object.isRequired,
    handleChangeRequestTypesRules: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    servicePoints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  };

  render() {
    const {
      isOpen,
      metadata,
      connect,
      validateName,
      handleChangeRequestTypesRules,
      requestTypesRules,
      servicePoints,
      isLoading,
    } = this.props;

    return (
      <Accordion
        data-testid="generalRequestPolicyForm"
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
            data-testid="requestPolicyName"
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
          data-testid="requestPolicyDescription"
          id="request_policy_description"
          name="description"
          label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyDescription" />}
          component={TextArea}
        />
        <FieldArray
          name="requestTypes"
          component={renderTypes}
          handleChangeRequestTypesRules={handleChangeRequestTypesRules}
          requestTypesRules={requestTypesRules}
          servicePoints={servicePoints}
          isLoading={isLoading}
        />
      </Accordion>
    );
  }
}

export default GeneralSection;
