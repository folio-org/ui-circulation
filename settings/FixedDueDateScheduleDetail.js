import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedDate } from 'react-intl';

import { Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';
import css from './FixedDueDateSchedule.css';

class FixedDueDateScheduleDetail extends React.Component{
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
  }
  constructor(props){
    super(props);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.state ={
      sections:{
        fixedDueDateSchedule:true,
      },
    };
  }
  handleExpandAll(sections) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render(){
    const fixedDueDateSchedule = this.props.initialValues;
    const formatDate = this.props.stripes.formatDate;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { sections } = this.state;
    
    const renderSchedules = fixedDueDateSchedule.schedules.map((schedule, index) => (
        <div key={ index } className={css.scheduleItem}>
          <div className={css.sceduleHeader} >
            <h4> 
              <FormattedMessage id="ui-circulation.settings.fDDSform.dateRange" /> { index +1 }
            </h4>
          </div>
          <div className={css.scheduleItemContent}>
            <Row key={ index + 1}>
              <Col xs={4}>
                  <FormattedMessage id="ui-circulation.settings.fDDSform.dateFrom" />
              </Col>
              <Col xs={4}>
                  <FormattedMessage id="ui-circulation.settings.fDDSform.dateTo" />
              </Col>
              <Col xs={4}>
                  <FormattedMessage id="ui-circulation.settings.fDDSform.dueDate" />
              </Col>
            </Row>
            <Row key={ index + 2}>
              <Col xs={4}><FormattedDate value={schedule.from} /></Col>
              <Col xs={4}><FormattedDate value={schedule.to} /></Col>
              <Col xs={4}><FormattedDate value={schedule.due} /></Col>
            </Row>
          </div>
        </div>
    ));
    
  return (
    <div>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <div className={css.headerArea}>General information</div>
          <section className={css.accordianSection}>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMsg({ id: 'ui-circulation.settings.fDDSform.name' })}
                  value={_.get(fixedDueDateSchedule, ['name'], formatMsg({ id: 'ui-circulation.settings.fDDSform.untitled' }))}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMsg({ id: 'ui-circulation.settings.fDDSform.description' })}
                  value={_.get(fixedDueDateSchedule, ['description'], '')}
                />
              </Col>
            </Row>
            </section>
        <Accordion
          open={sections.fixedDueDateSchedule}
          id="fixedDueDateSchedule"
          onToggle={this.handleSectionToggle}
          label="Schedule"
        >
            <section className={css.accordianSection}>
              {renderSchedules}
            </section>
      </Accordion>
    </div>
  );
 }
}

export default FixedDueDateScheduleDetail;
