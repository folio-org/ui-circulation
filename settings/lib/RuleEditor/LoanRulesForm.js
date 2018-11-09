import React from 'react';
import {
  Row,
  Col,
  Button,
  TextField
} from '@folio/stripes/components';
import { Field } from 'redux-form';

import {
  FormattedMessage,
  intlShape,
  injectIntl,
} from 'react-intl';

import stripesForm from '@folio/stripes/form';

import LoanRulesField from './LoanRulesField';

class LoanRulesForm extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
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
      intl: { formatMessage },
    } = this.props;

    const containerStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <form id="form-loan-rules" style={containerStyle} onSubmit={handleSubmit}>
        <Row end="xs">
          <Col xs={3}>
            <TextField
              value={this.state.ruleFilter}
              onChange={this.filterRules}
              validationEnabled={false}
              placeholder={formatMessage({ id: 'ui-circulation.settings.checkout.filterRules' })}
            />
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
            <Field component={LoanRulesField} name="loanRulesCode" {...editorProps} filter={this.state.ruleFilter} />
          </Col>
        </Row>
      </form>
    );
  }
}

export default stripesForm({
  form: 'loanRulesForm',
  navigationCheck: true,
  enableReinitialize: true,
})(injectIntl(LoanRulesForm));
