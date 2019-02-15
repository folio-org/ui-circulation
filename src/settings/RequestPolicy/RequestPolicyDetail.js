import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Col,
  Row,
  KeyValue,
  ExpandAllButton,
  List,
} from '@folio/stripes/components';

import { Metadata } from '../components';

class RequestPolicyDetail extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    initialValues: {},
  };

  state = {
    sections: {
      general: true,
    },
  };

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

  renderItem = (requestType) => {
    return (
      <li key={requestType}>{requestType}</li>
    );
  }

  render() {
    const {
      initialValues: policy = {},
      stripes,
    } = this.props;

    const {
      sections,
    } = this.state;

    const { requestTypes } = policy;

    return (
      <div data-test-request-policy-detail>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <Accordion
          open={sections.general}
          id="general"
          onToggle={this.handleSectionToggle}
          label={<FormattedMessage id="ui-circulation.settings.requestPolicy.generalInformation" />}
        >
          <Metadata
            connect={stripes.connect}
            metadata={policy.metadata}
          />

          <Row>
            <Col xs={12} data-request-policy-name>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyName" />}
                value={policy.name}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyDescription" />}
                value={get(policy, 'description', '-')}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.requestPolicy.policyTypes" />}
              >
                <div data-test-request-types-list>
                  <List
                    items={requestTypes}
                    itemFormatter={requestType => <li key={requestType}>{requestType}</li>}
                  />
                </div>
              </KeyValue>
            </Col>
          </Row>
        </Accordion>
      </div>
    );
  }
}

export default RequestPolicyDetail;
