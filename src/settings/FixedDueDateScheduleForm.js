import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  Button,
  Col,
  ConfirmationModal,
  Datepicker,
  ExpandAllButton,
  Icon,
  IconButton,
  IfPermission,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import { ViewMetaData } from '@folio/stripes/smart-components';
import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.renderSchedules = this.renderSchedules.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.renderPaneTitle = this.renderPaneTitle.bind(this);
    this.saveSet = this.saveSet.bind(this);
    this.beginDelete = this.beginDelete.bind(this);
    this.confirmDeleteSet = this.confirmDeleteSet.bind(this);
    this.cViewMetaData = props.stripes.connect(ViewMetaData);

    this.state = {
      confirmDelete: false,
      sections: {
        generalInformation: true,
        schedule: true,
      },
    };
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  handleExpandAll(sections) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  }

  saveSet(data) {
    this.props.onSave(data);
  }

  confirmDeleteSet(confirmation) {
    const {
      initialValues: selectedSet,
      onRemove,
    } = this.props;

    if (confirmation) {
      onRemove(selectedSet);
    } else {
      this.setState({ confirmDelete: false });
    }
  }

  beginDelete() {
    this.setState({
      confirmDelete: true,
    });
  }

  addFirstMenu() {
    const {
      onCancel,
    } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-circulation.settings.fDDSform.closeLabel">
          {ariaLabel => (
            <IconButton
              onClick={onCancel}
              icon="times"
              size="medium"
              iconClassName="closeIcon"
              aria-label={ariaLabel}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  saveLastMenu() {
    const {
      pristine,
      submitting,
      initialValues,
    } = this.props;

    const { confirmDelete } = this.state;
    const edit = initialValues && initialValues.id;
    const saveLabel = edit
      ? <FormattedMessage id="ui-circulation.settings.fDDSform.saveSchedule" />
      : <FormattedMessage id="ui-circulation.settings.fDDSform.createSchedule" />;

    return (
      <PaneMenu>
        {edit &&
          <IfPermission perm="ui-circulation.settings.loan-rules">
            <Button
              id="clickable-delete-item"
              buttonStyle="danger"
              onClick={this.beginDelete}
              disabled={confirmDelete}
            >
              <FormattedMessage id="ui-circulation.settings.staffSlips.delete" />
            </Button>
          </IfPermission>
        }
        <Button
          id="clickable-save-fixedDueDateSchedule"
          type="submit"
          disabled={(pristine || submitting)}
        >
          {saveLabel}
        </Button>
      </PaneMenu>
    );
  }

  renderPaneTitle() {
    const {
      initialValues: selectedSet = {},
    } = this.props;

    if (selectedSet.id) {
      return (
        <div>
          <Icon size="small" icon="edit" />
          <span>
            <FormattedMessage
              id="ui-circulation.settings.fDDS.editLabel"
              values={{ name: selectedSet.name }}
            />
          </span>
        </div>
      );
    }

    return <FormattedMessage id="ui-circulation.settings.fDDSform.newFixDDSchedule" />;
  }

  renderSchedules({ fields, meta: { error, submitFailed } }) {
    return (
      <div>
        <Row>
          <Col xs={11} />
          <Col xs={1}>
            <Button type="button" onClick={() => fields.unshift({})}>
              <Icon icon="plus-sign">
                <FormattedMessage id="ui-circulation.settings.fDDSform.new" />
              </Icon>
            </Button>
          </Col>
        </Row>
        {submitFailed && error && <Row><Col xs={12} className={css.scheduleError}>{error}</Col></Row>}
        {fields.map((schedule, index, f) => (
          <div key={index} className={css.scheduleItem}>
            <div className={css.scheduleHeader}>
              <h4>
                <FormattedMessage id="ui-circulation.settings.fDDSform.dateRange" />
                {' '}
                {index + 1}
              </h4>
            </div>
            <div className={css.scheduleItemContent}>
              <Row>
                <Col xs={12} sm={4}>
                  <Field
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dateFrom" />}
                    name={`${schedule}.from`}
                    dateFormat="YYYY-MM-DD"
                    timeZone="UTC"
                    backendDateStandard="YYYY-MM-DD"
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <Field
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dateTo" />}
                    name={`${schedule}.to`}
                    dateFormat="YYYY-MM-DD"
                    timeZone="UTC"
                    backendDateStandard="YYYY-MM-DD"
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={3}>
                  <Field
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.dueDate" />}
                    dateFormat="YYYY-MM-DD"
                    timeZone="UTC"
                    backendDateStandard="YYYY-MM-DD"
                    name={`${schedule}.due`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={1}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <FormattedMessage id="ui-circulation.settings.fDDSform.remove">
                      {ariaLabel => (
                        <Button
                          buttonStyle="transparent slim"
                          style={{ position: 'absolute', bottom: '0' }}
                          ariaLabel={ariaLabel}
                          onClick={() => { f.remove(index); }}
                        >
                          <Icon icon="trashBin" />
                        </Button>
                      )}
                    </FormattedMessage>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      handleSubmit,
      initialValues,
    } = this.props;

    const { confirmDelete, sections } = this.state;
    const selectedSet = initialValues || {};
    const selectedName = selectedSet.name || <FormattedMessage id="ui-circulation.settings.fDDSform.untitled" />;
    const confirmationMessage = <FormattedMessage
      id="ui-circulation.settings.fDDSform.deleteMessage"
      values={{ name: <strong>{selectedName}</strong>, deleted: <strong>deleted</strong> }}
    />;

    return (
      <form id="form-fixedDueDateSchedule" onSubmit={handleSubmit(this.saveSet)}>
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            firstMenu={this.addFirstMenu()}
            lastMenu={this.saveLastMenu()}
            paneTitle={this.renderPaneTitle()}
          >
            <div>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
                </Col>
              </Row>
              <Accordion
                open={sections.generalInformation}
                id="generalInformation"
                onToggle={this.handleSectionToggle}
                label={<FormattedMessage id="ui-circulation.settings.fDDSform.about" />}
              >
                <section className={css.accordionSection}>
                  {(initialValues && initialValues.metadata && initialValues.metadata.createdDate) &&
                    <this.cViewMetaData metadata={initialValues.metadata} />
                  }
                  <div className={css.smformItem}>
                    <Field
                      name="name"
                      component={TextField}
                      id="input_schedule_name"
                      autoFocus
                      required
                      fullWidth
                      label={<FormattedMessage id="ui-circulation.settings.fDDSform.nameRequired" />}
                    />
                  </div>
                  <Field
                    name="description"
                    component={TextArea}
                    fullWidth
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.description" />}
                  />
                </section>
              </Accordion>
              <Accordion
                open={sections.schedule}
                id="schedule"
                onToggle={this.handleSectionToggle}
                label={<FormattedMessage id="ui-circulation.settings.fDDSform.schedule" />}
              >
                <section className={css.accordionSection}>
                  <FieldArray name="schedules" component={this.renderSchedules} />
                </section>
              </Accordion>
              <ConfirmationModal
                id="deletefixedduedateschedule-confirmation"
                open={confirmDelete}
                heading={<FormattedMessage id="ui-circulation.settings.fDDSform.deleteHeader" />}
                message={confirmationMessage}
                onConfirm={() => { this.confirmDeleteSet(true); }}
                onCancel={() => { this.confirmDeleteSet(false); }}
                confirmLabel={<FormattedMessage id="ui-circulation.settings.fDDSform.delete" />}
                buttonStyle="danger"
              />
            </div>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'FixedDueDateScheduleForm',
  navigationCheck: true,
  enableReinitialize: false,
})(FixedDueDateScheduleForm);
