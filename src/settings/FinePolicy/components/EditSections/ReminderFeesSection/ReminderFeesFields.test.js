import { render } from '@folio/jest-config-stripes/testing-library/react';

import { FieldArray } from 'react-final-form-arrays';

import ReminderFeesFields from './ReminderFeesFields';

describe('ReminderFeesFields', () => {
  afterEach(() => {
    FieldArray.mockClear();
  });

  beforeEach(() => {
    render(<ReminderFeesFields />);
  });

  it('should execute "FieldArray" with passed props', () => {
    const expectedProps = {
      name: 'reminderFeesPolicy.reminderSchedule'
    };

    expect(FieldArray).toHaveBeenLastCalledWith(expect.objectContaining(expectedProps), {});
  });
});
