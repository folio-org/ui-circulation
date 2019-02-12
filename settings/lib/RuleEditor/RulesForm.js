import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  TextField
} from '@folio/stripes/components';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import stripesForm from '@folio/stripes/form';

import RulesField from './RulesField';

class RulesForm extends React.Component {
  static propTypes = {
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    editorProps: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      ruleFilter: ''
    };

    this.filterRules = this.filterRules.bind(this);
  }

  filterRules(e) {
    this.setState({
      ruleFilter: e.target.value,
    });
  }

  render() {
    const {
      pristine,
      handleSubmit,
      submitting,
      editorProps,
    } = this.props;

    const containerStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <form id="form-loan-rules" data-test-circulation-rules-form style={containerStyle} onSubmit={handleSubmit}>
        <Row end="xs">
          <Col xs={3}>
            <FormattedMessage id="ui-circulation.settings.checkout.filterRules">
              {placeholder => (
                <TextField
                  value={this.state.ruleFilter}
                  onChange={this.filterRules}
                  validationEnabled={false}
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>
          </Col>
          <Col xs={3}>
            <Button
              fullWidth
              id="clickable-save-loan-rules"
              type="submit"
              disabled={pristine || submitting}
            >
              <FormattedMessage id="ui-circulation.settings.checkout.save" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Field component={RulesField} name="rules" {...editorProps} filter={this.state.ruleFilter} />
          </Col>
        </Row>
      </form>
    );
  }
}

export default stripesForm({
  form: 'rulesForm',
  navigationCheck: true,
  enableReinitialize: true,
})(RulesForm);
