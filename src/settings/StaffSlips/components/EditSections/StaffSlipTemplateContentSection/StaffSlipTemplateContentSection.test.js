jest.mock('react-final-form', () => ({
  Field: jest.fn(() => (component) => component),
  useFormState: jest.fn(() => ({})),
}));

import { Field } from 'react-final-form';

import { render } from '@folio/jest-config-stripes/testing-library/react';
import { TemplateEditor } from '@folio/stripes-template-editor';

import StaffSlipTemplateContentSection from './StaffSlipTemplateContentSection';
import TokensList from '../../../TokensList';
import getTokens from '../../../tokens';

jest.mock('@folio/stripes-template-editor', () => ({
  TemplateEditor: jest.fn(() => null),
}));

Field.mockImplementation(jest.fn(() => null));

describe('StaffSlipTemplateContentEditSection', () => {
  const labelIds = {
    display: 'ui-circulation.settings.staffSlips.display',
    preview: 'ui-circulation.settings.staffSlips.form.previewLabel',
  };

  afterEach(() => {
    Field.mockClear();
  });

  beforeEach(() => {
    render(<StaffSlipTemplateContentSection />);
  });

  it("should trigger 'Field' with correct props", () => {
    const expectedResult = {
      label: labelIds.display,
      component: TemplateEditor,
      tokens: getTokens('en'),
      name: 'template',
      previewModalHeader: labelIds.preview,
      tokensList: TokensList,
      printable: true,
      editAsHtml: false,
    };

    expect(Field).toHaveBeenCalledWith(expectedResult, {});
  });
});
