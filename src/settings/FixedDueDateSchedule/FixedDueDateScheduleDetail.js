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
        generalFixedDueDateScheduleDetail: true,
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
    const {
      initialValues: fixedDueDateSchedule,
      stripes: { timezone },
    } = this.props;
    const { sections } = this.state;

    return (
      <div id="date-test-fixed-due-date-schedule-detail">
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
              data-testid="expandAllButton"
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet
          data-testid="accordionSet"
          accordionStatus={sections}
          onToggle={this.handleSectionToggle}
        >
          <Accordion
            data-testid="generalFixedDueDateScheduleDetail"
            id="generalFixedDueDateScheduleDetail"
            open={sections.generalFixedDueDateScheduleDetail}
            label={<FormattedMessage id="ui-circulation.settings.fDDSform.about" />}
          >
            <section>
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
            data-testid="fixedDueDateSchedule"
            id="fixedDueDateSchedule"
            label={<FormattedMessage id="ui-circulation.settings.fDDSform.schedule" />}
            open={sections.fixedDueDateSchedule}
          >
            <section>
              <SchedulesList
                schedules={fixedDueDateSchedule.schedules}
                timezone={timezone}
              />
            </section>
          </Accordion>
        </AccordionSet>
      </div>
    );
  }
}

export default FixedDueDateScheduleDetail;
