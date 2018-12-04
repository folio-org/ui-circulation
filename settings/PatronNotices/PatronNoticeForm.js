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
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

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
        if (find(notices, ['name', values.name])) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ name: 'A patron notice with this name already exists' });
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
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template': true,
        'sms-template': true,
        'print-template': true,
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

    return <span>New patron notice</span>;
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

  // Synchronous validation functions
  requireName = value => (value ? undefined : 'Name is required');
  requireCategory = value => (value ? undefined : 'Category is required');

  render() {
    const { handleSubmit, initialValues, pristine, submitting } = this.props;
    const { confirming } = this.state;
    const category = initialValues && initialValues.category;
    const isActive = initialValues && initialValues.active;
    const sortedCategories = sortBy(categories, ['label']);
    const categoryOptions = sortedCategories.map(({ label, id }) => ({
      labelTranslationPath: label,
      value: id,
      selected: category === id
    }));

    return (
      <form id="form-patron-notice" onSubmit={handleSubmit(this.save)}>
        <Paneset isRoot>
          <Pane defaultWidth="100%" paneTitle={this.renderPaneTitle()} firstMenu={this.renderCLoseIcon()} lastMenu={this.renderSaveMenu()}>
            <Row>
              <Col xs={8}>
                <Field
                  label="Name"
                  name="name"
                  id="input-patron-notice-name"
                  component={TextField}
                  validate={this.requireName}
                />
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
                <Field
                  label="Category"
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
                label="Email"
              >
                <Row>
                  <Col xs={8}>
                    <Field label="Subject" name="subject" id="input-patron-notice-subject" component={TextField} />
                  </Col>
                </Row>
                <Row>
                  <Field label="Body" name="localizedTemplates.en.body" id="input-email-template-body" component={PatronNoticeEditor} tokens={Object.keys(formats.Any)} />
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
            <Row>
              <Col xs={8}>
                <Button
                  id="clickable-delete-patron-notice"
                  type="button"
                  title="Delete"
                  buttonStyle="danger"
                  onClick={this.showConfirm}
                  marginBottom0
                  disabled={!pristine || submitting || confirming || initialValues.predefined}
                >
                  Delete this notice
                </Button>
              </Col>
            </Row>
            { initialValues.predefined &&
              <Row>
                <Col xs={8}>
                  This is a predefined notice and cannot be deleted.
                </Col>
              </Row>
            }
            <ConfirmationModal
              open={this.state.confirming}
              heading="Confirm delete"
              message="Are you sure you want to delete this patron notice?"
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
