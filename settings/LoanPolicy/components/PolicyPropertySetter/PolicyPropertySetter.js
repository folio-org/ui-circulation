import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  get,
  isEmpty,
  isNumber,
} from 'lodash';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import generalStyles from './PolicyPropertySetter.css';

class PolicyPropertySetter extends React.Component {
  static propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    selectPlaceholder: PropTypes.string.isRequired,
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.node),
    changeFormValue: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  onInputBlur = () => {
    const {
      inputValuePath,
      selectValuePath,
      entity,
      changeFormValue,
    } = this.props;

    const inputValue = get(entity, inputValuePath);

    if (isNumber(inputValue)) {
      return;
    }

    changeFormValue(selectValuePath, '');
  };

  onInputClear = () => {
    const {
      inputValuePath,
      changeFormValue,
    } = this.props;

    changeFormValue(inputValuePath, '');
  };

  onSelectChange = () => {
    this.inputRef.current.focus();
  };

  transformInputValue = (value) => {
    if (isEmpty(value)) {
      return '';
    }

    const numberValue = Number(value);

    return numberValue >= 0 ? numberValue : 0;
  };

  render() {
    const {
      fieldLabel,
      selectPlaceholder,
      inputValuePath,
      selectValuePath,
      entity,
      intervalPeriods,
    } = this.props;

    const isInputReadOnly = !get(entity, selectValuePath);

    return (
      <React.Fragment>
        <Row className={generalStyles.label}>
          <Col xs={12}>
            <FormattedMessage id={fieldLabel} />
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Field
              type="number"
              readOnly={isInputReadOnly}
              name={inputValuePath}
              component={TextField}
              withRef
              inputRef={this.inputRef}
              onBlur={this.onInputBlur}
              onClearField={this.onInputClear}
              parse={this.transformInputValue}
            />
          </Col>
          <Col xs={2}>
            <FormattedMessage id={selectPlaceholder}>
              {placeholder => (
                <Field
                  name={selectValuePath}
                  component={Select}
                  placeholder={placeholder}
                  onChange={this.onSelectChange}
                >
                  {intervalPeriods}
                </Field>
              )}
            </FormattedMessage>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PolicyPropertySetter;
