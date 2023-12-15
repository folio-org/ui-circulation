import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';
import { isArray } from 'lodash';

import SchedulesList from './SchedulesList';
import ScheduleCard from '../ScheduleCard';

const testIds = {
  addScheduleButton: 'addScheduleButton',
  scheduleCard: 'scheduleCard',
  errorRow: 'errorRow',
};
const labelIds = {
  new: 'ui-circulation.settings.fDDSform.new',
};

jest.mock('../ScheduleCard', () => jest.fn(({
  onRemoveSchedule,
  scheduleIndex,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={testIds.scheduleCard}
    onClick={() => onRemoveSchedule(scheduleIndex)}
  />
)));

describe('SchedulesList', () => {
  const testTimeZone = 'UTC';
  const testFieldsNames = [
    'testSchedule1',
    'testSchedule2',
  ];
  const testFieldsValue = [];
  const testFields = {
    push: jest.fn(),
    remove: jest.fn(),
    map: (callback) => testFieldsNames.map(callback),
    value: testFieldsValue,
  };

  afterEach(() => {
    ScheduleCard.mockClear();
    testFields.push.mockClear();
    testFields.remove.mockClear();
  });

  const renderComponent = (testMeta = {}) => {
    render(
      <SchedulesList
        timezone={testTimeZone}
        fields={testFields}
        meta={testMeta}
      />
    );
  };

  describe(('add schedule button'), () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should render "add schedule" button', () => {
      expect(within(screen.getByTestId(testIds.addScheduleButton)).getByText(labelIds.new))
        .toBeVisible();
    });

    it('should add schedule', () => {
      const addScheduleButton = screen.getByTestId(testIds.addScheduleButton);

      fireEvent.click(addScheduleButton);

      expect(testFields.push).toHaveBeenCalledWith({});
    });
  });

  describe(('schedule cards'), () => {
    beforeEach(() => {
      renderComponent();
    });

    const generateTests = (testFieldName, cardOrder) => {
      describe((`schedule card with order ${cardOrder}`), () => {
        it('should render schedule card', () => {
          expect(ScheduleCard).toHaveBeenNthCalledWith(
            cardOrder + 1,
            expect.objectContaining({
              pathToSchedule: testFieldsNames[cardOrder],
              scheduleIndex: cardOrder,
              timezone: testTimeZone,
            }), {}
          );
        });

        it('should remove schedule', () => {
          const scheduleCard = screen.getAllByTestId(testIds.scheduleCard);

          fireEvent.click(scheduleCard[cardOrder]);

          expect(testFields.remove).toHaveBeenCalledWith(cardOrder);
        });
      });
    };

    testFieldsNames.forEach(generateTests);
  });

  describe('error row', () => {
    const generateTests = (testMeta) => {
      const { submitFailed, error } = testMeta;

      beforeEach(() => {
        renderComponent(testMeta);
      });

      if (submitFailed && error && !isArray(error)) {
        it('should render "error row" section', () => {
          expect(within(
            screen.getByTestId(testIds.errorRow)
          ).getByText(error)).toBeVisible();
        });
      } else {
        it('should not render "error row" section', () => {
          expect(screen.queryByTestId(testIds.errorRow)).not.toBeInTheDocument();
        });
      }
    };

    const testErrors = (submitFailed) => {
      [{
        describeTitle: 'and there are no errors',
      }, {
        describeTitle: 'and there is one error',
        error: 'testErrorText',
      }, {
        describeTitle: 'and there are multiple errors',
        error: [
          'testError1Text',
          'testError2Text',
        ],
      }].forEach(({ error, describeTitle }) => {
        describe(describeTitle, () => generateTests({
          submitFailed,
          error,
        }));
      });
    };

    [{
      describeTitle: 'when form is not submitted or submitted successfully',
      submitFailed: false,
    }, {
      describeTitle: 'when form submit failed',
      submitFailed: true,
    }].forEach(({ describeTitle, submitFailed }) => {
      describe(describeTitle, () => {
        testErrors(submitFailed);
      });
    });
  });
});
