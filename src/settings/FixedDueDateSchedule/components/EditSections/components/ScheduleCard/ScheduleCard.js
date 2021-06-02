import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Datepicker,
  IconButton,
  Row,
} from '@folio/stripes/components';

import css from './ScheduleCard.css';

class ScheduleCard extends React.Component {
  static propTypes = {
    pathToSchedule: PropTypes.string.isRequired,
    scheduleIndex: PropTypes.number.isRequired,
    onRemoveSchedule: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
  };

  onRemove = () => {
    const {
      scheduleIndex,
      onRemoveSchedule,
    } = this.props;

    onRemoveSchedule(scheduleIndex);
  };

  parseDateForStartOfDay = (date) => (date ? moment.tz(date, this.props.timezone).format() : date);

  parseDateForEndOfDay = (date) => (date ? moment.tz(date, this.props.timezone).endOf('day').format() : date);

  render() {
    const {
      pathToSchedule,
      scheduleIndex,
    } = this.props;

    return (
      <Row
        className={css.scheduleItem}
        data-test-schedule
      >
        <Col xs={12}>
          <Row
            className={css.scheduleHeader}
            data-test-schedule-date-range
          >
            <Col xs={11}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateRange" />
              {' '}
              {scheduleIndex + 1}
            </Col>
            <Col
              className={css.headerIcon}
              data-test-schedule-remove
              xs={1}
            >
              <FormattedMessage id="ui-circulation.settings.fDDSform.remove">
                {ariaLabel => (
                  <IconButton
                    ariaLabel={ariaLabel}
                    icon="trash"
                    onClick={this.onRemove}
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
          <Row className={css.scheduleItemContent}>
            <Col xs={12}>
              <Row>
                <Col
                  data-test-schedule-date-from
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat="YYYY/MM/DD"
                    component={Datepicker}
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dateFrom" />}
                    name={`${pathToSchedule}.from`}
                    required
                    parse={this.parseDateForStartOfDay}
                  />
                </Col>
                <Col
                  data-test-schedule-date-to
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat="YYYY/MM/DD"
                    component={Datepicker}
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dateTo" />}
                    name={`${pathToSchedule}.to`}
                    required
                    parse={this.parseDateForEndOfDay}
                  />
                </Col>
                <Col
                  data-test-schedule-due-date
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat="YYYY/MM/DD"
                    component={Datepicker}
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dueDate" />}
                    name={`${pathToSchedule}.due`}
                    required
                    parse={this.parseDateForEndOfDay}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ScheduleCard;
