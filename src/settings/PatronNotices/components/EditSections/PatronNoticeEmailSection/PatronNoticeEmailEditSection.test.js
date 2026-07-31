import { Field, useField } from 'react-final-form';

import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';
import {
  TextField,
  Row,
  Col,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import { componentPropsCheck } from '../../../../../../test/jest/helpers';
import PatronNoticeEmailSection from './PatronNoticeEmailSection';
import TokensList from '../../../TokensList';
import getTokens from '../../../tokens';
import { NOTICE_FORMATS } from '../../../../../constants';

const mockGetTokensReturnValue = 'getTokensReturnValue';
let mockNoticeFormatValue = '';
let mockHeaderValue = '';
let mockBodyValue = '';

const mockFieldValues = () => ({
  'additionalProperties.noticeFormat': mockNoticeFormatValue,
  'localizedTemplates.en.header': mockHeaderValue,
  'localizedTemplates.en.body': mockBodyValue,
});

jest.mock('../../../tokens', () => jest.fn(() => mockGetTokensReturnValue));
jest.mock('../../../TokensList', () => jest.fn(() => null));
jest.mock('@folio/stripes-template-editor', () => ({
  TemplateEditor: jest.fn(() => null),
}));
jest.mock('react-final-form', () => ({
  Field: jest.fn(({
    label,
    component,
    'data-testid': testId,
    ...rest
  }) => (
    <div
      data-testid={testId}
      {...rest}
    >
      {label}
      {typeof component === 'function' && component()}
      {typeof rest.children === 'function' && rest.children({
        input: {
          name: rest.name,
          value: '',
          onChange: jest.fn(),
        },
        meta: {},
      })}
    </div>
  )),
  useField: jest.fn((name) => ({
    input: {
      name,
      value: mockFieldValues()[name] ?? '',
      onChange: jest.fn(),
    },
  })),
}));

const getFieldProps = (testId) => Field.mock.calls
  .slice()
  .reverse()
  .find((item) => item?.[0]?.['data-testid'] === testId)?.[0];

const getFieldOnChange = (fieldName) => {
  let index = -1;

  for (let i = useField.mock.calls.length - 1; i >= 0; i -= 1) {
    if (useField.mock.calls[i][0] === fieldName) {
      index = i;
      break;
    }
  }

  return useField.mock.results[index].value.input.onChange;
};

const renderPatronNoticeEmailSection = (props) => render(
  <PatronNoticeEmailSection
    category="testCategory"
    locale="en"
    initialValues={{}}
    {...props}
  />
);

describe('PatronNoticeEmailEditSection', () => {
  const categoryValue = 'testCategory';
  const testIds = {
    patronNoticeAccordion: 'patronNoticeAccordion',
    patronNoticesSubject: 'patronNoticesSubject',
    patronNoticesBody: 'patronNoticesBody',
  };
  const labelIds = {
    patronNoticesSubject: 'ui-circulation.settings.patronNotices.subject',
    patronNoticesBody: 'ui-circulation.settings.patronNotices.body',
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    mockNoticeFormatValue = '';
    mockHeaderValue = '';
    mockBodyValue = '';
    Row.mockClear();
    Col.mockClear();
    Field.mockClear();
    TextField.mockClear();
    useField.mockClear();
    getTokens.mockClear();
  });

  describe('when no notice format is selected', () => {
    beforeEach(() => {
      mockNoticeFormatValue = '';
      renderPatronNoticeEmailSection();
    });

    it('should render component', () => {
      expect(screen.getByTestId(testIds.patronNoticeAccordion)).toBeVisible();
    });

    it('should render "Subject" label', () => {
      const call = TextField.mock.calls
        .reverse()
        .find((item) => item?.[0]?.['data-testid'] === testIds.patronNoticesSubject);
      const label = call[0].label;

      expect(label.props.children[0].props.id).toBe(labelIds.patronNoticesSubject);
      expect(label.props.children[1].props.content.props.id)
        .toBe('ui-circulation.settings.patronNotices.subject.infoPopover');
    });

    it('should trigger TextField component for notice subject with correct props', () => {
      componentPropsCheck(TextField, testIds.patronNoticesSubject, {
        id: 'input-patron-notice-subject',
        name: 'localizedTemplates.en.header',
        required: false,
        disabled: true,
        meta: { dirty: false },
      }, true);
    });

    it('should render "Body" label', () => {
      expect(getItemByTestId(testIds.patronNoticesBody).getByText(labelIds.patronNoticesBody)).toBeVisible();
    });

    it('should trigger Field component for patron notices body with correct props', () => {
      componentPropsCheck(Field, testIds.patronNoticesBody, {
        'data-testid': 'patronNoticesBody',
        disabled: true,
        required: false,
        name: 'localizedTemplates.en.body',
        id: 'input-email-template-body',
        component: TemplateEditor,
        tokens: mockGetTokensReturnValue,
        tokensList: TokensList,
        selectedCategory: categoryValue,
        validateFields: [],
        plainText: false,
        rows: 6,
      }, true);
    });

    it('should call getTokens with images enabled', () => {
      expect(getTokens).toHaveBeenCalledWith('en', { disableImages: false });
    });
  });

  describe('when notice format is text message', () => {
    beforeEach(() => {
      mockNoticeFormatValue = NOTICE_FORMATS.TEXT_MESSAGE;
      renderPatronNoticeEmailSection();
    });

    it('should trigger Field component for patron notices body with plainText enabled', () => {
      componentPropsCheck(Field, testIds.patronNoticesBody, {
        component: TemplateEditor,
        plainText: true,
      }, true);
    });

    it('should call getTokens with images disabled', () => {
      expect(getTokens).toHaveBeenCalledWith('en', { disableImages: true });
    });
  });

  describe('when notice format is email', () => {
    beforeEach(() => {
      mockNoticeFormatValue = NOTICE_FORMATS.EMAIL;
      renderPatronNoticeEmailSection();
    });

    it('should trigger Field component for patron notices body with plainText disabled', () => {
      componentPropsCheck(Field, testIds.patronNoticesBody, {
        component: TemplateEditor,
        plainText: false,
      }, true);
    });

    it('should call getTokens with images enabled', () => {
      expect(getTokens).toHaveBeenCalledWith('en', { disableImages: false });
    });
  });

  describe('when switching notice format', () => {
    it('should fall back to blank values instead of crashing when switching to email without initial values', () => {
      mockNoticeFormatValue = NOTICE_FORMATS.PRINT;
      mockHeaderValue = 'print';
      mockBodyValue = 'Leftover print body';
      renderPatronNoticeEmailSection();

      expect(() => {
        getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.EMAIL } });
      }).not.toThrow();

      expect(getFieldOnChange('localizedTemplates.en.header')).toHaveBeenCalledWith('');
      expect(getFieldOnChange('localizedTemplates.en.body')).toHaveBeenCalledWith('');
    });

    it('should restore the previously entered values when switching back to a format', () => {
      mockNoticeFormatValue = NOTICE_FORMATS.EMAIL;
      mockHeaderValue = 'Original subject';
      mockBodyValue = 'Original body';

      const { rerender } = renderPatronNoticeEmailSection();

      getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.TEXT_MESSAGE } });

      expect(getFieldOnChange('localizedTemplates.en.header')).toHaveBeenCalledWith('');
      expect(getFieldOnChange('localizedTemplates.en.body')).toHaveBeenCalledWith('');

      mockNoticeFormatValue = NOTICE_FORMATS.TEXT_MESSAGE;
      mockHeaderValue = '';
      mockBodyValue = '';

      rerender(
        <PatronNoticeEmailSection
          category="testCategory"
          locale="en"
          initialValues={{}}
        />
      );

      getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.EMAIL } });

      expect(getFieldOnChange('localizedTemplates.en.header')).toHaveBeenCalledWith('Original subject');
      expect(getFieldOnChange('localizedTemplates.en.body')).toHaveBeenCalledWith('Original body');
    });

    it('should keep the template initial values when switching away and back without edits', () => {
      const initialValues = {
        localizedTemplates: {
          en: {
            header: 'Template subject',
            body: 'Template body',
          },
        },
      };

      mockNoticeFormatValue = NOTICE_FORMATS.EMAIL;
      mockHeaderValue = 'Template subject';
      mockBodyValue = 'Template body';

      const { rerender } = renderPatronNoticeEmailSection({ initialValues });

      getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.PRINT } });

      mockNoticeFormatValue = NOTICE_FORMATS.PRINT;
      mockHeaderValue = '';
      mockBodyValue = '';

      rerender(
        <PatronNoticeEmailSection
          category="testCategory"
          locale="en"
          initialValues={initialValues}
        />
      );

      getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.EMAIL } });

      expect(getFieldOnChange('localizedTemplates.en.header')).toHaveBeenCalledWith('Template subject');
      expect(getFieldOnChange('localizedTemplates.en.body')).toHaveBeenCalledWith('Template body');
    });

    it('should not restore values for a format that has not been visited before', () => {
      mockNoticeFormatValue = NOTICE_FORMATS.PRINT;
      mockHeaderValue = 'print';
      mockBodyValue = 'Print body';

      renderPatronNoticeEmailSection();

      getFieldProps('noticeFormat').onChange({ target: { value: NOTICE_FORMATS.TEXT_MESSAGE } });

      expect(getFieldOnChange('localizedTemplates.en.header')).toHaveBeenCalledWith('');
      expect(getFieldOnChange('localizedTemplates.en.body')).toHaveBeenCalledWith('');
    });
  });
});
