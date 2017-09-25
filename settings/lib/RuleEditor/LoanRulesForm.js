import React from 'react';
import {
  Row,
  Col,
  Button,
  TextField,
  Icon,
} from '@folio/stripes-components';
import {Field, Form, reduxForm} from 'redux-form';
import LoanRulesField from './LoanRulesField';

class LoanRulesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      ruleFilter: ''
    }

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
      flexDirection:'column',
    }

    const editorWrapStyle = {
      position: 'relative',
      flexGrow: 2,
    }

    return (
      <form id="form-loan-rules" style={containerStyle} onSubmit={handleSubmit}>
          <Row end='xs'>
            <Col xs={3}>
              <Field name="ruleFilter" component={TextField} rounded value={this.state.ruleFilter} onChange={this.filterRules} validationEnabled={false} placeholder="filter rules" />
            </Col>
            <Col xs={3}>
              <Button fullWidth id="clickable-save-loan-rules" type="submit" disabled={pristine || submitting }>Save</Button>
            </Col>
          </Row>
          <div style={editorWrapStyle}>
            <Field component={LoanRulesField} name="loanRulesCode" {...editorProps} filter={this.state.ruleFilter}/>
          </div>
      </form>
    )
  }
}

export default reduxForm(
  {
    form: 'loanRulesForm',
    enableReinitialize: true,
  }
)(LoanRulesForm);
