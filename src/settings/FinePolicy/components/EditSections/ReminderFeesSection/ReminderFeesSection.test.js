import { render } from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import ReminderFeesSection from './ReminderFeesSection';

describe('ReminderFeesSection', () => {
  it('renders reminder fees section', () => {
    const policy = {
      reminderFeesPolicy: {
        reminderSchedule: [],
      },
    };

    const { getByTestId } = render(
      <ReminderFeesSection
        policy={policy}
        sectionOpen
        noticeTemplates={[]}
        blockTemplates={[]}
      />
    );

    expect(getByTestId('editReminderFeesTestId')).toBeInTheDocument();
  });
});
