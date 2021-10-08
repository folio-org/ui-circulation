import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  ConfigManager: jest.fn(() => null),
  ViewMetaData: jest.fn(({ metadata, ...rest }) => (
    <div {...rest}>{metadata.createdDate}</div>
  )),
}));
