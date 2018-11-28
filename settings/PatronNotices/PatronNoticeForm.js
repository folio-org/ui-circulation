import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { cloneDeep } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  Checkbox,
  Col,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import PatronNoticeEditor from './PatronNoticeEditor';
// import PreviewModal from './PreviewModal';
import formats from './formats';

class PatronNoticeForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template': true,
        'sms-template': true,
        'print-template': true,
      },
    };

    this.onToggleSection = this.onToggleSection.bind(this);
    this.save = this.save.bind(this);
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.accordions[id] = !curState.accordions[id];
      return newState;
    });
  }

  save(data) {
    this.props.onSave(data);
  }

  renderCLoseIcon() {
    return (
      <PaneMenu>
        <IconButton
          id="clickable-close-patron-notice"
          onClick={this.props.onCancel}
          icon="closeX"
          title="close"
          aria-label="Close"
        />
      </PaneMenu>
    );
  }

  renderPaneTitle() {
    const { initialValues } = this.props;
    const notice = initialValues || {};

    // If there's an ID, this is editing an existing notice
    if (notice.id) {
      return (
        <span>
          Patron notices |
          {notice.name}
        </span>
      );
    }

    return <span>Patron notices</span>;
  }

  renderSaveMenu() {
    const { pristine, submitting, initialValues } = this.props;
    const editing = initialValues && initialValues.id;
    const saveLabel = editing ? 'Save' : 'Save new';

    return (
      <PaneMenu>
        <Button
          id="clickable-save-patron-notice"
          type="submit"
          title="Save"
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
          disabled={(pristine || submitting)}
        >
          {saveLabel}
        </Button>
      </PaneMenu>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const isActive = this.props.initialValues && this.props.initialValues.active;

    return (
      <form id="form-patron-notice" onSubmit={handleSubmit(this.save)}>
        <Paneset isRoot>
          <Pane defaultWidth="100%" paneTitle={this.renderPaneTitle()} firstMenu={this.renderCLoseIcon()} lastMenu={this.renderSaveMenu()}>
            <Row>
              <Col xs={8}>
                <Field label="Name" name="name" id="input-patron-notice-name" component={TextField} />
              </Col>
              <Col xs={3}>
                <Field label="Active" name="active" id="input-patron-notice-active" component={Checkbox} defaultChecked={isActive} normalize={v => !!v} />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field label="Description" name="description" id="input-patron-notice-description" component={TextArea} />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field label="Category" name="category" id="input-patron-notice-category" component={TextField} />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field label="Subject" name="subject" id="input-patron-notice-subject" component={TextField} />
              </Col>
            </Row>
            <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
              <Accordion
                id="email-template"
                label="Email"
              >
                <Row>
                  <Field label="Body" name="localizedTemplates.email.body" id="input-email-template-body" component={PatronNoticeEditor} tokens={Object.keys(formats.Any)} />
                </Row>
              </Accordion>
              <Accordion
                id="sms-template"
                label="SMS"
              >
                <Row>
                  <Field label="Body" name="localizedTemplates.sms.body" id="input-sms-template-body" component={PatronNoticeEditor} tokens={Object.keys(formats.Any)} />
                </Row>
              </Accordion>
              <Accordion
                id="print-template"
                label="Print"
              >
                <Row>
                  <Field label="Body" name="localizedTemplates.print.body" id="input-print-template-body" component={PatronNoticeEditor} tokens={Object.keys(formats.Any)} />
                </Row>
              </Accordion>
            </AccordionSet>
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
