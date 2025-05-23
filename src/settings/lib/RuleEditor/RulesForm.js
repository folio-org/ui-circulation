import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl } from 'react-intl';

import {
  IfPermission,
  stripesShape,
  stripesConnect,
} from '@folio/stripes/core';
import {
  Row,
  Col,
  Button,
  TextField
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import { Metadata } from '../../components';

import RulesField from './RulesField';

import styles from './RulesEditor.css';

class RulesForm extends React.Component {
  static propTypes = {
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    editorProps: PropTypes.shape({
      showAssist: PropTypes.bool,
      typeMapping: PropTypes.shape({
        a: PropTypes.string,
        b: PropTypes.string,
        c: PropTypes.string,
        g: PropTypes.string,
        m: PropTypes.string,
        s: PropTypes.string,
        t: PropTypes.string,
      }),
    }),
    stripes: stripesShape.isRequired,
    metadata: PropTypes.shape({
      createdByUserId: PropTypes.string.isRequired,
      createdByUsername: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      updatedByUserId: PropTypes.string,
      updatedByUsername: PropTypes.string,
      updatedDate: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { ruleFilter: '' };
  }

  filterRules = (e) => {
    this.setState({ ruleFilter: e.target.value });
  };

  render() {
    const {
      pristine,
      handleSubmit,
      submitting,
      editorProps,
      intl: {
        formatMessage,
      },
      stripes: {
        connect,
      },
      metadata,
    } = this.props;

    const { ruleFilter } = this.state;

    return (
      <form
        id="form-loan-rules"
        data-test-circulation-rules-form
        data-testid="formLoanRules"
        className={styles.circulationRulesForm}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col xs={6}>
            <Metadata
              connect={connect}
              metadata={metadata}
              useAccordion={false}
              noBackGround
              inlineLayout={false}
            />
          </Col>
          <Col xs={3}>
            <TextField
              data-test-rules-filter
              aria-label={formatMessage({ id: 'ui-circulation.settings.checkout.filterRules' })}
              value={ruleFilter}
              validationEnabled={false}
              placeholder={formatMessage({ id: 'ui-circulation.settings.checkout.filterRules' })}
              onChange={this.filterRules}
            />
          </Col>
          <IfPermission perm="ui-circulation.settings.edit-circulation-rules">
            <Col xs={3}>
              <Button
                fullWidth
                id="clickable-save-loan-rules"
                type="submit"
                disabled={pristine || submitting}
              >
                {formatMessage({ id: 'ui-circulation.settings.checkout.save' })}
              </Button>
            </Col>
          </IfPermission>
        </Row>
        <Row className={styles.circulationRulesFormBody}>
          <Col>
            <Field
              component={RulesField}
              name="rules"
              {...editorProps}
              filter={ruleFilter}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

export default stripesFinalForm({ navigationCheck: true })(stripesConnect(injectIntl(RulesForm)));
