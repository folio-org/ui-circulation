import { keyBy } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  MultiColumnList,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

import { timeUnits, noticeMethods } from '../../../../../constants';

const visibleColumns = ['sequence', 'interval', 'timeUnitId', 'after', 'reminderFee', 'noticeFormat', 'noticeTemplateId', 'blockTemplateId'];
const columnMapping = {
  sequence: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.sequence" />,
  interval: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.interval" />,
  timeUnitId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.frequency" />,
  after: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.after" />,
  reminderFee: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.fee" />,
  noticeFormat: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.noticeMethod" />,
  noticeTemplateId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.noticeTemplate" />,
  blockTemplateId: <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.blockTemplate" />,
};
const columnWidths = {
  sequence: '80px',
  interval: '80px',
  timeUnitId: '80px',
  after: '80px'
};
const timeUnitsByValue = keyBy(timeUnits, 'value');
const noticeMethodsByValue = keyBy(noticeMethods, 'value');

export const generateFormatter = (noticeTemplatesById) => {
  return {
    sequence: (item) => (item.rowIndex + 1),
    reminderFee: (item) => parseFloat(item?.reminderFee || 0).toFixed(2),
    after: (item) => <FormattedMessage id={`ui-circulation.settings.finePolicy.reminderFees.${item.rowIndex ? 'previousReminder' : 'overdue'}`} />,
    noticeTemplateId: (item) => noticeTemplatesById[item.noticeTemplateId]?.name ?? '',
    blockTemplateId: () => <FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.noBlock" />,
    noticeFormat: (item) => (noticeMethodsByValue[item.noticeFormat]?.label ? <FormattedMessage id={noticeMethodsByValue[item.noticeFormat]?.label} /> : ''),
    timeUnitId: (item) => <FormattedMessage id={timeUnitsByValue[item.timeUnitId]?.label} />,
  };
};

const ReminderFeesSection = (props) => {
  const {
    policy,
    noticeTemplates,
    getCheckboxValue,
  } = props;
  const {
    countClosed,
    ignoreGracePeriodRecall,
    ignoreGracePeriodHolds,
    allowRenewalOfItemsWithReminderFees,
    clearPatronBlockWhenPaid,
    reminderSchedule,
  } = policy;
  const noticeTemplatesById = keyBy(noticeTemplates, 'id');
  const resultFormatter = generateFormatter(noticeTemplatesById);

  return (
    <Accordion
      data-testid="reminderFeesTestId"
      id="reminderFeesSection"
      label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.label" />}
    >
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.countClosed" />}
            value={getCheckboxValue(countClosed)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.ignoreGracePeriodRecall" />}
            value={getCheckboxValue(ignoreGracePeriodRecall)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.ignoreGracePeriodHolds" />}
            value={getCheckboxValue(ignoreGracePeriodHolds)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.allowRenewalOfItemsWithReminderFees" />}
            value={getCheckboxValue(allowRenewalOfItemsWithReminderFees)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.clearPatronBlockWhenPaid" />}
            value={getCheckboxValue(clearPatronBlockWhenPaid)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MultiColumnList
            contentData={reminderSchedule}
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
  policy: PropTypes.shape({
    allowRenewalOfItemsWithReminderFees: PropTypes.bool,
    clearPatronBlockWhenPaid: PropTypes.bool,
    countClosed: PropTypes.bool,
    ignoreGracePeriodHolds: PropTypes.bool,
    ignoreGracePeriodRecall: PropTypes.bool,
    reminderSchedule: PropTypes.arrayOf(PropTypes.shape({
      interval: PropTypes.number,
      reminderFee: PropTypes.number,
      noticeFormat: PropTypes.string,
    })),
  }).isRequired,
  noticeTemplates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  getCheckboxValue: PropTypes.func.isRequired,
};

export default ReminderFeesSection;
