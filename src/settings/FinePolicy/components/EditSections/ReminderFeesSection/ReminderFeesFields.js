import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  RepeatableField,
  TextField,
  Select,
  Row,
  Col,
  Label,
} from '@folio/stripes/components';

import { timeUnits, noticeMethods } from '../../../../../constants';

const ReminderFeesFields = props => {
  const { formatMessage } = useIntl();
  const {
    canAdd,
    canEdit,
    canDelete,
    noticeTemplates,
    blockTemplates,
  } = props;
  const sequenceLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.sequence' });
  const intervalLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.interval' });
  const frequencyLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.frequency' });
  const afterLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.after' });
  const feeLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.fee' });
  const noticeMethodLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.noticeMethod' });
  const noticeTemplateLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.noticeTemplate' });
  const blockTemplateLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.blockTemplate' });

  const noticeTemplateOptions = noticeTemplates.map(it => ({
    label: it.name,
    value: it.id,
  }));

  const blockTemplateOptions = blockTemplates.map(it => ({
    label: it.name,
    value: it.id,
  }));

  const timeUnitsOptions = timeUnits.map(({ label, value }) => ({
    label: formatMessage({ id: label }),
    value,
  }));

  const noticeMethodsOptions = noticeMethods.map(({ label, value }) => ({
    label: formatMessage({ id: label }),
    value,
  }));

  const headLabels = (
    <Row>
      <Col sm={1}>
        <Label tagName="legend">
          {sequenceLabel}
        </Label>
      </Col>
      <Col sm={1}>
        <Label tagName="legend" required>
          {intervalLabel}
        </Label>
      </Col>
      <Col sm={1}>
        <Label tagName="legend" required>
          {frequencyLabel}
        </Label>
      </Col>
      <Col sm={2}>
        <Label tagName="legend">
          {afterLabel}
        </Label>
      </Col>
      <Col sm={1}>
        <Label tagName="legend" required>
          {feeLabel}
        </Label>
      </Col>
      <Col sm={2}>
        <Label tagName="legend" required>
          {noticeMethodLabel}
        </Label>
      </Col>
      <Col sm={2}>
        <Label tagName="legend" required>
          {noticeTemplateLabel}
        </Label>
      </Col>
      <Col sm={2}>
        <Label tagName="legend" required>
          {blockTemplateLabel}
        </Label>
      </Col>
    </Row>
  );

  const renderField = (field, index) => (
    <Row>
      <Col sm={1}>
        {index + 1}
      </Col>
      <Col sm={1}>
        <Field
          aria-label={intervalLabel}
          name={`${field}.interval`}
          component={TextField}
          type="number"
          disabled={!canEdit}
        />
      </Col>
      <Col sm={1}>
        <Field
          aria-label={frequencyLabel}
          name={`${field}.timeUnitId`}
          component={Select}
          dataOptions={timeUnitsOptions}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <FormattedMessage id={`ui-circulation.settings.finePolicy.reminderFees.${index ? 'previousReminder' : 'overdue'}`} />
      </Col>
      <Col sm={1}>
        <Field
          aria-label={feeLabel}
          name={`${field}.reminderFee`}
          component={TextField}
          type="number"
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={noticeMethodLabel}
          name={`${field}.noticeFormat`}
          component={Select}
          dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.selectNoticeMethod' }), value: '' }, ...noticeMethodsOptions]}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={noticeTemplateLabel}
          name={`${field}.noticeTemplateId`}
          component={Select}
          dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.selectNoticeTemplate' }), value: '' }, ...noticeTemplateOptions]}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={blockTemplateLabel}
          name={`${field}.blockTemplateId`}
          component={Select}
          dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.selectBlockTemplate' }), value: '' }, ...blockTemplateOptions]}
          disabled={!canEdit}
        />
      </Col>
    </Row>
  );

  return (
    <FieldArray
      name="reminderFeesPolicy.reminderSchedule"
      component={RepeatableField}
      addLabel={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.add" />}
      onAdd={fields => fields.push({
        interval: null,
        timeUnitId: 'day',
        reminderFee: null,
        noticeFormat: '',
        noticeTemplateId: '',
      })}
      headLabels={headLabels}
      renderField={renderField}
      canAdd={canAdd}
      canRemove={canDelete}
    />
  );
};

ReminderFeesFields.propTypes = {
  canAdd: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  noticeTemplates: PropTypes.arrayOf(PropTypes.object),
  blockTemplates: PropTypes.arrayOf(PropTypes.object),
};

ReminderFeesFields.defaultProps = {
  canAdd: true,
  canEdit: true,
  canDelete: true,
  noticeTemplates: [],
  blockTemplates: [],
};

export default ReminderFeesFields;
