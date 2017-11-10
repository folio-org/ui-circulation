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
      <Col xs={4}><FormattedDate value={schedule.from} /></Col>
      <Col xs={4}><FormattedDate value={schedule.to} /></Col>
      <Col xs={4}><FormattedDate value={schedule.due} /></Col>
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
        <hr />
        <Row>
          <Col xs={12}><h2 style={{ marginTop: '0' }}>Schedule</h2></Col>
        </Row>
        <Row>
          <Col xs={4}><h4>Date from</h4></Col>
          <Col xs={4}><h4>Date to</h4></Col>
          <Col xs={4}><h4>Due date</h4></Col>
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
