import { Field } from 'react-final-form';

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
import PatronNoticePrintSection from './PatronNoticePrintSection';
import TokensList from '../../../TokensList';

const mockGetTokensReturnValue = 'getTokensReturnValue';

jest.mock('../../../tokens', () => jest.fn(() => mockGetTokensReturnValue));
jest.mock('../../../TokensList', () => jest.fn(() => null));
jest.mock('@folio/stripes-template-editor', () => ({
  TemplateEditor: jest.fn(() => null),
}));

describe('PatronNoticePrintSection', () => {
  const categoryValue = 'testCategory';
  const testIds = {
    printAccordionContent: 'printAccordionContent',
    patronNoticesBody: 'patronNoticesBody',
  };
  const labelIds = {
    patronNoticesBody: 'ui-circulation.settings.patronNotices.body',
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));

  beforeEach(() => {
    render(
      <PatronNoticePrintSection
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
    expect(screen.getByTestId(testIds.printAccordionContent)).toBeVisible();
  });

  it('should render "Body" label', () => {
    expect(getItemByTestId(testIds.patronNoticesBody).getByText(labelIds.patronNoticesBody)).toBeVisible();
  });

  it('should trigger Field component for patron notices body with correct props', () => {
    componentPropsCheck(Field, testIds.patronNoticesBody, {
      'data-testid': 'patronNoticesBody',
      required: true,
      name: 'localizedTemplates.en.body',
      id: 'input-print-template-body',
      component: TemplateEditor,
      tokens: mockGetTokensReturnValue,
      tokensList: TokensList,
      selectedCategory: categoryValue,
    }, true);
  });
});
