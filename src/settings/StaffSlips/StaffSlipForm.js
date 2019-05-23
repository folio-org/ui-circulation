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

import formats from './formats';
import { staffSlipMap } from '../../constants';

import { TemplateEditor } from '../components';
import TokensList from './TokensList';

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
        <FormattedMessage id="ui-circulation.settings.staffSlips.closeStaffSlipDialog">
          {ariaLabel => (
            <IconButton
              id="clickable-close-staff-slip"
              onClick={this.props.onCancel}
              icon="times"
              aria-label={ariaLabel}
            />
          )}
        </FormattedMessage>
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
    const slipType = (initialValues || {}).name || staffSlipMap.HOLD;

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
                  type="checkbox"
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
                  component={TemplateEditor}
                  tokens={formats[slipType]}
                  name="template"
                  previewModalHeader={<FormattedMessage id="ui-circulation.settings.staffSlips.preview" />}
                  tokensList={TokensList}
                  printable
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
