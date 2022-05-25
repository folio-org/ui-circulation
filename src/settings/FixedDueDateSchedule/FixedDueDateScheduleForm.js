import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import {
  find,
  memoize,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  PaneFooter,
  Paneset,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { ViewMetaData } from '@folio/stripes/smart-components';

import SchedulesList from './components/EditSections/components/SchedulesList';

import { FixedDueDateSchedule as validateFixedDueDateSchedule } from '../Validation';

import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    okapi: PropTypes.object.isRequired,
  };

  static defaultProps = {
    initialValues: {}
  };

  constructor(props) {
    super(props);
    this.cViewMetaData = props.stripes.connect(ViewMetaData);

    this.state = {
      confirmDelete: false,
      sections: {
        generalFixedDueDate: true,
        schedule: true,
      },
    };
  }

  getScheduleByName = (name) => {
    const { okapi } = this.props;

    return fetch(`${okapi.url}/fixed-due-date-schedule-storage/fixed-due-date-schedules?query=(name=="${name}")`,
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
        const response = await this.getScheduleByName(name);
        const { fixedDueDateSchedules = [] } = await response.json();
        const matchedSchedule = find(fixedDueDateSchedules, ['name', name]);
        if (matchedSchedule && matchedSchedule.id !== initialValues.id) {
          error = <FormattedMessage id="ui-circulation.settings.fDDS.validate.uniqueName" />;
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    return error;
  });

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  confirmDeleteSet = (confirmation) => {
    const {
      initialValues,
      onRemove,
    } = this.props;

    if (confirmation) {
      onRemove(initialValues);
    } else {
      this.setState({ confirmDelete: false });
    }
  }

  beginDelete = () => {
    this.setState({ confirmDelete: true });
  };

  addFirstMenu = () => {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-circulation.settings.fDDSform.closeLabel">
          {ariaLabel => (
            <IconButton
              data-testid="close-icon"
              aria-label={ariaLabel}
              icon="times"
              iconClassName="closeIcon"
              size="medium"
              onClick={onCancel}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderFooter() {
    const {
      initialValues,
      pristine,
      submitting,
      onCancel,
    } = this.props;

    const { confirmDelete } = this.state;
    const edit = Boolean(initialValues.id);

    return (
      <PaneFooter>
        <div className={css.footerContent}>
          <Button
            id="clickable-cancel-fixedDueDateSchedule"
            buttonStyle="default mega"
            marginBottom0
            onClick={onCancel}
          >
            <FormattedMessage id="ui-circulation.settings.fDDSform.cancel" />
          </Button>
          {edit && (
            <Button
              id="clickable-delete-item"
              buttonStyle="danger mega"
              disabled={confirmDelete}
              marginBottom0
              onClick={this.beginDelete}
            >
              <FormattedMessage id="stripes-core.button.delete" />
            </Button>
          )}
          <Button
            id="clickable-save-fixedDueDateSchedule"
            type="submit"
            marginBottom0
            buttonStyle="primary mega"
            disabled={(pristine || submitting)}
          >
            <FormattedMessage id="ui-circulation.settings.common.saveAndClose" />
          </Button>
        </div>
      </PaneFooter>
    );
  }

  renderPaneTitle = () => {
    const { initialValues } = this.props;

    if (initialValues.id) {
      return (
        <>
          <Icon
            size="small"
            icon="edit"
          />
          <FormattedMessage
            id="ui-circulation.settings.fDDS.editLabel"
            values={{ name: initialValues.name }}
          />
        </>
      );
    }

    return <FormattedMessage id="ui-circulation.settings.fDDSform.newFixDDSchedule" />;
  };

  render() {
    const {
      handleSubmit,
      initialValues,
      stripes: { timezone },
    } = this.props;
    const {
      confirmDelete,
      sections,
    } = this.state;

    const selectedSet = initialValues || {};
    const selectedName = selectedSet.name || <FormattedMessage id="ui-circulation.settings.fDDSform.untitled" />;
    const confirmationMessage = <FormattedMessage
      id="ui-circulation.settings.fDDSform.deleteMessage"
      values={{ name: <strong>{selectedName}</strong>, deleted: <strong>deleted</strong> }}
    />;

    return (
      <form
        id="form-fixedDueDateSchedule"
        className={css.fixedDueDateScheduleForm}
        data-test-fdds-form
        noValidate
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            id="fixed-due-date-schedule-pane"
            defaultWidth="100%"
            firstMenu={this.addFirstMenu()}
            footer={this.renderFooter()}
            paneTitle={this.renderPaneTitle()}
          >
            <div>
              <Row end="xs">
                <Col
                  data-test-expand-all
                  xs
                >
                  <ExpandAllButton
                    data-testid="expand-all-button"
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <AccordionSet
                accordionStatus={sections}
                onToggle={this.handleSectionToggle}
              >
                <Accordion
                  id="generalFixedDueDate"
                  open={sections.generalFixedDueDate}
                  label={<FormattedMessage id="ui-circulation.settings.fDDSform.about" />}
                >
                  <section
                    className={css.accordionSection}
                    data-test-fdds-form-general-section
                  >
                    {(initialValues.metadata && initialValues.metadata.createdDate) && (
                      <this.cViewMetaData metadata={initialValues.metadata} />
                    )}
                    <div
                      className={css.smformItem}
                      data-test-general-section-name
                    >
                      <Field
                        id="input_schedule_name"
                        autoFocus
                        component={TextField}
                        fullWidth
                        label={<FormattedMessage id="ui-circulation.settings.fDDSform.name" />}
                        name="name"
                        required
                        validate={this.validateName}
                      />
                    </div>
                    <div data-test-general-section-description>
                      <Field
                        name="description"
                        component={TextArea}
                        fullWidth
                        label={<FormattedMessage id="ui-circulation.settings.fDDSform.description" />}
                      />
                    </div>
                  </section>
                </Accordion>
                <Accordion
                  open={sections.schedule}
                  id="schedule"
                  label={<FormattedMessage id="ui-circulation.settings.fDDSform.schedule" />}
                >
                  <section
                    className={css.accordionSection}
                    data-test-fdds-form-schedule-section
                  >
                    <FieldArray
                      component={SchedulesList}
                      name="schedules"
                      timezone={timezone}
                    />
                  </section>
                </Accordion>
              </AccordionSet>
              <ConfirmationModal
                id="deletefixedduedateschedule-confirmation"
                buttonStyle="danger"
                confirmLabel={<FormattedMessage id="ui-circulation.settings.fDDSform.delete" />}
                heading={<FormattedMessage id="ui-circulation.settings.fDDSform.deleteHeader" />}
                open={confirmDelete}
                message={confirmationMessage}
                onCancel={() => { this.confirmDeleteSet(false); }}
                onConfirm={() => { this.confirmDeleteSet(true); }}
              />
            </div>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: validateFixedDueDateSchedule,
})(FixedDueDateScheduleForm);
