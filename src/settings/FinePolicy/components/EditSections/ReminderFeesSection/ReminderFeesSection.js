import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Accordion } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import ReminderFeesFields from './ReminderFeesFields';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../../../../constants';

const ReminderFeesSection = ({ sectionOpen, resources }) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const { templates: { records } } = resources;

  return (
    <div data-test-fine-policy-form-overdue-fines-section>
      <Accordion
        id="editReminderFeesSection"
        open={sectionOpen}
        label={formatMessage({ id: 'ui-circulation.settings.finePolicy.reminderFees.label' })}
      >
        <section>
          <ReminderFeesFields templates={records} />
        </section>
      </Accordion>
    </div>
  );
};

ReminderFeesSection.propTypes = {
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
