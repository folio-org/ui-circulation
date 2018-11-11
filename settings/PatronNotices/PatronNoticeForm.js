import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  Col,
  Pane,
  Paneset,
  Row,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes-form';

class PatronNoticeForm extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  save(data) {
    this.props.onSave(data);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <form id="form-patron-notice" onSubmit={handleSubmit(this.save)}>
        <Paneset isRoot>
          <Pane defaultWidth="100%">
            <Row>
              <Col xs={8}>
                <Field label="name" name="name" id="input-patron-notice-name" component={TextField} />
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'patronNoticeForm',
  navigationCheck: true,
  enableReinitialize: false,
})(PatronNoticeForm);
