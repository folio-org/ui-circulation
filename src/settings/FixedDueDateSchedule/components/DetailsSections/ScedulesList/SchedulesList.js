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

const SchedulesList = ({ schedules, timezone }) => {
  return schedules.map((schedule, index) => {
    return (
      <Row
        className={css.scheduleItem}
        key={index}
        data-testid={`ui-circulation.settings.fDDSform-${index + 1}`}
      >
        <Col xs={12}>
          <Row className={css.scheduleHeader}>
            <Col xs={12}>
              <FormattedMessage
                id="ui-circulation.settings.fDDSform.dateFormTitle"
                values={{ number: index + 1 }}
              />
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
                  <FormattedDate value={schedule.from} timeZone={timezone} />
                </Col>
                <Col xs={4}>
                  <FormattedDate value={schedule.to} timeZone={timezone} />
                </Col>
                <Col xs={4}>
                  <FormattedDate value={schedule.due} timeZone={timezone} />
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
  timezone: PropTypes.string.isRequired,
};

export default SchedulesList;
