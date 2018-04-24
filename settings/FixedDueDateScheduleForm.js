import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Icon from '@folio/stripes-components/lib/Icon';
import { Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import stripesForm from '@folio/stripes-form';
import ConfirmationModal from '@folio/stripes-components/lib/structures/ConfirmationModal';
import ViewMetadata from './ViewMetadata';
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
    this.cViewMetadata = props.stripes.connect(ViewMetadata);

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
    const { stripes: { intl } } = this.props;
    return (
      <PaneMenu>
        <button
          id="clickable-close-fixedDueDateSchedule"
          onClick={this.props.onCancel}
          title={intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.close' })}
          aria-label={intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.closeLabel' })}
        >
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }
  saveLastMenu() {
    const { pristine, submitting, initialValues, stripes: { intl } } = this.props;
    const { confirmDelete } = this.state;
    const edit = initialValues && initialValues.id;
    const saveLabel = edit ? intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.saveSchedule' }) :
      intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.createSchedule' });

    return (
      <PaneMenu>
        {edit &&
          <IfPermission perm="ui-circulation.settings.loan-rules">
            <Button
              id="clickable-delete-set"
              title={intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.delete' })}
              buttonStyle="danger"
              onClick={this.beginDelete}
              disabled={confirmDelete}
            >Delete
            </Button>
          </IfPermission>
        }
        <Button
          id="clickable-save-fixedDueDateSchedule"
          type="submit"
          title={saveLabel}
          disabled={(pristine || submitting)}
        >{saveLabel}
        </Button>
      </PaneMenu>
    );
  }
  renderPaneTitle() {
    const { initialValues, stripes: { intl } } = this.props;
    const selectedSet = initialValues || {};

    if (selectedSet.id) {
      return (<div><Icon size="small" icon="edit" /><span>{`${intl.formatMessage({ id: 'ui-circulation.settings.fDDS.edit' })}: ${selectedSet.name}`}</span></div>);
    }
    return intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.newFixDDSchedule' });
  }

  renderSchedules({ fields, meta: { error, submitFailed } }) {
    return (
      <div>
        <Row>
          <Col xs={11} />
          <Col xs={1}>
            <Button type="button" onClick={() => fields.unshift({})}>
              {this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.new' })}
            </Button>
          </Col>
        </Row>
        {submitFailed && error && <Row><Col xs={12} className="error">{error}</Col></Row>}
        {fields.map((schedule, index, f) => (
          <div key={index} className={css.scheduleItem}>
            <div className={css.sceduleHeader} >
              <h4>
                {this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dateRange' })} { index + 1 }
              </h4>
            </div>
            <div className={css.scheduleItemContent}>
              <Row>
                <Col xs={12} sm={4}>
                  <Field
                    label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dateFrom' })}
                    name={`${schedule}.from`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <Field
                    label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dateTo' })}
                    name={`${schedule}.to`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={3}>
                  <Field
                    label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.dueDate' })}
                    name={`${schedule}.due`}
                    component={Datepicker}
                  />
                </Col>
                <Col xs={12} sm={1}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Button
                      buttonStyle="transparent slim"
                      style={{ position: 'absolute', bottom: '0' }}
                      title={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.fDDSform.remove' })}
                      onClick={() => { f.remove(index); }}
                    ><Icon icon="trashBin" />
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
    const { handleSubmit, initialValues } = this.props;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { confirmDelete, sections } = this.state;
    const selectedSet = initialValues || {};
    const selectedName = selectedSet.name || formatMsg({ id: 'ui-circulation.settings.fDDSform.untitled' });
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
                label={formatMsg({ id: 'ui-circulation.settings.fDDSform.about' })}
              >
                <section className={css.accordianSection}>
                  { (initialValues && initialValues.metadata && initialValues.metadata.createdDate) &&
                    <this.cViewMetadata metadata={initialValues.metadata} />
                  }
                  <div className={css.smformItem}>
                    <Field
                      name="name"
                      component={TextField}
                      autoFocus
                      required
                      fullWidth
                      rounded
                      label={formatMsg({ id: 'ui-circulation.settings.fDDSform.nameRequired' })}
                    />
                  </div>
                  <Field
                    name="description"
                    component={TextArea}
                    fullWidth
                    rounded
                    label={formatMsg({ id: 'ui-circulation.settings.fDDSform.description' })}
                  />
                </section>
              </Accordion>
              <Accordion
                open={sections.schedule}
                id="schedule"
                onToggle={this.handleSectionToggle}
                label={formatMsg({ id: 'ui-circulation.settings.fDDSform.schedule' })}
              >
                <section className={css.accordianSection}>
                  <FieldArray name="schedules" component={this.renderSchedules} />
                </section>
              </Accordion>
              <ConfirmationModal
                open={confirmDelete}
                heading={formatMsg({ id: 'ui-circulation.settings.fDDSform.deleteHeader' })}
                message={confirmationMessage}
                onConfirm={() => { this.confirmDeleteSet(true); }}
                onCancel={() => { this.confirmDeleteSet(false); }}
                confirmLabel={formatMsg({ id: 'ui-circulation.settings.fDDSform.delete' })}
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
