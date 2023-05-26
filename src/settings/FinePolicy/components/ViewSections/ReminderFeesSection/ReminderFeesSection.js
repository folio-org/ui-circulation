import { keyBy } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  MultiColumnList,
  Col,
  Row,
} from '@folio/stripes/components';

import { timeUnits, noticeMethods } from '../../../../../constants';

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
  sequence: '80px',
  interval: '80px',
  timeUnitId: '80px',
  after: '80px'
};

const ReminderFeesSection = (props) => {
  const {
    policy,
    sectionOpen,
    templates,
  } = props;
  const templatesById = keyBy(templates, 'id');
  const timeUnitsByValue = keyBy(timeUnits, 'value');
  const noticeMethodsByValue = keyBy(noticeMethods, 'value');
  const resultFormatter = {
    sequence: (item) => (item.rowIndex + 1),
    reminderFee: (item) => parseFloat(item?.reminderFee || 0).toFixed(2),
    after: (item) => <FormattedMessage id={`ui-circulation.settings.finePolicy.reminderFees.${item.rowIndex ? 'previousReminder' : 'overdue'}`} />,
    noticeTemplateId: (item) => templatesById[item.noticeTemplateId]?.name ?? '',
    noticeMethodId: (item) => <FormattedMessage id={noticeMethodsByValue[item.noticeMethodId]?.label} />,
    timeUnitId: (item) => <FormattedMessage id={timeUnitsByValue[item.timeUnitId]?.label} />,
  };
  const contentData = policy?.reminderFeesPolicy?.reminderSchedule ?? [];

  return (
    <Accordion
      data-testid="reminderFeesTestId"
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
  );
};

ReminderFeesSection.propTypes = {
  policy: PropTypes.object.isRequired,
  sectionOpen: PropTypes.bool.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object),
};

export default ReminderFeesSection;
