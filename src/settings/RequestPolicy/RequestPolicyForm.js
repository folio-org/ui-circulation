import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { memoize } from 'lodash';

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

import {
  getHeaderWithCredentials,
} from '../utils/headers';
import {
  isEditLayer,
  validateUniqueNameById,
} from '../utils/utils';

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
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
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
        ...getHeaderWithCredentials(okapi)
      });
  };

  validateName = memoize((name) => (
    validateUniqueNameById({
      currentName: name,
      previousId: this.props.initialValues.id,
      getByName: this.getPoliciesByName,
      selector: 'requestPolicies',
      errorKey: 'settings.requestPolicy.errors.nameExists',
    })
  ));

  render() {
    const {
      form: { getState },
      pristine,
      stripes,
      submitting,
      handleSubmit,
      initialValues: {
        id,
      },
      location: {
        search,
      },
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

    if (isEditLayer(search) && !id) {
      return null;
    }

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
                  validateName={this.validateName}
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
