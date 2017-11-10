import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Icon from '@folio/stripes-components/lib/Icon';

const renderSchedules = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <Row>
      <Col xs={11}><h2 style={{ marginTop: '0' }}>Schedule</h2></Col>
      <Col xs={1}><Button type="button" onClick={() => fields.unshift({})}>+ New</Button></Col>
    </Row>
    {submitFailed && error && <Row><Col xs={12} className="error">{error}</Col></Row>}
    {fields.map((schedule, index, f) => (
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
          <Col xs={12} sm={1}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Button
                buttonStyle="transparent slim"
                style={{ position: 'absolute', bottom: '0' }}
                title="Remove"
                onClick={() => { f.remove(index); }}
              ><Icon icon="trashBin" />
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
      </div>
    ))}
  </div>
);

renderSchedules.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }),
};

/**
 * This component will be rendered inside a form in a component
 * that has passed through reduxForm(). As such, values for each field's
 * "name" key correspond to the properties of the object being rendered.
 */
const FixedDueDateScheduleForm = () => (
  <section>
    <h2 style={{ marginTop: '0' }}>About</h2>
    <Field label="Fixed due date schedule name" autoFocus name="name" component={TextField} required fullWidth rounded />
    <Field label="Description" name="description" component={TextArea} fullWidth rounded />
    <hr />
    <FieldArray name="schedules" component={renderSchedules} />
  </section>
);

export default FixedDueDateScheduleForm;
