import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  ConfigManager: jest.fn(() => null),
  ControlledVocab: jest.fn((props) => <div {...props} />),
  ViewMetaData: jest.fn(({ metadata, ...rest }) => (
    <div {...rest}>{metadata.createdDate}</div>
  )),
  EntryManager: jest.fn(() => null),
  Settings: jest.fn(() => null),
  useCustomFieldsQuery: jest.fn(() => ({
    customFields: [],
    isLoadingCustomFields: false,
  })),
}));
