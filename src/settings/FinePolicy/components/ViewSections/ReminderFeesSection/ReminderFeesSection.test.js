import { render } from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import ReminderFeesSection, { generateFormatter } from './ReminderFeesSection';

const getCheckboxValue = jest.fn(() => null);

describe('ReminderFeesSection', () => {
  it('renders reminder fees section', () => {
    const policy = {
      reminderFeesPolicy: {
        reminderSchedule: [],
      },
    };

    const { getByTestId } = render(
      <ReminderFeesSection
        getCheckboxValue={getCheckboxValue}
        policy={policy}
        sectionOpen
        blockTemplates={[]}
        noticeTemplates={[]}
      />
    );

    expect(getByTestId('reminderFeesTestId')).toBeInTheDocument();
  });

  describe('generateFormatter function', () => {
    const mockNoticeTemplatesById = {
      'template1': { name: 'Template 1' },
      'template2': { name: 'Template 2' },
    };

    const mockblockTemplateId = {
      'template3': { name: 'Template 3' },
      'template4': { name: 'Template 4' },
    };

    const mockItem = {
      rowIndex: 1,
      reminderFee: '10',
      noticeTemplateId: 'template1',
      blockTemplateId: 'template3',
      noticeMethodId: 'email',
      timeUnitId: 'day',
    };

    const formatter = generateFormatter(mockNoticeTemplatesById, mockblockTemplateId);

    it('should format sequence correctly', () => {
      expect(formatter.sequence(mockItem)).toEqual(2);
    });

    it('should format reminderFee correctly', () => {
      expect(formatter.reminderFee(mockItem)).toEqual('10.00');
    });

    it('should format reminderFee correctly when not present', () => {
      expect(formatter.reminderFee({ ...mockItem, reminderFee: null })).toEqual('0.00');
    });

    it('should format after with previous reminder message', () => {
      const { container } = render(<>{formatter.after(mockItem)}</>);
      expect(container).toHaveTextContent('ui-circulation.settings.finePolicy.reminderFees.previousReminder');
    });

    it('should format after with overdue reminder message', () => {
      const { container } = render(<>{formatter.after({ ...mockItem, rowIndex: 0 })}</>);
      expect(container).toHaveTextContent('ui-circulation.settings.finePolicy.reminderFees.overdue');
    });

    it('should format noticeTemplateId correctly', () => {
      expect(formatter.noticeTemplateId(mockItem)).toEqual('Template 1');
    });

    it('should format noticeTemplateId correctly when template is not present', () => {
      expect(formatter.noticeTemplateId({ ...mockItem, noticeTemplateId: null })).toEqual('');
    });

    it('should format blockTemplateId correctly', () => {
      expect(formatter.blockTemplateId(mockItem)).toEqual('Template 3');
    });

    it('should format blockTemplateId correctly when template is not present', () => {
      expect(formatter.blockTemplateId({ ...mockItem, blockTemplateId: null })).toEqual('');
    });

    it('should format noticeMethodId correctly', () => {
      const { container } = render(<>{formatter.noticeMethodId(mockItem)}</>);
      expect(container).toHaveTextContent('ui-circulation.settings.finePolicy.reminderFees.noticeMethods.email');
    });

    it('should format timeUnitId correctly', () => {
      const { container } = render(<>{formatter.timeUnitId(mockItem)}</>);
      expect(container).toHaveTextContent('ui-circulation.settings.finePolicy.reminderFees.timeUnit.days');
    });
  });
});
