import React from 'react';
import PropTypes from 'prop-types';

import {
  FormattedMessage,
  FormattedDate,
} from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import css from './SchedulesList.css';

const SchedulesList = ({ schedules }) => {
  return schedules.map((schedule, index) => {
    return (
      <Row
        className={css.scheduleItem}
        key={index}
      >
        <Col xs={12}>
          <Row className={css.scheduleHeader}>
            <Col xs={12}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateRange" />
              {' '}
              {index + 1}
            </Col>
          </Row>
          <Row className={css.scheduleItemContent}>
            <Col xs={12}>
              <Row>
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
              <Row>
                <Col xs={4}>
                  <FormattedDate value={schedule.from} timeZone="UTC" />
                </Col>
                <Col xs={4}>
                  <FormattedDate value={schedule.to} timeZone="UTC" />
                </Col>
                <Col xs={4}>
                  <FormattedDate value={schedule.due} timeZone="UTC" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });
};

SchedulesList.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SchedulesList;
