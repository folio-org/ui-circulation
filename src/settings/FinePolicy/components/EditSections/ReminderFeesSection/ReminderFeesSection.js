import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  Select,
} from '@folio/stripes/components';

import ReminderFeesFields from './ReminderFeesFields';
import { yesNoOptions } from '../../../../../constants';

const ReminderFeesSection = ({ sectionOpen, noticeTemplates, blockTemplates }) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const dataOptions = yesNoOptions.map(({ label, value }) => ({
    label: formatMessage({ id: label }),
    value,
  }));

  return (
    <div data-test-reminder-fees-section>
      <Accordion
        data-testid="editReminderFeesTestId"
        open={sectionOpen}
        label={formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.label' })}
      >
        <Row>
          <Col xs={3}>
            <Field
              data-testid="countClosedTestId"
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.countClosed" />}
              name="reminderFeesPolicy.countClosed"
              autoFocus
              component={Select}
              dataOptions={dataOptions}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              data-testid="ignoreGracePeriodRecallTestId"
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.ignoreGracePeriodRecall" />}
              name="reminderFeesPolicy.ignoreGracePeriodRecall"
              component={Select}
              disabled
              dataOptions={dataOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              data-testid="ignoreGracePeriodHoldsTestId"
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.ignoreGracePeriodHolds" />}
              name="reminderFeesPolicy.ignoreGracePeriodHolds"
              component={Select}
              disabled
              dataOptions={dataOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              data-testid="allowRenewalOfItemsWithReminderFeesTestId"
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.allowRenewalOfItemsWithReminderFees" />}
              name="reminderFeesPolicy.allowRenewalOfItemsWithReminderFees"
              component={Select}
              dataOptions={dataOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              data-testid="clearPatronBlockWhenPaidTestId"
              label={<FormattedMessage id="ui-circulation.settings.finePolicy.reminderFees.clearPatronBlockWhenPaid" />}
              name="reminderFeesPolicy.clearPatronBlockWhenPaid"
              component={Select}
              disabled
              dataOptions={dataOptions}
            />
          </Col>
        </Row>
        <ReminderFeesFields
          noticeTemplates={noticeTemplates}
          blockTemplates={blockTemplates}
        />
      </Accordion>
    </div>
  );
};

ReminderFeesSection.propTypes = {
  sectionOpen: PropTypes.bool.isRequired,
  noticeTemplates: PropTypes.arrayOf(PropTypes.object),
  blockTemplates: PropTypes.arrayOf(PropTypes.object),
};

export default ReminderFeesSection;
