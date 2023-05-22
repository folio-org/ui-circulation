import React from 'react';
import { keyBy } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import {
  Accordion,
  MultiColumnList,
  Col,
  Row,
} from '@folio/stripes/components';

import { timeUnits, noticeMethods, MAX_UNPAGED_RESOURCE_COUNT } from '../../../../../constants';

const visibleColumns = ['sequence', 'interval', 'timeUnitId', 'after', 'reminderFee', 'noticeMethodId', 'noticeTemplateId'];
const columnMapping = {
  sequence: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.sequence" />,
  interval: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.interval" />,
  timeUnitId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.frequency" />,
  after: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.after" />,
  reminderFee: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.fee" />,
  noticeMethodId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.noticeMethod" />,
  noticeTemplateId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.noticeTemplate" />,
};
const columnWidths = {
  sequence: '16%',
  interval: '14%',
  after: '12%',
  timeUnitId: '18%',
  reminderFee: '10%',
  noticeMethodId: '15%',
  noticeTemplateId: '15%',
};

const ReminderFeesSection = (props) => {
  const {
    policy,
    sectionOpen,
    resources,
  } = props;

  const { templates: { records } } = resources;
  const templatesById = keyBy(records, 'id');
  const timeUnitsByValue = keyBy(timeUnits, 'value');
  const noticeMethodsByValue = keyBy(noticeMethods, 'value');
  const resultFormatter = {
    sequence: (item) => (item.rowIndex + 1),
    after: (item) => <FormattedMessage id={`ui-circulation.settings.finePolicy.reminderFees.${item.rowIndex ? 'previousReminder' : 'overdue'}`} />,
    noticeTemplateId: (item) => templatesById[item.noticeTemplateId]?.name ?? '',
    noticeMethodId: (item) => <FormattedMessage id={noticeMethodsByValue[item.noticeMethodId]?.label} />,
    timeUnitId: (item) => <FormattedMessage id={timeUnitsByValue[item.timeUnitId]?.label} />,
  };

  const contentData = policy?.reminderFeesPolicy?.reminderSchedule ?? [];

  return (
    <div
      data-test-fine-policy-detail-reminder-fees
      data-testid="remiderFeesTestId"
    >
      <Accordion
        data-testid="viewFineSectionTestId"
        id="reminderFeesSection"
        label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.label" />}
        open={sectionOpen}
      >
        <Row>
          <Col xs={12}>
            <MultiColumnList
              contentData={contentData}
              formatter={resultFormatter}
              visibleColumns={visibleColumns}
              columnMapping={columnMapping}
              columnWidths={columnWidths}
            />
          </Col>
        </Row>
      </Accordion>
    </div>
  );
};

ReminderFeesSection.propTypes = {
  policy: PropTypes.object.isRequired,
  sectionOpen: PropTypes.bool.isRequired,
  resources: PropTypes.object,
};

ReminderFeesSection.manifest = {
  templates: {
    type: 'okapi',
    records: 'templates',
    path: 'templates',
    params: {
      query: 'category="AutomatedFeeFineAdjustment" sortby name',
      limit: MAX_UNPAGED_RESOURCE_COUNT,
    },
  },
};


export default stripesConnect(ReminderFeesSection);
