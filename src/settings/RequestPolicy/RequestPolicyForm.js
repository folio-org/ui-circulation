import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  find,
  memoize,
} from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  Col,
  ExpandAllButton,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';

import RequestPolicy from '../Models/RequestPolicy';
import { RequestPolicy as validateRequestPolicy } from '../Validation';
import { GeneralSection } from './components';
import {
  CancelButton,
  FooterPane,
} from '../components';

import css from './RequestPolicyForm.css';

class RequestPolicyForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    okapi: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    stripes: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        general: true,
      },
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  getPoliciesByName = (name) => {
    const { okapi } = this.props;

    return fetch(`${okapi.url}/request-policy-storage/request-policies?query=(name=="${name}")`,
      {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
          'Content-Type': 'application/json',
        }
      });
  };

  validate = memoize(async (name) => {
    const { form: { getFieldState } } = this.props;

    let error;
    const field = getFieldState('name');

    if (name && field.dirty) {
      try {
        const response = await this.getPoliciesByName(name);
        const { requestPolicies = [] } = await response.json();
        const matchedPolicy = find(requestPolicies, ['name', name]);
        if (matchedPolicy && matchedPolicy.id !== this.props.initialValues.id) {
          error = <FormattedMessage id="ui-circulation.settings.requestPolicy.errors.nameExists" />;
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    return error;
  });

  render() {
    const {
      form: { getState },
      pristine,
      stripes,
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { sections } = this.state;

    const { values = {} } = getState();
    const policy = new RequestPolicy(values);

    const panelTitle = policy.id
      ? policy.name
      : <FormattedMessage id="ui-circulation.settings.requestPolicy.createEntryLabel" />;

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        noValidate
        className={css.requestPolicyForm}
        data-test-request-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <GeneralSection
                isOpen={sections.general}
                metadata={policy.metadata}
                connect={stripes.connect}
                validateName={this.validate}
                onToggle={this.handleSectionToggle}
              />
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validateOnBlur: true,
  validate: validateRequestPolicy,
})(RequestPolicyForm);
