import React from 'react';
import {
  FormattedMessage,
} from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { cloneDeep, find, sortBy } from 'lodash';

import {
  Accordion,
  AccordionSet,
  Button,
  Checkbox,
  Col,
  ConfirmationModal,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  Select,
  TextArea,
  TextField,
  Icon,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { IfPermission } from '@folio/stripes/core';

import PatronNoticeEditor from './PatronNoticeEditor';
// import PreviewModal from './PreviewModal';
import formats from './formats';
import categories from './categories';

/**
 * on-blur validation checks that the name of the patron notice
 * is unique.
 *
 * redux-form requires that the rejected Promises have the form
 * { field: "error message" }
 * hence the eslint-disable-next-line comments since ESLint is picky
 * about the format of rejected promises.
 *
 * @see https://redux-form.com/7.3.0/examples/asyncchangevalidation/
 */
function asyncValidate(values, dispatch, props) {
  if (values.name !== undefined) {
    return new Promise((resolve, reject) => {
      const uv = props.uniquenessValidator.nameUniquenessValidator;
      const query = `(name="${values.name}")`;
      uv.reset();
      uv.GET({ params: { query } }).then((notices) => {
        const matchedNotice = find(notices, ['name', values.name]);
        if (matchedNotice && matchedNotice.id !== values.id) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ name: <FormattedMessage id="ui-circulation.settings.patronNotices.errors.nameExists" /> });
        } else {
          resolve();
        }
      });
    });
  }
  return new Promise(resolve => resolve());
}

class PatronNoticeForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    permissions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template': true,
        // 'sms-template': true,
        // 'print-template': true,
      },
      confirming: false,
    };

    this.onToggleSection = this.onToggleSection.bind(this);
    this.save = this.save.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
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

  showConfirm() {
    this.setState({
      confirming: true,
    });
  }

  hideConfirm() {
    this.setState({
      confirming: false,
    });
  }

  confirmDelete() {
    this.props.onRemove(this.props.initialValues);
  }

  renderCLoseIcon() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-circulation.settings.patronNotices.closeDialog">
          {ariaLabel => (
            <IconButton
              id="clickable-close-patron-notice"
              onClick={this.props.onCancel}
              icon="times"
              aria-label={ariaLabel}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderPaneTitle() {
    const { initialValues } = this.props;
    const notice = initialValues || {};

    // If there's an ID, this is editing an existing notice
    if (notice.id) {
      return (
        <FormattedMessage
          id="ui-circulation.settings.patronNotices.editLabel"
          values={{ name: notice.name }}
        />
      );
    }

    return <FormattedMessage id="ui-circulation.settings.patronNotices.newLabel" />;
  }

  renderSaveMenu() {
    const { pristine, submitting, initialValues } = this.props;
    const editing = initialValues && initialValues.id;
    const saveLabel = editing
      ? <FormattedMessage id="ui-circulation.settings.patronNotices.saveLabel" />
      : <FormattedMessage id="ui-circulation.settings.patronNotices.saveNewLabel" />;

    return (
      <PaneMenu>
        <Button
          id="clickable-save-patron-notice"
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

  renderActionMenuItems = ({ onToggle }) => {
    const {
      permissions,
      onCancel,
    } = this.props;

    const handleDeleteClick = () => {
      this.showConfirm();
      onToggle();
    };

    const handleCancelClick = (e) => {
      onCancel(e);
      onToggle();
    };

    return (
      <React.Fragment>
        <Button
          data-test-cancel-patron-notice-form-action
          buttonStyle="dropdownItem"
          onClick={handleCancelClick}
        >
          <Icon icon="times">
            <FormattedMessage id="ui-circulation.settings.common.cancel" />
          </Icon>
        </Button>
        <IfPermission perm={permissions.delete}>
          <Button
            data-test-delete-patron-notice-form-action
            buttonStyle="dropdownItem"
            onClick={handleDeleteClick}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-circulation.settings.common.delete" />
            </Icon>
          </Button>
        </IfPermission>
      </React.Fragment>
    );
  };

  // Synchronous validation functions
  requireName = value => (value ? undefined : <FormattedMessage id="ui-circulation.settings.patronNotices.errors.nameRequired" />);
  requireCategory = value => (value ? undefined : <FormattedMessage id="ui-circulation.settings.patronNotices.errors.categoryRequired" />);

  render() {
    const { handleSubmit, initialValues = {} } = this.props;
    const category = initialValues && initialValues.category;
    const isActive = initialValues && initialValues.active;
    const sortedCategories = sortBy(categories, ['label']);
    const categoryOptions = sortedCategories.map(({ label, id }) => ({
      labelTranslationPath: label,
      value: id,
      selected: category === id
    }));

    const editMode = Boolean(initialValues.id);

    return (
      <form
        id="form-patron-notice"
        data-test-patron-notice-form
        onSubmit={handleSubmit(this.save)}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={this.renderPaneTitle()}
            firstMenu={this.renderCLoseIcon()}
            lastMenu={this.renderSaveMenu()}
            {... editMode ? { actionMenu: this.renderActionMenuItems } : {}}
          >
            <Row>
              <Col
                xs={8}
                data-test-patron-notice-template-name
              >
                <Field
                  required
                  label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.name" />}
                  name="name"
                  id="input-patron-notice-name"
                  component={TextField}
                  validate={this.requireName}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.active" />}
                  name="active"
                  id="input-patron-notice-active"
                  component={Checkbox}
                  defaultChecked={isActive}
                  normalize={v => !!v}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.description" />}
                  name="description"
                  id="input-patron-notice-description"
                  component={TextArea}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />}
                  name="category"
                  component={Select}
                  fullWidth
                  validate={this.requireCategory}
                >
                  {categoryOptions.map(({ labelTranslationPath, value, selected }) => (
                    <FormattedMessage id={labelTranslationPath}>
                      {translatedLabel => (
                        <option
                          value={value}
                          selected={selected}
                        >
                          {translatedLabel}
                        </option>
                      )}
                    </FormattedMessage>
                  ))}
                </Field>
              </Col>
            </Row>
            <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
              <Accordion
                id="email-template"
                label={<FormattedMessage id="ui-circulation.settings.patronNotices.email" />}
              >
                <Row>
                  <Col xs={8}>
                    <Field
                      label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />}
                      name="localizedTemplates.en.header"
                      id="input-patron-notice-subject"
                      component={TextField}
                    />
                  </Col>
                </Row>
                <Row>
                  <Field
                    label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
                    name="localizedTemplates.en.body"
                    id="input-email-template-body"
                    component={PatronNoticeEditor}
                    tokens={Object.keys(formats.Any)}
                  />
                </Row>
              </Accordion>
              {/* <Accordion
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
              </Accordion> */}
            </AccordionSet>
            { initialValues && initialValues.predefined &&
              <Row>
                <Col xs={8}>
                  <FormattedMessage id="ui-circulation.settings.patronNotices.predefinedWarning" />
                </Col>
              </Row>
            }
            <ConfirmationModal
              id="delete-item-confirmation"
              open={this.state.confirming}
              heading={<FormattedMessage id="ui-circulation.settings.patronNotices.deleteHeading" />}
              message={<FormattedMessage id="ui-circulation.settings.patronNotices.deleteConfirm" />}
              onConfirm={this.confirmDelete}
              onCancel={this.hideConfirm}
            />
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
  asyncValidate,
  asyncBlurFields: ['name'],
})(PatronNoticeForm);
