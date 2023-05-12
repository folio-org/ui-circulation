import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { memoize } from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Button,
  Col,
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

import {
  getHeaderWithCredentials,
} from '../utils/headers';
import {
  isEditLayer,
  validateUniqueNameById,
} from '../utils/utils';

import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    okapi: PropTypes.object.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    initialValues: {}
  };

  constructor(props) {
    super(props);
    this.cViewMetaData = props.stripes.connect(ViewMetaData);

    this.state = {
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
        ...getHeaderWithCredentials(okapi)
      });
  };

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  addFirstMenu = () => {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-circulation.settings.fDDSform.closeLabel">
          {ariaLabel => (
            <IconButton
              data-testid="closeIcon"
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
      pristine,
      submitting,
      onCancel,
    } = this.props;

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

  validateName = memoize((name) => (
    validateUniqueNameById({
      currentName: name,
      previousId: this.props.initialValues.id,
      getByName: this.getScheduleByName,
      selector: 'fixedDueDateSchedules',
      errorKey: 'settings.fDDS.validate.uniqueName',
    })
  ));

  render() {
    const {
      handleSubmit,
      initialValues,
      initialValues: {
        id,
      },
      location: {
        search,
      },
      stripes: { timezone },
    } = this.props;
    const {
      sections,
    } = this.state;

    if (isEditLayer(search) && !id) {
      return null;
    }

    return (
      <form
        id="form-fixedDueDateSchedule"
        data-testid="fixedDueDateScheduleForm"
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
                    data-testid="expandAllButton"
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
                  <section data-test-fdds-form-general-section>
                    {(initialValues.metadata && initialValues.metadata.createdDate) && (
                      <this.cViewMetaData metadata={initialValues.metadata} />
                    )}
                    <div data-test-general-section-name>
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
                  <section data-test-fdds-form-schedule-section>
                    <FieldArray
                      component={SchedulesList}
                      name="schedules"
                      timezone={timezone}
                    />
                  </section>
                </Accordion>
              </AccordionSet>
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
