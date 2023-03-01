import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { TemplateEditor } from '@folio/stripes-template-editor';
import { Field } from 'react-final-form';

import StaffSlipTemplateContentSection from './StaffSlipTemplateContentSection';
import TokensList from '../../../TokensList';
import getTokens from '../../../tokens';

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

  it("should execute 'Field' associated with template with passed props", () => {
    const expectedResult = {
      label: labelIds.display,
      component: TemplateEditor,
      tokens: getTokens('en'),
      name: 'template',
      previewModalHeader: labelIds.preview,
      tokensList: TokensList,
      printable: true,
    };

    expect(Field).toHaveBeenCalledWith(expectedResult, {});
  });
});
