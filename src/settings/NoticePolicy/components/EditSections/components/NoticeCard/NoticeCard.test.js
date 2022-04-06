import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  IconButton,
  MessageBanner,
  Select,
  RadioButton,
} from '@folio/stripes/components';

import NoticeCard from './NoticeCard';
import Period from '../../../../../components/Period';

import {
  noticesFormats,
  noticesFrequency,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import { componentPropsCheck } from '../../../../../../../test/jest/helpers';

jest.mock('../../../../../utils/options-generator', () => jest.fn((func, data) => data));
jest.mock('../../../../utils/notice-description', () => jest.fn(data => data));
jest.mock('../../../../../components/Period', () => jest.fn(({ 'data-testid': testId }) => (
  <div data-testid={testId} />
)));

IconButton.mockImplementation(({ icon, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    onClick={onClick}
  >
    {`iconButton-${icon}`}
  </div>
));
Field.mockImplementation(({ 'data-testid': testId, label }) => (
  <div data-testid={testId}>
    {label}
  </div>
));

describe('NoticeCard', () => {
  const labelIds = {
    blankPlaceholder: 'ui-circulation.settings.common.blankPlaceholder',
    countableNotice: 'ui-circulation.settings.noticePolicy.countableNotice',
    template: 'ui-circulation.settings.noticePolicy.notices.template',
    via: 'ui-circulation.settings.noticePolicy.notices.via',
    format: 'ui-circulation.settings.noticePolicy.notices.format',
    triggeringEvent: 'ui-circulation.settings.noticePolicy.notices.triggeringEvent',
    send: 'ui-circulation.settings.noticePolicy.notices.send',
    by: 'ui-circulation.settings.noticePolicy.notices.by',
    frequency: 'ui-circulation.settings.noticePolicy.notices.frequency',
    andEvery: 'ui-circulation.settings.noticePolicy.notices.andEvery',
    longTerm: 'ui-circulation.settings.noticePolicy.notices.send.longTerm',
    shortTerm: 'ui-circulation.settings.noticePolicy.notices.send.shortTerm',
    deleteButton: 'iconButton-trash',
    testNotificationKeyId: 'testNotificationKeyId',
  };
  const testIds = {
    templateSelect: 'templateSelect',
    formatSelect: 'formatSelect',
    triggeringEventSelect: 'triggeringEventSelect',
    sendSelect: 'sendSelect',
    sendByPeriod: 'sendByPeriod',
    frequencySelect: 'frequencySelect',
    andEveryPeriod: 'andEveryPeriod',
    longTermRadioButton: 'longTermRadioButton',
    shortTermRadioButton: 'shortTermRadioButton',
  };
  const sendOptions = {
    sendWhen: labelIds.testNotificationKeyId,
    isSendOptionsAvailable: jest.fn(() => true),
    isBeforeOrAfter: jest.fn(() => true),
    isFrequencyAvailable: jest.fn(() => true),
    isLoanDueDateTimeSelected: jest.fn(() => true),
  };
  const notice = {
    sendOptions,
    isRecurring: jest.fn(() => true),
  };
  const noticeIndex = 1;
  const pathToNotice = 'pathToNotice';
  const sendEvents = [{
    value: 'testSendEventsValue',
    label: 'testSendEventsLabel',
  }];
  const sendEventTriggeringIds = [
    'firstEventId',
    'secondEventId',
  ];
  const templates = [{
    value: 'testTemplatesValue',
    label: 'testTemplatesLabel',
  }];
  const triggeringEvents = [{
    value: 'testTriggeringEventsValue',
    label: 'testTriggeringEventsLabel',
  }];
  const onRemoveNotice = jest.fn();
  const defaultProps = {
    notice,
    noticeIndex,
    pathToNotice,
    sendEvents,
    sendEventTriggeringIds,
    templates,
    triggeringEvents,
    onRemoveNotice,
  };

  afterEach(() => {
    onRemoveNotice.mockClear();
    Field.mockClear();
    MessageBanner.mockClear();
  });

  describe('when "notice" methods returns true', () => {
    beforeEach(() => {
      render(
        <NoticeCard
          {...defaultProps}
        />
      );
    });

    it('should render heading', () => {
      expect(screen.getByText(labelIds.countableNotice)).toBeVisible();
    });

    it('should render button for notice deleting', () => {
      expect(screen.getByText(labelIds.deleteButton));
    });

    it('should execute correct method on delete button click', () => {
      expect(onRemoveNotice).not.toBeCalled();

      fireEvent.click(screen.getByText(labelIds.deleteButton));

      expect(onRemoveNotice).toBeCalledWith(noticeIndex);
    });

    it('should render templateSelect "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.templateSelect, {
        name: `${pathToNotice}.templateId`,
        label: labelIds.template,
        required: true,
        component: Select,
        dataOptions: templates,
        placeholder: labelIds.blankPlaceholder,
      });
    });

    it('should render "via"', () => {
      expect(screen.getByText(labelIds.via)).toBeVisible();
    });

    it('should render formatSelect "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.formatSelect, {
        name: `${pathToNotice}.format`,
        label: labelIds.format,
        required: true,
        component: Select,
        placeholder: labelIds.blankPlaceholder,
        children: noticesFormats,
      });
    });

    it('should render triggeringEventSelect "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.triggeringEventSelect, {
        name: `${pathToNotice}.sendOptions.sendWhen`,
        label: labelIds.triggeringEvent,
        required: true,
        component: Select,
        placeholder: labelIds.blankPlaceholder,
        children: triggeringEvents,
      });
    });

    it('should render "Send" section label', () => {
      expect(screen.getByText(labelIds.send)).toBeVisible();
    });

    it('should render sendSelect "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.sendSelect, {
        name: `${pathToNotice}.sendOptions.sendHow`,
        component: Select,
        placeholder: labelIds.blankPlaceholder,
        children: sendEvents,
      });
    });

    it('should render "by" delimiter', () => {
      expect(screen.getByText(labelIds.by)).toBeVisible();
    });

    it('should render sendByPeriod "Period" with correct props', () => {
      componentPropsCheck(Period, testIds.sendByPeriod, {
        inputSize: 6,
        selectSize: 6,
        inputPlaceholder: 1,
        selectPlaceholder: labelIds.blankPlaceholder,
        inputValuePath: `${pathToNotice}.sendOptions.sendBy.duration`,
        selectValuePath: `${pathToNotice}.sendOptions.sendBy.intervalId`,
        intervalPeriods: noticesIntervalPeriods,
      });
    });

    it('should render "frequency" label', () => {
      expect(screen.getByText(labelIds.frequency)).toBeVisible();
    });

    it('should render frequencySelect "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.frequencySelect, {
        name: `${pathToNotice}.frequency`,
        component: Select,
        placeholder: labelIds.blankPlaceholder,
        children: noticesFrequency,
      });
    });

    it('should render "andEvery" delimiter', () => {
      expect(screen.getByText(labelIds.andEvery)).toBeVisible();
    });

    it('should render andEveryPeriod "Period" with correct props', () => {
      componentPropsCheck(Period, testIds.andEveryPeriod, {
        inputSize: 6,
        selectSize: 6,
        inputPlaceholder: 1,
        selectPlaceholder: labelIds.blankPlaceholder,
        inputValuePath: `${pathToNotice}.sendOptions.sendEvery.duration`,
        selectValuePath: `${pathToNotice}.sendOptions.sendEvery.intervalId`,
        intervalPeriods: noticesIntervalPeriods,
      });
    });

    it('should render longTermRadioButton "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.longTermRadioButton, {
        name: `${pathToNotice}.realTime`,
        component: RadioButton,
        type: 'radio',
        label: labelIds.longTerm,
        value: 'false',
      });
    });

    it('should render shortTermRadioButton "Field" with correct props', () => {
      componentPropsCheck(Field, testIds.shortTermRadioButton, {
        name: `${pathToNotice}.realTime`,
        component: RadioButton,
        type: 'radio',
        label: labelIds.shortTerm,
        value: 'true',
      });
    });

    it('should render warning message when "notificationKey" is present', () => {
      expect(MessageBanner).toHaveBeenCalledWith(expect.objectContaining({
        type: 'warning',
      }), {});
      expect(screen.getByText(labelIds.testNotificationKeyId)).toBeVisible();
    });
  });

  describe('when some "notice" methods or values returns false', () => {
    const renderComponent = (newNotice) => {
      render(
        <NoticeCard
          {...defaultProps}
          notice={newNotice}
        />
      );
    };
    const createNewNotice = (key, value) => ({
      ...notice,
      sendOptions: {
        ...sendOptions,
        [key]: value || jest.fn(() => false),
      },
    });

    describe('when "isSendOptionsAvailable" returns false', () => {
      beforeEach(() => {
        renderComponent(createNewNotice('isSendOptionsAvailable'));
      });

      it('should not render "sendSelect" section with label', () => {
        expect(screen.queryByText(labelIds.send)).not.toBeInTheDocument();
        expect(screen.queryByTestId(testIds.sendSelect)).not.toBeInTheDocument();
      });

      it('should not render "by" delimiter', () => {
        expect(screen.queryByText(labelIds.by)).not.toBeInTheDocument();
      });

      it('should not render "sendByPeriod" Period', () => {
        expect(screen.queryByTestId(testIds.sendByPeriod)).not.toBeInTheDocument();
      });

      it('should not render "frequencySelect" section with label', () => {
        expect(screen.queryByText(labelIds.frequency)).not.toBeInTheDocument();
        expect(screen.queryByTestId(testIds.frequencySelect)).not.toBeInTheDocument();
      });

      it('should not render "and every" delimiter', () => {
        expect(screen.queryByText(labelIds.andEvery)).not.toBeInTheDocument();
      });

      it('should not render "andEveryPeriod" Period', () => {
        expect(screen.queryByTestId(testIds.andEveryPeriod)).not.toBeInTheDocument();
      });
    });

    describe('when "isBeforeOrAfter" returns false', () => {
      beforeEach(() => {
        renderComponent(createNewNotice('isBeforeOrAfter'));
      });

      it('should not render "by" delimiter', () => {
        expect(screen.queryByText(labelIds.by)).not.toBeInTheDocument();
      });

      it('should not render "sendByPeriod" Period', () => {
        expect(screen.queryByTestId(testIds.sendByPeriod)).not.toBeInTheDocument();
      });
    });

    describe('when "isFrequencyAvailable" returns false', () => {
      beforeEach(() => {
        renderComponent(createNewNotice('isFrequencyAvailable'));
      });

      it('should not render "frequencySelect" section with label', () => {
        expect(screen.queryByText(labelIds.frequency)).not.toBeInTheDocument();
        expect(screen.queryByTestId(testIds.frequencySelect)).not.toBeInTheDocument();
      });

      it('should not render "and every" delimiter', () => {
        expect(screen.queryByText(labelIds.andEvery)).not.toBeInTheDocument();
      });

      it('should not render "andEveryPeriod" Period', () => {
        expect(screen.queryByTestId(testIds.andEveryPeriod)).not.toBeInTheDocument();
      });
    });

    describe('when "isLoanDueDateTimeSelected" returns false', () => {
      beforeEach(() => {
        renderComponent(createNewNotice('isLoanDueDateTimeSelected'));
      });

      it('should not render longTermRadioButton "Field"', () => {
        expect(screen.queryByTestId(testIds.longTermRadioButton)).not.toBeInTheDocument();
      });

      it('should not render shortTermRadioButton "Field"', () => {
        expect(screen.queryByTestId(testIds.shortTermRadioButton)).not.toBeInTheDocument();
      });
    });

    describe('when notice have empty "sendWhen" value', () => {
      it('should not render "MessageBanner"', () => {
        renderComponent(createNewNotice('sendWhen', []));

        expect(MessageBanner).not.toHaveBeenCalled();
      });
    });

    describe('when "isRecurring" return false', () => {
      const newNotice = {
        ...notice,
        isRecurring: jest.fn(() => false),
      };

      beforeEach(() => {
        renderComponent(newNotice);
      });

      it('should not render "and every" delimiter', () => {
        expect(screen.queryByText(labelIds.andEvery)).not.toBeInTheDocument();
      });

      it('should not render "andEveryPeriod" Period', () => {
        expect(screen.queryByTestId(testIds.andEveryPeriod)).not.toBeInTheDocument();
      });
    });
  });
});
