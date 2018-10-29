import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';


import Button from '@folio/stripes-components/lib/Button';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import stripesForm from '@folio/stripes-form';

class PatronNoticesConfigForm extends React.Component {
  getLastMenu() {
    const { pristine, submitting } = this.props;
    return (
      <Button type="submit" disabled={(pristine || submitting)} id="clickable-save-patron-notices-config">
        Save
      </Button>
    );
  }
  render() {
    const { handleSubmit, stripes } = this.props;
    return (
      <form id="checkout-form" onSubmit={handleSubmit}>
        <Pane defaultWidth="fill" fluidContentWidth paneTitle="Patron notices | Configuration" lastMenu={this.getLastMenu()}>
          <h3>Formats</h3>
          <Row>
            <Col xs={12}>
              <Field
                component={Checkbox}
                name="format-email"
                label="Email"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={Checkbox}
                name="format-sms"
                label="SMS (Text)"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={Checkbox}
                name="format-print"
                label="Print"
              />
            </Col>
          </Row>
        </Pane>
      </form>
    );
  }
}


export default stripesForm({
  form: 'patronNoticesConfigForm',
  navigationCheck: true,
  enableReinitialize: true,
})(PatronNoticesConfigForm);
