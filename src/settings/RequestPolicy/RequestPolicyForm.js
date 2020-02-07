import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  ExpandAllButton,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';

import asyncValidate from '../Validation/request-policy/unique-name';
import RequestPolicy from '../Models/RequestPolicy';
import { GeneralSection } from './components';
import { requestPolicyTypes } from '../../constants';
import {
  CancelButton,
  FooterPane,
} from '../components';

class RequestPolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    policy: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
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

  saveForm = (data) => {
    const requestTypes = data.requestTypes.reduce((acc, type, index) => {
      if (type) acc.push(requestPolicyTypes[index]);
      return acc;
    }, []);

    this.props.onSave({ ...data, requestTypes });
  };

  render() {
    const {
      pristine,
      policy,
      stripes,
      submitting,
      handleSubmit,
      onCancel,
    } = this.props;

    const { sections } = this.state;

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
        data-test-request-policy-form
        onSubmit={handleSubmit(this.saveForm)}
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
                onToggle={this.handleSectionToggle}
              />
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new RequestPolicy(getFormValues('requestPolicyForm')(state)),
});

const connectedRequestPolicyForm = connect(mapStateToProps)(RequestPolicyForm);

export default stripesForm({
  form: 'requestPolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
  asyncValidate,
  asyncBlurFields: ['name'],
})(connectedRequestPolicyForm);
