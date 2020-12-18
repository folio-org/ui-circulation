import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  find,
  memoize,
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
import stripesFinalForm from '@folio/stripes/final-form';
import { TemplateEditor } from '@folio/stripes-template-editor';

import tokens from './tokens';
import TokensList from './TokensList';
import { patronNoticeCategories } from '../../constants';
import {
  CancelButton,
  FooterPane,
} from '../components';

import { PatronNoticeTemplate as validatePatronNoticeTemplate } from '../Validation';

import css from './PatronNoticeForm.css';

class PatronNoticeForm extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    okapi: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    form: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        'email-template-form': true,
      }
    };
  }

  getTemplatesByName = (name) => {
    const { okapi } = this.props;

    return fetch(`${okapi.url}/templates?query=(name=="${name}")`,
      {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
          'Content-Type': 'application/json',
        }
      });
  };

  validateName = memoize(async (name) => {
    const { initialValues } = this.props;

    let error;

    if (name) {
      try {
        const response = await this.getTemplatesByName(name);
        const { templates = [] } = await response.json();
        const matchedTemplate = find(templates, template => {
          return template.name.toLowerCase() === name.toLowerCase();
        });
        if (matchedTemplate && matchedTemplate.id !== initialValues.id) {
          error = <FormattedMessage id="ui-circulation.settings.patronNotices.errors.nameExists" />;
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    return error;
  });

  onToggleSection = ({ id }) => {
    this.setState((state) => {
      const accordions = { ...state.accordions };
      accordions[id] = !accordions[id];
      return { accordions };
    });
  }

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
      intl: { formatMessage },
      form: { getFieldState }
    } = this.props;

    const isActive = initialValues && initialValues.active;
    const category = getFieldState('category')?.value;

    const categoryOptions = patronNoticeCategories.map(({ label, id }) => ({
      label: formatMessage({ id: label }),
      value: id,
    }));

    return (
      <form
        id="form-patron-notice"
        className={css.patronNoticeForm}
        noValidate
        data-test-patron-notice-form
        onSubmit={handleSubmit}
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
                  validate={this.validateName}
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
                    dataOptions={categoryOptions}
                  />
                </div>
              </Col>
            </Row>
            <AccordionSet accordionStatus={this.state.accordions} onToggle={this.onToggleSection}>
              <Accordion
                id="email-template-form"
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
                      selectedCategory={category}
                    />
                  </Col>
                </Row>
              </Accordion>
            </AccordionSet>
            { initialValues.predefined &&
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

export default stripesFinalForm({
  navigationCheck: true,
  validate: validatePatronNoticeTemplate,
  subscription: { values: true },
})(injectIntl(PatronNoticeForm));
