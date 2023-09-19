import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';
import {
  TextField,
  Row,
  Col,
} from '@folio/stripes/components';
import { TemplateEditor } from '@folio/stripes-template-editor';

import { componentPropsCheck } from '../../../../../../test/jest/helpers';
import PatronNoticeEmailSection from './PatronNoticeEmailSection';
import TokensList from '../../../TokensList';

const mockGetTokensReturnValue = 'getTokensReturnValue';

jest.mock('../../../tokens', () => jest.fn(() => mockGetTokensReturnValue));
jest.mock('../../../TokensList', () => jest.fn(() => null));
jest.mock('@folio/stripes-template-editor', () => ({
  TemplateEditor: jest.fn(() => null),
}));

describe('PatronNoticeEmailEditSection', () => {
  const categoryValue = 'testCategory';
  const testIds = {
    emailAccordionContent: 'emailAccordionContent',
    patronNoticesSubject: 'patronNoticesSubject',
    patronNoticesBody: 'patronNoticesBody',
  };
  const labelIds = {
    patronNoticesSubject: 'ui-circulation.settings.patronNotices.subject',
    patronNoticesBody: 'ui-circulation.settings.patronNotices.body',
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));

  beforeEach(() => {
    render(
      <PatronNoticeEmailSection
        category="testCategory"
        locale="en"
      />
    );
  });

  afterEach(() => {
    Row.mockClear();
    Col.mockClear();
    Field.mockClear();
    TextField.mockClear();
  });

  it('should render component', () => {
    expect(screen.getByTestId(testIds.emailAccordionContent)).toBeVisible();
  });

  it('should render "Subject" label', () => {
    expect(getItemByTestId(testIds.patronNoticesSubject).getByText(labelIds.patronNoticesSubject)).toBeVisible();
  });

  it('should trigger Field component for notice subject with correct props', () => {
    componentPropsCheck(Field, testIds.patronNoticesSubject, {
      id: 'input-patron-notice-subject',
      component: TextField,
      required: true,
      name: 'localizedTemplates.en.header',
    }, true);
  });

  it('should render "Body" label', () => {
    expect(getItemByTestId(testIds.patronNoticesBody).getByText(labelIds.patronNoticesBody)).toBeVisible();
  });

  it('should trigger Field component for patron notices body with correct props', () => {
    componentPropsCheck(Field, testIds.patronNoticesBody, {
      'data-testid': 'patronNoticesBody',
      required: true,
      name: 'localizedTemplates.en.body',
      id: 'input-email-template-body',
      component: TemplateEditor,
      tokens: mockGetTokensReturnValue,
      tokensList: TokensList,
      selectedCategory: categoryValue,
    }, true);
  });
});
