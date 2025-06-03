import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  get,
  find,
  isEmpty,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Col,
  NoValue,
  Row,
  ExpandAllButton,
} from '@folio/stripes/components';

import {
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components/ViewSections';

import { Metadata } from '../components';
import LoanPolicy from '../Models/LoanPolicy';
import { intervalPeriods } from '../../constants';

class LoanPolicyDetail extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    initialValues: PropTypes.shape({
      loanable: PropTypes.bool,
      metadata: PropTypes.shape({
        createdDate: PropTypes.string,
      }),
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
    }),
  };

  static defaultProps = {
    initialValues: {},
  };

  getValue = (pathToValue) => {
    const { initialValues: policy } = this.props;

    return get(policy, pathToValue);
  };

  getCheckboxValue = (pathToValue) => {
    const seletedValue = this.getValue(pathToValue);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.common.yes" />
      : <FormattedMessage id="ui-circulation.settings.common.no" />;
  };

  getTimePeriodValue = (pathToValue) => {
    const value = this.getValue(pathToValue);

    if (!value || !value.duration || !value.intervalId) {
      return <NoValue />;
    }

    return (
      <>
        {value.duration}
        {' '}
        <FormattedMessage id={`ui-circulation.settings.common.${value.intervalId.toLowerCase()}`} />
      </>);
  };

  getDropdownValue = (pathToId, items) => {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;

    const selectedId = this.getValue(pathToId);
    const item = find(items, ({ value }) => value === selectedId);

    return item ? formatMessage({ id: item.label }) : '-';
  };

  getPeriodValue = (pathToPeriod) => {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;

    const period = this.getValue(pathToPeriod);

    if (isEmpty(period)) {
      return '-';
    }

    const { label } = find(intervalPeriods, ({ value }) => value === period.intervalId);

    return `${period.duration} ${formatMessage({ id: label })}`;
  };

  getScheduleValue = (pathToSceduleId) => {
    const { parentResources } = this.props;

    const fixedDueDateSchedules = get(parentResources, 'fixedDueDateSchedules.records', []);
    const selectedSchedule = fixedDueDateSchedules.find(({ id }) => id === this.getValue(pathToSceduleId));

    return get(selectedSchedule, 'name', '-');
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
    } = this.props;

    const loanPolicy = new LoanPolicy(policy);

    return (
      <div data-test-loan-policy-detail>
        <AccordionStatus>
          <Row end="xs">
            <Col data-test-expand-all>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet>
            <Accordion
              id="generalLoanPolicyDetail"
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.generalInformation' })}
            >
              <Metadata
                connect={connect}
                metadata={policy.metadata}
              />
              <AboutSection getValue={this.getValue} />
              <LoansSection
                policy={loanPolicy}
                getDropdownValue={this.getDropdownValue}
                getPeriodValue={this.getPeriodValue}
                getScheduleValue={this.getScheduleValue}
                getCheckboxValue={this.getCheckboxValue}
                getTimePeriodValue={this.getTimePeriodValue}
                getValue={this.getValue}
              />
              <RenewalsSection
                isVisible={loanPolicy.loanable}
                policy={loanPolicy}
                getValue={this.getValue}
                getDropdownValue={this.getDropdownValue}
                getPeriodValue={this.getPeriodValue}
                getCheckboxValue={this.getCheckboxValue}
                getScheduleValue={this.getScheduleValue}
              />
              <RequestManagementSection
                isVisible={policy.loanable}
                getPeriodValue={this.getPeriodValue}
                getCheckboxValue={this.getCheckboxValue}
              />
            </Accordion>
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default injectIntl(LoanPolicyDetail);
