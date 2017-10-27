import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';

/**
 * This component will be rendered inside a form in a component
 * that has passed through reduxForm(). As such, values for each field's
 * "name" key correspond to the properties of the object being rendered.
 */
function FixedDueDateScheduleForm() {
  const renderSchedules = ({ fields }) => (
    <div>
      <Row>
        <Col xs={11}><h2 style={{ marginTop: '0' }}>Schedules</h2></Col>
        <Col xs={1}><Button type="button" onClick={() => fields.push()}>+ New</Button></Col>
      </Row>
      {fields.map((schedule, index) => (
        <div key={index}>
          <Row>
            <Col xs={12} sm={4}>
              <Field
                label="Date from"
                name={`${schedule}.from`}
                component={Datepicker}
              />
            </Col>
            <Col xs={12} sm={4}>
              <Field
                label="Date to"
                name={`${schedule}.to`}
                component={Datepicker}
              />
            </Col>
            <Col xs={12} sm={3}>
              <Field
                label="Due date"
                name={`${schedule}.due`}
                component={Datepicker}
              />
            </Col>
            <Col xs={12} sm={1}><Button type="button" title="X" onClick={() => fields.remove(index)}>X</Button></Col>
          </Row>
          <hr />
        </div>
      ))}
    </div>
  );

  renderSchedules.propTypes = {
    fields: PropTypes.object,
  };

  return (
    <section>
      <h2 style={{ marginTop: '0' }}>About</h2>
      <Field label="Fixed due date schedule name" autoFocus name="name" component={TextField} required fullWidth rounded />
      <Field label="Description" name="description" component={TextArea} fullWidth rounded />
      <hr />
      <FieldArray name="schedules" component={renderSchedules} />
    </section>
  );
}

export default FixedDueDateScheduleForm;
