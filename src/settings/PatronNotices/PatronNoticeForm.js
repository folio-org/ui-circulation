import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  find,
  sortBy,
} from 'lodash';

import {
  Accordion,
  AccordionSet,
  Checkbox,
  Col,
  Pane,
  Paneset,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import tokens from './tokens';
import TokensList from './TokensList';
import { patronNoticeCategories } from '../../constants';
import {
  CancelButton,
  FooterPane,
  TemplateEditor,
} from '../components';

import css from './PatronNoticeForm.css';

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
    initialValues: PropTypes.object,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template': true,
      }
    };
  }

  onToggleSection = ({ id }) => {
    this.setState((state) => {
      const accordions = { ...state.accordions };
      accordions[id] = !accordions[id];
      return { accordions };
    });
  }

  onSave = (data) => {
    this.props.onSave(data);
  };

  renderCLoseIcon() {
    const { onCancel } = this.props;

    return (
      <CancelButton
        labelKey="ui-circulation.settings.patronNotices.closeDialog"
        onCancel={onCancel}
      />
    );
  }

  renderPaneTitle() {
    const {
      initialValues: notice = {}
    } = this.props;

    return notice.id
      ? notice.name
      : <FormattedMessage id="ui-circulation.settings.patronNotices.newLabel" />;
  }

  renderFooterPane() {
    const {
      pristine,
      submitting,
      onCancel,
    } = this.props;

    return (
      <FooterPane
        pristine={pristine}
        submitting={submitting}
        onCancel={onCancel}
      />
    );
  }

  render() {
    const {
      handleSubmit,
      initialValues,
    } = this.props;

    const category = initialValues && initialValues.category;
    const isActive = initialValues && initialValues.active;

    const sortedCategories = sortBy(patronNoticeCategories, ['label']);
    const categoryOptions = sortedCategories.map(({ label, id }) => ({
      labelTranslationPath: label,
      value: id,
      selected: category === id
    }));

    return (
      <form
        id="form-patron-notice"
        className={css.patronNoticeForm}
        noValidate
        data-test-patron-notice-form
        onSubmit={handleSubmit(this.onSave)}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={this.renderPaneTitle()}
            firstMenu={this.renderCLoseIcon()}
            footer={this.renderFooterPane()}
          >
            <Row>
              <Col
                xs={8}
                data-test-patron-notice-template-name
              >
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.name" />}
                  name="name"
                  required
                  id="input-patron-notice-name"
                  component={TextField}
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
                <div data-test-template-category>
                  <Field
                    label={<FormattedMessage id="ui-circulation.settings.patronNotices.notice.category" />}
                    name="category"
                    component={Select}
                    fullWidth
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
                </div>
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
                      id="input-patron-notice-subject"
                      component={TextField}
                      required
                      label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />}
                      name="localizedTemplates.en.header"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <Field
                      label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
                      required
                      name="localizedTemplates.en.body"
                      id="input-email-template-body"
                      component={TemplateEditor}
                      tokens={tokens}
                      tokensList={TokensList}
                      previewModalHeader={<FormattedMessage id="ui-circulation.settings.patronNotices.form.previewHeader" />}
                    />
                  </Col>
                </Row>
              </Accordion>
            </AccordionSet>
            { initialValues && initialValues.predefined &&
              <Row>
                <Col xs={8}>
                  <FormattedMessage id="ui-circulation.settings.patronNotices.predefinedWarning" />
                </Col>
              </Row>}
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
