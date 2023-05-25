import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Accordion } from '@folio/stripes/components';

import ReminderFeesFields from './ReminderFeesFields';

const ReminderFeesSection = ({ sectionOpen, templates }) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  return (
    <div data-test-reminder-fees-section>
      <Accordion
        id="editReminderFeesSection"
        open={sectionOpen}
        label={formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.label' })}
      >
        <section>
          <ReminderFeesFields templates={templates} />
        </section>
      </Accordion>
    </div>
  );
};

ReminderFeesSection.propTypes = {
  sectionOpen: PropTypes.bool.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object),
};

export default ReminderFeesSection;
