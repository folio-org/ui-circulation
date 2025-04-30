import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  get,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Col,
  Row,
  ExpandAllButton,
} from '@folio/stripes/components';

import {
  FinesSection,
  OverdueAboutSection,
  ReminderFeesSection,
} from './components/ViewSections';

import { Metadata } from '../components';
import FinePolicy from '../Models/FinePolicy';

class FinePolicyDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    stripes: stripesShape.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    parentResources: PropTypes.shape({
      noticeTemplates: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
      blockTemplates: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
    }).isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  getValue = (pathToValue) => {
    const { initialValues: policy } = this.props;

    return get(policy, pathToValue);
  };

  getCheckboxValue = (selectedValue) => {
    return selectedValue
      ? <FormattedMessage id="ui-circulation.settings.finePolicy.yes" />
      : <FormattedMessage id="ui-circulation.settings.finePolicy.no" />;
  };

  render() {
    const {
      initialValues: policy,
      stripes: {
        connect,
      },
      intl: {
        formatMessage,
      },
      parentResources: {
        noticeTemplates: { records: noticeTemplates },
        blockTemplates: { records: blockTemplates },
      }
    } = this.props;

    const finePolicy = new FinePolicy(policy);

    return (
      <div data-test-fine-policy-detail>
        <AccordionStatus>
          <Row end="xs">
            <Col data-test-expand-all>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet>
            <Accordion
              id="generalFeePolicy"
              label={formatMessage({ id: 'ui-circulation.settings.finePolicy.generalInformation' })}
            >
              <Metadata
                connect={connect}
                metadata={finePolicy.metadata}
              />
              <OverdueAboutSection getValue={this.getValue} />
            </Accordion>
            <FinesSection
              policy={finePolicy}
              getCheckboxValue={this.getCheckboxValue}
            />
            <ReminderFeesSection
              policy={finePolicy.reminderFeesPolicy}
              getCheckboxValue={this.getCheckboxValue}
              noticeTemplates={noticeTemplates}
              blockTemplates={blockTemplates}
            />
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default injectIntl(FinePolicyDetail);
