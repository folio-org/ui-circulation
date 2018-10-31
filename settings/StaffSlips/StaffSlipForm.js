import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {
  Button,
  Checkbox,
  Col,
  Icon,
  IconButton,
  KeyValue,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  TextArea
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { Field } from 'redux-form';

import StaffSlipEditor from './StaffSlipEditor';
import formats from './formats';

class StaffSlipForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(data) {
    this.props.onSave(data);
  }

  translate(id) {
    return this.props.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  addFirstMenu() {
    return (
      <PaneMenu>
        <IconButton
          id="clickable-close-staff-slip"
          onClick={this.props.onCancel}
          icon="closeX"
          title="close"
          aria-label={this.translate('closeStaffSlipDialog')}
        />
      </PaneMenu>
    );
  }

  saveLastMenu() {
    const { pristine, submitting, initialValues } = this.props;
    const edit = initialValues && initialValues.id;
    const saveLabel = edit ? this.translate('saveAndClose') : this.translate('createStaffSlip');

    return (
      <PaneMenu>
        <Button
          id="clickable-save-staff-slip"
          type="submit"
          title={this.translate('saveAndClose')}
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
          disabled={(pristine || submitting)}
        >
          {saveLabel}
        </Button>
      </PaneMenu>
    );
  }

  renderPaneTitle() {
    const { initialValues } = this.props;
    const staffSlip = initialValues || {};

    if (staffSlip.id) {
      return (
        <div>
          <Icon size="small" icon="edit" />
          <span>{`${this.translate('edit')}: ${this.translate('label')} - ${staffSlip.name}`}</span>
        </div>
      );
    }

    return this.translate('new');
  }

  render() {
    const { stripes, handleSubmit, initialValues } = this.props;
    const disabled = !stripes.hasPerm('settings.organization.enabled');
    const slipType = (initialValues || {}).name || 'Hold';

    return (
      <form id="form-staff-slip" onSubmit={handleSubmit(this.save)}>
        <Paneset isRoot>
          <Pane defaultWidth="100%" firstMenu={this.addFirstMenu()} lastMenu={this.saveLastMenu()} paneTitle={this.renderPaneTitle()}>
            <Row>
              <Col xs={8}>
                <KeyValue label={this.translate('name')} value={(initialValues || {}).name} />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field label={`${this.translate('active')}`} name="active" id="input-staff-slip-active" component={Checkbox} disabled={disabled} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={8}>
                <Field label={this.translate('description')} name="description" id="input-staff-slip-description" component={TextArea} fullWidth disabled={disabled} />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  label={this.translate('display')}
                  component={StaffSlipEditor}
                  tokens={Object.keys(formats[slipType])}
                  name="template"
                  slipType={slipType}
                />
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'staffSlipForm',
  navigationCheck: true,
  enableReinitialize: false,
})(injectIntl(StaffSlipForm));
