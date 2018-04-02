import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Icon from '@folio/stripes-components/lib/Icon';

/**
 * This component will be rendered inside a form in a component
 * that has passed through reduxForm(). As such, values for each field's
 * "name" key correspond to the properties of the object being rendered.
 */
class FixedDueDateScheduleForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderSchedules = this.renderSchedules.bind(this);
  }

  renderSchedules({ fields, meta: { error, submitFailed } }) {
    return (
      <div>
        <Row>
          <Col xs={11}>
            <h2 style={{ marginTop: '0' }}>
              {this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.schedule' })}
            </h2>
          </Col>
          <Col xs={1}>
            <Button type="button" onClick={() => fields.unshift({})}>
              {this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.new' })}
            </Button>
          </Col>
        </Row>
        {submitFailed && error && <Row><Col xs={12} className="error">{error}</Col></Row>}
        {fields.map((schedule, index, f) => (
          <div key={index}>
            <Row>
              <Col xs={12} sm={4}>
                <Field
                  label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dateFrom' })}
                  name={`${schedule}.from`}
                  component={Datepicker}
                />
              </Col>
              <Col xs={12} sm={4}>
                <Field
                  label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dateTo' })}
                  name={`${schedule}.to`}
                  component={Datepicker}
                />
              </Col>
              <Col xs={12} sm={3}>
                <Field
                  label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dueDate' })}
                  name={`${schedule}.due`}
                  component={Datepicker}
                />
              </Col>
              <Col xs={12} sm={1}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Button
                    buttonStyle="transparent slim"
                    style={{ position: 'absolute', bottom: '0' }}
                    title={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.remove' })}
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
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <section>
        <h2 style={{ marginTop: '0' }}>
          <FormattedMessage id="ui-circulation.settings.fDDSform.about" />
        </h2>
        <Field
          name="name"
          component={TextField}
          autoFocus
          required
          fullWidth
          rounded
          label={formatMsg({ id: 'ui-circulation.settings.fDDSform.name' })}
        />
        <Field
          name="description"
          component={TextArea}
          fullWidth
          rounded
          label={formatMsg({ id: 'ui-circulation.settings.fDDSform.description' })}
        />
        <hr />
        <FieldArray name="schedules" component={this.renderSchedules} />
      </section>
    );
  }
}

export default FixedDueDateScheduleForm;
