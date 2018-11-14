import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
  };

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(data) {
    this.props.onSave(data);
  }

  addFirstMenu() {
    return (
      <PaneMenu>
        <IconButton
          id="clickable-close-staff-slip"
          onClick={this.props.onCancel}
          icon="closeX"
          title={<FormattedMessage id="ui-circulation.settings.staffSlips.closeStaffSlipDialog" />}
          aria-label={<FormattedMessage id="ui-circulation.settings.staffSlips.closeStaffSlipDialog" />}
        />
      </PaneMenu>
    );
  }

  saveLastMenu() {
    const { pristine, submitting, initialValues } = this.props;
    const edit = initialValues && initialValues.id;
    const saveLabel = edit
      ? <FormattedMessage id="ui-circulation.settings.staffSlips.saveAndClose" />
      : <FormattedMessage id="ui-circulation.settings.staffSlips.createStaffSlip" />;

    return (
      <PaneMenu>
        <Button
          id="clickable-save-staff-slip"
          type="submit"
          title={<FormattedMessage id="ui-circulation.settings.staffSlips.saveAndClose" />}
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
    const {
      initialValues: staffSlip = {},
    } = this.props;

    if (staffSlip.id) {
      return (
        <div>
          <Icon size="small" icon="edit" />
          <span>
            <FormattedMessage
              id="ui-circulation.settings.staffSlips.editLabel"
              values={{ name: staffSlip.name }}
            />
          </span>
        </div>
      );
    }
    return <FormattedMessage id="ui-circulation.settings.staffSlips.new" />;
  }

  render() {
    const { stripes, handleSubmit, initialValues } = this.props;
    const disabled = !stripes.hasPerm('settings.organization.enabled');
    const slipType = (initialValues || {}).name || <FormattedMessage id="ui-circulation.settings.staffSlips.hold" />;

    return (
      <form id="form-staff-slip" onSubmit={handleSubmit(this.save)}>
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            firstMenu={this.addFirstMenu()}
            lastMenu={this.saveLastMenu()}
            paneTitle={this.renderPaneTitle()}
          >
            <Row>
              <Col xs={8}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
                  value={(initialValues || {}).name}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.active" />}
                  name="active"
                  id="input-staff-slip-active"
                  component={Checkbox}
                  disabled={disabled}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
                  name="description"
                  id="input-staff-slip-description"
                  component={TextArea}
                  fullWidth
                  disabled={disabled}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.staffSlips.display" />}
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
})(StaffSlipForm);
