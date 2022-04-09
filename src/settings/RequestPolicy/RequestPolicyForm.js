import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  find,
  memoize,
} from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  AccordionSet,
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
    intl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalRequestPolicyForm: true,
      },
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
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
        },
      });
  };

  validate = memoize(async (name) => {
    const {
      initialValues,
      intl: {
        formatMessage,
      },
    } = this.props;

    let error;
    if (name) {
      try {
        const response = await this.getPoliciesByName(name);
        const { requestPolicies = [] } = await response.json();
        const matchedPolicy = find(requestPolicies, ['name', name]);
        if (matchedPolicy && matchedPolicy.id !== initialValues.id) {
          error = formatMessage({ id: 'ui-circulation.settings.requestPolicy.errors.nameExists' });
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
      intl: {
        formatMessage,
      },
    } = this.props;

    const { sections } = this.state;

    const { values = {} } = getState();
    const policy = new RequestPolicy(values);

    const panelTitle = policy.id
      ? policy.name
      : formatMessage({ id: 'ui-circulation.settings.requestPolicy.createEntryLabel' });

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-testid="form"
        noValidate
        className={css.requestPolicyForm}
        data-test-request-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            id="request-policy-pane"
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
              <AccordionSet
                accordionStatus={sections}
                onToggle={this.handleSectionToggle}
              >
                <GeneralSection
                  id="generalRequestPolicyForm"
                  isOpen={sections.generalRequestPolicyForm}
                  metadata={policy.metadata}
                  connect={stripes.connect}
                  validateName={this.validate}
                />
              </AccordionSet>
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: validateRequestPolicy,
})(injectIntl(RequestPolicyForm));
