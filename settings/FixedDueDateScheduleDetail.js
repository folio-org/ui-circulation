import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Accordion, Col, ExpandAllButton, KeyValue, Row } from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';
import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    intl: intlShape.isRequired,
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.cViewMetaData = props.stripes.connect(ViewMetaData);
    this.state = {
      sections: {
        generalInformation: true,
        fixedDueDateSchedule: true,
      },
    };
  }

  handleExpandAll(sections) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render() {
    const {
      intl: { formatDate, formatMessage },
      initialValues: fixedDueDateSchedule,
    } = this.props;

    const { sections } = this.state;
    const renderSchedules = fixedDueDateSchedule.schedules.map((schedule, index) => (
      <div key={index} className={css.scheduleItem}>
        <div className={css.scheduleHeader}>
          <h4>
            <FormattedMessage id="ui-circulation.settings.fDDSform.dateRange" />
            {' '}
            { index + 1 }
          </h4>
        </div>
        <div className={css.scheduleItemContent}>
          <Row key={index + 1}>
            <Col xs={4}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateFrom" />
            </Col>
            <Col xs={4}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateTo" />
            </Col>
            <Col xs={4}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dueDate" />
            </Col>
          </Row>
          <Row key={index + 2}>
            <Col xs={4}>{formatDate(schedule.from)}</Col>
            <Col xs={4}>{formatDate(schedule.to)}</Col>
            <Col xs={4}>{formatDate(schedule.due)}</Col>
          </Row>
        </div>
      </div>
    ));
    return (
      <div>

        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <Accordion
          open={sections.generalInformation}
          id="generalInformation"
          onToggle={this.handleSectionToggle}
          label="General information"
        >
          <section className={css.accordionSection}>
            { (fixedDueDateSchedule.metadata && fixedDueDateSchedule.metadata.createdDate) &&
              <this.cViewMetaData metadata={fixedDueDateSchedule.metadata} />
            }
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.fDDSform.name' })}
                  value={_.get(fixedDueDateSchedule, ['name'], formatMessage({ id: 'ui-circulation.settings.fDDSform.untitled' }))}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.fDDSform.description' })}
                  value={_.get(fixedDueDateSchedule, ['description'], '')}
                />
              </Col>
            </Row>
          </section>
        </Accordion>
        <Accordion
          open={sections.fixedDueDateSchedule}
          id="fixedDueDateSchedule"
          onToggle={this.handleSectionToggle}
          label="Schedule"
        >
          <section className={css.accordionSection}>
            {renderSchedules}
          </section>
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(FixedDueDateScheduleDetail);
