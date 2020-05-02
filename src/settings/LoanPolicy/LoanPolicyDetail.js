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
  Col,
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
    intl: PropTypes.object,
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }),
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalInformation: true,
        recalls: true,
        holds: true,
      },
    };
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
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
      initialValues: policy = {},
      stripes: {
        connect,
      }
    } = this.props;

    const { sections } = this.state;

    const loanPolicy = new LoanPolicy(policy);

    return (
      <div data-test-loan-policy-detail>
        <Row end="xs">
          <Col data-test-expand-all>
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <Accordion
          id="generalInformation"
          label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
          open={sections.generalInformation}
          onToggle={this.handleSectionToggle}
        >
          <Metadata
            connect={connect}
            metadata={policy.metadata}
          />
          <AboutSection getValue={this.getValue} />
          <LoansSection
            isVisible={loanPolicy.loanable}
            policy={loanPolicy}
            getDropdownValue={this.getDropdownValue}
            getPeriodValue={this.getPeriodValue}
            getScheduleValue={this.getScheduleValue}
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
            isRecallsOpen={sections.recalls}
            isHoldsOpen={sections.holds}
            getPeriodValue={this.getPeriodValue}
            getCheckboxValue={this.getCheckboxValue}
            onSectionToggle={this.handleSectionToggle}
          />
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(LoanPolicyDetail);
