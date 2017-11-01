import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedDate } from 'react-intl';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

function FixedDueDateScheduleDetail(props) {
  const fixedDueDateSchedule = props.initialValues;
  const renderSchedules = fixedDueDateSchedule.schedules.map((schedule, index) => (
    <Row key={index}>
      <Col xs={12} sm={4}>
        <KeyValue label="Date From" value={<FormattedDate value={schedule.from} />} />
      </Col>
      <Col xs={12} sm={4}>
        <KeyValue label="Date To" value={<FormattedDate value={schedule.to} />} />
      </Col>
      <Col xs={12} sm={4}>
        <KeyValue label="Due Date" value={<FormattedDate value={schedule.due} />} />
      </Col>
    </Row>
  ));

  return (
    <div>
      <section>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>About</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label="Fixed due date schedule name" value={_.get(fixedDueDateSchedule, ['name'], 'Untitled Fixed Due Date Schedule')} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label="Description" value={_.get(fixedDueDateSchedule, ['description'], '')} />
          </Col>
        </Row>
        {renderSchedules}
      </section>
    </div>
  );
}

FixedDueDateScheduleDetail.propTypes = {
  initialValues: PropTypes.object,
};

export default FixedDueDateScheduleDetail;
