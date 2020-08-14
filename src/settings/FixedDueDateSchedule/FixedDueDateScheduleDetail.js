import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  Accordion,
  Col,
  ExpandAllButton,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';

import SchedulesList from './components/DetailsSections/ScedulesList';

import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
  }

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.cViewMetaData = props.stripes.connect(ViewMetaData);
    this.state = {
      sections: {
        generalSection: true,
        fixedDueDateSchedule: true,
      },
    };
  }

  handleExpandAll = sections => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  };

  render() {
    const { initialValues: fixedDueDateSchedule } = this.props;
    const { sections } = this.state;

    return (
      <div id="date-test-fixed-due-date-schedule-detail">
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
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
            id="generalSection"
            open={sections.generalSection}
            label={<FormattedMessage id="ui-circulation.settings.fDDSform.about" />}
          >
            <section className={css.accordionSection}>
              {(fixedDueDateSchedule.metadata && fixedDueDateSchedule.metadata.createdDate) &&
                <this.cViewMetaData metadata={fixedDueDateSchedule.metadata} />}
              <Row>
                <Col xs={12}>
                  <KeyValue
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.name" />}
                    value={get(fixedDueDateSchedule, ['name'], <FormattedMessage id="ui-circulation.settings.fDDSform.untitled" />)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <KeyValue
                    label={<FormattedMessage id="ui-circulation.settings.fDDSform.description" />}
                    value={get(fixedDueDateSchedule, ['description'], '')}
                  />
                </Col>
              </Row>
            </section>
          </Accordion>
          <Accordion
            id="fixedDueDateSchedule"
            label={<FormattedMessage id="ui-circulation.settings.fDDSform.schedule" />}
            open={sections.fixedDueDateSchedule}
          >
            <section className={css.accordionSection}>
              <SchedulesList schedules={fixedDueDateSchedule.schedules} />
            </section>
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default FixedDueDateScheduleDetail;
