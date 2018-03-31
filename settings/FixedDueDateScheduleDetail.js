import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';

function FixedDueDateScheduleDetail(props) {
  const fixedDueDateSchedule = props.initialValues;
  const formatDate = props.stripes.formatDate;
  const formatMsg = props.stripes.intl.formatMessage;

  const renderSchedules = fixedDueDateSchedule.schedules.map((schedule, index) => (
    <Row key={index}>
      <Col xs={4}>{formatDate(schedule.from)}</Col>
      <Col xs={4}>{formatDate(schedule.to)}</Col>
      <Col xs={4}>{formatDate(schedule.due)}</Col>
    </Row>
  ));

  return (
    <div>
      <section>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>
              <FormattedMessage id="" />
              {formatMsg({ id: 'ui-circulation.settings.fDDSform.name' })}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.fDDSform.name' })}
              value={_.get(fixedDueDateSchedule, ['name'], 'Untitled Fixed Due Date Schedule')}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.fDDSform.description' })}
              value={_.get(fixedDueDateSchedule, ['description'], '')}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>
              <FormattedMessage id="ui-circulation.settings.fDDSform.schedule" />
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <h4>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateFrom" />
            </h4>
          </Col>
          <Col xs={4}>
            <h4>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateTo" />
            </h4>
          </Col>
          <Col xs={4}>
            <h4>
              <FormattedMessage id="ui-circulation.settings.fDDSform.dueDate" />
            </h4>
          </Col>
        </Row>
        {renderSchedules}
      </section>
    </div>
  );
}

FixedDueDateScheduleDetail.propTypes = {
  initialValues: PropTypes.object,
  stripes: stripesShape.isRequired,
};

export default FixedDueDateScheduleDetail;
