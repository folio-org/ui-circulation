import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  Button,
  Col,
  ConfirmationModal,
  Datepicker,
  ExpandAllButton,
  Icon,
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
    intl: intlShape.isRequired,
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
    const selectedSet = this.props.initialValues;
    if (confirmation) {
      this.props.onRemove(selectedSet);
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
      intl: { formatMessage },
      onCancel,
    } = this.props;

    return (
      <PaneMenu>
        <button
          id="clickable-close-fixedDueDateSchedule"
          onClick={onCancel}
          title={formatMessage({ id: 'ui-circulation.settings.fDDSform.close' })}
          aria-label={formatMessage({ id: 'ui-circulation.settings.fDDSform.closeLabel' })}
          type="button"
        >
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }}>&times;</span>
        </button>
      </PaneMenu>
    );
  }

  saveLastMenu() {
    const {
      pristine,
      submitting,
      initialValues,
      intl: { formatMessage },
    } = this.props;

    const { confirmDelete } = this.state;
    const edit = initialValues && initialValues.id;
    const saveLabel = edit ? formatMessage({ id: 'ui-circulation.settings.fDDSform.saveSchedule' }) :
      formatMessage({ id: 'ui-circulation.settings.fDDSform.createSchedule' });

    return (
      <PaneMenu>
        {edit &&
          <IfPermission perm="ui-circulation.settings.loan-rules">
            <Button
              id="clickable-delete-item"
              title={formatMessage({ id: 'ui-circulation.settings.fDDSform.delete' })}
              buttonStyle="danger"
              onClick={this.beginDelete}
              disabled={confirmDelete}
            >
              <FormattedMessage id="circulation.settings.staffSlips.delete" />
            </Button>
          </IfPermission>
        }
        <Button
          id="clickable-save-fixedDueDateSchedule"
          type="submit"
          title={saveLabel}
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
      intl: { formatMessage },
    } = this.props;

    if (selectedSet.id) {
      return (
        <div>
          <Icon size="small" icon="edit" />
          <span>{`${formatMessage({ id: 'ui-circulation.settings.fDDS.edit' })}: ${selectedSet.name}`}</span>
        </div>
      );
    }
    return formatMessage({ id: 'ui-circulation.settings.fDDSform.newFixDDSchedule' });
  }

  renderSchedules({ fields, meta: { error, submitFailed } }) {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Row>
          <Col xs={11} />
          <Col xs={1}>
            <Button type="button" onClick={() => fields.unshift({})}>
              {formatMessage({ id: 'ui-circulation.settings.fDDSform.new' })}
            </Button>
          </Col>
        </Row>
        {submitFailed && error && <Row><Col xs={12} className={css.scheduleError}>{error}</Col></Row>}
        {fields.map((schedule, index, f) => (
          <div key={index} className={css.scheduleItem}>
            <div className={css.scheduleHeader}>
              <h4>
                {formatMessage({ id: 'ui-circulation.settings.fDDSform.dateRange' })}
                {' '}
                {index + 1}
              </h4>
            </div>
            <div className={css.scheduleItemContent}>
              <Row>
                <Col xs={12} sm={4}>
                  <Field
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dateFrom' })}
                    name={`${schedule}.from`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <Field
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dateTo' })}
                    name={`${schedule}.to`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={3}>
                  <Field
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.dueDate' })}
                    name={`${schedule}.due`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={1}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Button
                      buttonStyle="transparent slim"
                      style={{ position: 'absolute', bottom: '0' }}
                      title={formatMessage({ id: 'ui-circulation.settings.fDDSform.remove' })}
                      onClick={() => { f.remove(index); }}
                    >
                      <Icon icon="trashBin" />
                    </Button>
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
      intl: { formatMessage },
    } = this.props;

    const { confirmDelete, sections } = this.state;
    const selectedSet = initialValues || {};
    const selectedName = selectedSet.name || formatMessage({ id: 'ui-circulation.settings.fDDSform.untitled' });
    const confirmationMessage = <FormattedMessage id="ui-circulation.settings.fDDSform.deleteMessage" values={{ name: <strong>{selectedName}</strong>, deleted: <strong>deleted</strong> }} />;

    return (
      <form id="form-fixedDueDateSchedule" onSubmit={handleSubmit(this.saveSet)}>
        <Paneset isRoot>
          <Pane defaultWidth="100%" firstMenu={this.addFirstMenu()} lastMenu={this.saveLastMenu()} paneTitle={this.renderPaneTitle()}>
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
                label={formatMessage({ id: 'ui-circulation.settings.fDDSform.about' })}
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
                      label={formatMessage({ id: 'ui-circulation.settings.fDDSform.nameRequired' })}
                    />
                  </div>
                  <Field
                    name="description"
                    component={TextArea}
                    fullWidth
                    label={formatMessage({ id: 'ui-circulation.settings.fDDSform.description' })}
                  />
                </section>
              </Accordion>
              <Accordion
                open={sections.schedule}
                id="schedule"
                onToggle={this.handleSectionToggle}
                label={formatMessage({ id: 'ui-circulation.settings.fDDSform.schedule' })}
              >
                <section className={css.accordionSection}>
                  <FieldArray name="schedules" component={this.renderSchedules} />
                </section>
              </Accordion>
              <ConfirmationModal
                id="deletefixedduedateschedule-confirmation"
                open={confirmDelete}
                heading={formatMessage({ id: 'ui-circulation.settings.fDDSform.deleteHeader' })}
                message={confirmationMessage}
                onConfirm={() => { this.confirmDeleteSet(true); }}
                onCancel={() => { this.confirmDeleteSet(false); }}
                confirmLabel={formatMessage({ id: 'ui-circulation.settings.fDDSform.delete' })}
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
})(injectIntl(FixedDueDateScheduleForm));
