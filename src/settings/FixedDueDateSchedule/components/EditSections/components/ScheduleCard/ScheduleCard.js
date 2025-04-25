import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Col,
  Datepicker,
  IconButton,
  Row,
  dayjs,
} from '@folio/stripes/components';

import { DATE_FORMAT } from '../../../../../../constants';
import css from './ScheduleCard.css';

export const parseDate = (date, timezone, isEndOfDay) => {
  if (!date) {
    return date;
  }

  let dayjsDate = dayjs.tz(date, timezone);

  if (isEndOfDay) {
    dayjsDate = dayjsDate.endOf('day');
  }

  return dayjsDate.format();
};

class ScheduleCard extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
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

  parseDateForStartOfDay = (date) => parseDate(date, this.props.timezone);

  parseDateForEndOfDay = (date) => parseDate(date, this.props.timezone, true);

  render() {
    const {
      pathToSchedule,
      scheduleIndex,
      intl: {
        formatMessage,
      },
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
            <Col
              data-testid="dateFormTitleColumn"
              xs={11}
            >
              <FormattedMessage
                id="ui-circulation.settings.fDDSform.dateFormTitle"
                values={{ number: scheduleIndex + 1 }}
              />
            </Col>
            <Col
              data-testid="removeColumn"
              className={css.headerIcon}
              data-test-schedule-remove
              xs={1}
            >
              <IconButton
                ariaLabel={formatMessage({ id: 'ui-circulation.settings.fDDSform.remove' })}
                icon="trash"
                onClick={this.onRemove}
              />
            </Col>
          </Row>
          <Row className={css.scheduleItemContent}>
            <Col xs={12}>
              <Row>
                <Col
                  data-testid="dateFromColumn"
                  data-test-schedule-date-from
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat={DATE_FORMAT}
                    component={Datepicker}
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dateFrom' })}
                    name={`${pathToSchedule}.from`}
                    required
                    parse={this.parseDateForStartOfDay}
                  />
                </Col>
                <Col
                  data-testid="dateToColumn"
                  data-test-schedule-date-to
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat={DATE_FORMAT}
                    component={Datepicker}
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dateTo' })}
                    name={`${pathToSchedule}.to`}
                    required
                    parse={this.parseDateForEndOfDay}
                  />
                </Col>
                <Col
                  data-testid="dueDateColumn"
                  data-test-schedule-due-date
                  xs={12}
                  sm={4}
                >
                  <Field
                    dateFormat={DATE_FORMAT}
                    component={Datepicker}
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dueDate' })}
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

export default injectIntl(ScheduleCard);
