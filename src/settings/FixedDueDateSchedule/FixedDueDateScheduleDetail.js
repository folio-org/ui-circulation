import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  Accordion,
  AccordionStatus,
  Col,
  ExpandAllButton,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { stripesShape } from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';

import SchedulesList from './components/DetailsSections/ScedulesList';

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
  }

  render() {
    const {
      initialValues: fixedDueDateSchedule,
      stripes: { timezone },
    } = this.props;

    return (
      <div id="date-test-fixed-due-date-schedule-detail">
        <AccordionStatus>
          <Row end="xs">
            <Col xs>
              <ExpandAllButton data-testid="expandAllButton" />
            </Col>
          </Row>
          <AccordionSet data-testid="accordionSet">
            <Accordion
              data-testid="generalFixedDueDateScheduleDetail"
              id="generalFixedDueDateScheduleDetail"
              label={<FormattedMessage id="ui-circulation.settings.fDDSform.about" />}
            >
              <section>
                {
                  fixedDueDateSchedule?.metadata?.createdDate &&
                    <AccordionSet>
                      <this.cViewMetaData metadata={fixedDueDateSchedule.metadata} />
                    </AccordionSet>
                }
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
            >
              <section>
                <SchedulesList
                  schedules={fixedDueDateSchedule.schedules}
                  timezone={timezone}
                />
              </section>
            </Accordion>
          </AccordionSet>
        </AccordionStatus>
      </div>
    );
  }
}

export default FixedDueDateScheduleDetail;
