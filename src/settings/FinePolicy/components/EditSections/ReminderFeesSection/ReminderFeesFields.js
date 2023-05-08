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

// TODO: coming from the server?
const frequencyOptions = ['day(s)', 'week(s)'].map(option => ({
  label: option,
  value: option,
}));

// TODO: coming from the server?
const noticeMethodOptions = ['Email', 'Mail'].map(option => ({
  label: option,
  value: option,
}));

const ReminderFeesFields = props => {
  const { formatMessage } = useIntl();
  const {
    canAdd,
    canEdit,
    canDelete,
    templates,
  } = props;
  const sequenceLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.sequence' });
  const intervalLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.interval' });
  const frequencyLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.frequency' });
  const afterLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.after' });
  const feeLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.fee' });
  const noticeMethodLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.noticeMethod' });
  const noticeTemplateLabel = formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.noticeTemplate' });

  const templateOptions = templates.map(it => ({
    label: it.name,
    value: it.id,
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
      <Col sm={2}>
        <Label tagName="legend" required>
          {frequencyLabel}
        </Label>
      </Col>
      <Col sm={2}>
        <Label tagName="legend">
          {afterLabel}
        </Label>
      </Col>
      <Col sm={2}>
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
          rows={1}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={frequencyLabel}
          name={`${field}.frequency`}
          component={Select}
          dataOptions={frequencyOptions}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <FormattedMessage id={`ui-circulation.settings.finePolicy.reminderFees.${index ? 'previousReminder' : 'overdue'}`} />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={feeLabel}
          name={`${field}.fee`}
          component={TextField}
          rows={2}
          type="number"
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={noticeMethodLabel}
          name={`${field}.noticeMethod`}
          component={Select}
          dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.selectNoticeMethod' }), value: '' }, ...noticeMethodOptions]}
          disabled={!canEdit}
        />
      </Col>
      <Col sm={2}>
        <Field
          aria-label={noticeTemplateLabel}
          name={`${field}.noticeTemplate`}
          component={Select}
          dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.selectNoticeTemplate' }), value: '' }, ...templateOptions]}
          disabled={!canEdit}
        />
      </Col>
    </Row>
  );

  return (
    <FieldArray
      name="reminderFees"
      component={RepeatableField}
      addLabel={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.add" />}
      onAdd={fields => fields.push({
        interval: '',
        frequency: 'day(s)',
        fee: '',
        after: 'previousReminder',
        noticeMethod: '',
        noticeTemplate: '',
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
  templates: PropTypes.arrayOf(PropTypes.object),
};

ReminderFeesFields.defaultProps = {
  canAdd: true,
  canEdit: true,
  canDelete: true,
  templates: [],
};

export default ReminderFeesFields;
